"use client";

import { useCallback, useEffect, useState } from "react";
import { WalletSelector, AccountState } from "@near-wallet-selector/core";
import { setupModal } from "@near-wallet-selector/modal-ui";
import "@near-wallet-selector/modal-ui/styles.css";
import { initWalletSelector } from "../lib/walletSelectorConfig";

type WalletState = {
  selector: WalletSelector | null;
  modal: any;
  accounts: AccountState[];
  accountId: string | null;
  loading: boolean;
  error: string | null;
};

export function useWalletSelector() {
  const [state, setState] = useState<WalletState>({
    selector: null,
    modal: null,
    accounts: [],
    accountId: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    let cancelled = false;

    async function init() {
      try {
        const selector = await initWalletSelector();

        if (cancelled) return;

        const modal = setupModal(selector, {
          contractId: "teleport.demo.testnet", // Optional: contract to interact with
        });

        const state = await selector.store.getState();
        const accounts = state.accounts;
        const accountId =
          accounts.length > 0 ? accounts[0].accountId : null;

        setState((prev) => ({
          ...prev,
          selector,
          modal,
          accounts,
          accountId,
          loading: false,
        }));

        const subscription = selector.store.observable.subscribe((state) => {
          if (!cancelled) {
            const accounts = state.accounts;
            const accountId =
              accounts.length > 0 ? accounts[0].accountId : null;

            setState((prev) => ({
              ...prev,
              accounts,
              accountId,
            }));
          }
        });

        return () => {
          subscription.unsubscribe();
        };
      } catch (e) {
        if (!cancelled) {
          console.error("Failed to initialize wallet selector", e);
          setState((prev) => ({
            ...prev,
            loading: false,
            error:
              e instanceof Error
                ? e.message
                : "Failed to initialize wallet selector",
          }));
        }
      }
    }

    const cleanup = init();

    return () => {
      cancelled = true;
      cleanup?.then((unsubscribe) => unsubscribe?.());
    };
  }, []);

  const showModal = useCallback(() => {
    if (state.modal) {
      state.modal.show();
    }
  }, [state.modal]);

  const connectWallet = useCallback(async () => {
    if (!state.selector) {
      console.error("Wallet selector not initialized");
      return;
    }

    showModal();
  }, [state.selector, showModal]);

  const disconnect = useCallback(async () => {
    if (!state.selector) return;

    const wallet = await state.selector.wallet();
    await wallet.signOut();

    setState((prev) => ({
      ...prev,
      accounts: [],
      accountId: null,
    }));
  }, [state.selector]);

  return {
    loading: state.loading,
    accountId: state.accountId,
    accounts: state.accounts,
    isConnected: !!state.accountId,
    connectWallet,
    disconnect,
    error: state.error,
    selector: state.selector,
    modal: state.modal,
    showModal,
  };
}
