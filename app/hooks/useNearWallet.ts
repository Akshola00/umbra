"use client";

import { useCallback, useEffect, useState } from "react";
import { nearConfig } from "../lib/nearConfig";

type WalletState = {
  initialized: boolean;
  loading: boolean;
  accountId: string | null;
  wallet: any | null;
  error: string | null;
};

export function useNearWallet() {
  const [state, setState] = useState<WalletState>({
    initialized: false,
    loading: true,
    accountId: null,
    wallet: null,
    error: null,
  });

  useEffect(() => {
    let cancelled = false;

    async function init() {
      try {
        const nearApi = await import("near-api-js");
        const { connect, keyStores, WalletConnection } = nearApi as any;

        const near = await connect({
          networkId: nearConfig.networkId,
          nodeUrl: nearConfig.nodeUrl,
          walletUrl: nearConfig.walletUrl,
          helperUrl: nearConfig.helperUrl,
          deps: {
            keyStore: new keyStores.BrowserLocalStorageKeyStore(),
          },
        });

        if (cancelled) return;
        const wallet = new WalletConnection(near, nearConfig.appKeyPrefix);
        const accountId = wallet.getAccountId() || null;

        setState({
          initialized: true,
          loading: false,
          accountId,
          wallet,
          error: null,
        });
      } catch (e) {
        if (!cancelled) {
          console.error("Failed to initialize NEAR wallet", e);
          setState((prev) => ({
            ...prev,
            initialized: true,
            loading: false,
            error:
              e instanceof Error
                ? e.message
                : "Failed to initialize NEAR wallet. See console for details.",
          }));
        }
      }
    }

    init();

    return () => {
      cancelled = true;
    };
  }, []);

  const connectWallet = useCallback(() => {
    if (!state.wallet) {
      if (state.error) {
        // Surface something visible to the user instead of silently doing nothing
        if (typeof window !== "undefined") {
          window.alert(
            `Unable to connect NEAR wallet:\n\n${state.error}\n\nCheck the browser console for more details.`
          );
        }
      }
      return;
    }

    // For this demo we don't require a specific contract account to exist.
    // Passing a non-existent contractId (like the placeholder in nearConfig)
    // causes a runtime error from NEAR. A plain sign-in just authenticates
    // the user without tying it to a contract.
    state.wallet.requestSignIn();
  }, [state.wallet]);

  const disconnect = useCallback(() => {
    if (!state.wallet) return;
    state.wallet.signOut();
    setState((prev) => ({
      ...prev,
      accountId: null,
    }));
  }, [state.wallet]);

  return {
    loading: state.loading || !state.initialized,
    accountId: state.accountId,
    isConnected: !!state.accountId,
    connectWallet,
    disconnect,
    error: state.error,
  };
}


