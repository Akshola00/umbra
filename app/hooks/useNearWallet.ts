"use client";

import { useCallback, useEffect, useState } from "react";
import { nearConfig } from "../lib/nearConfig";

type WalletState = {
  initialized: boolean;
  loading: boolean;
  accountId: string | null;
  wallet: any | null;
};

export function useNearWallet() {
  const [state, setState] = useState<WalletState>({
    initialized: false,
    loading: true,
    accountId: null,
    wallet: null,
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
        });
      } catch (e) {
        if (!cancelled) {
          console.error("Failed to initialize NEAR wallet", e);
          setState((prev) => ({
            ...prev,
            initialized: true,
            loading: false,
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
    if (!state.wallet) return;
    state.wallet.requestSignIn({
      contractId: nearConfig.contractId,
    });
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
  };
}


