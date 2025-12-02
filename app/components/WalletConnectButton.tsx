"use client";

import { Button } from "./ui/Button";
import { useWalletSelector } from "../hooks/useWalletSelector";

export function WalletConnectButton() {
  const { loading, accountId, isConnected, connectWallet, disconnect, error } =
    useWalletSelector();

  if (isConnected && accountId) {
    return (
      <div className="flex items-center gap-2">
        <span className="hidden text-[11px] uppercase tracking-[0.18em] text-gray-500 sm:inline">
          NEAR
        </span>
        <Button
          variant="secondary"
          className="max-w-[190px] truncate px-3 py-1 text-[11px] font-mono"
          onClick={disconnect}
        >
          {accountId}
        </Button>
      </div>
    );
  }

  return (
    <Button
      variant="secondary"
      className="px-3 py-1 text-[11px] uppercase tracking-[0.18em]"
      onClick={connectWallet}
      disabled={loading || !!error}
    >
      {loading
        ? "Loading NEAR..."
        : error
        ? "DOWNLOAD NEAR WALLET TO USE"
        : "Connect NEAR Wallet"}
    </Button>
  );
}


