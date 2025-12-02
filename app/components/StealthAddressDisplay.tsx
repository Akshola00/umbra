"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { Button } from "./ui/Button";

const QRCode = dynamic(() => import("react-qr-code"), { ssr: false });

type Props = {
  address: string;
  amount?: string;
  explorerUrl?: string;
};

export function StealthAddressDisplay({ address, amount, explorerUrl }: Props) {
  const [showQR, setShowQR] = useState(true);
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(address);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch {
      // ignore
    }
  };

  return (
    <div className="space-y-4">
      <div className="space-y-1">
        <div className="text-xs uppercase tracking-[0.25em] text-gray-500">
          Stealth Address
        </div>
        <code className="block max-w-full overflow-hidden text-ellipsis whitespace-nowrap rounded-xl bg-black/60 px-3 py-2 text-xs text-[#79F8D4] ring-1 ring-[#2a2a2b]">
          {address}
        </code>
      </div>

      {amount && (
        <div className="text-sm text-gray-300">
          Amount Received:{" "}
          <span className="font-semibold text-[#F6C915]">{amount}</span>
        </div>
      )}

      <div className="flex flex-wrap items-center gap-3">
        <Button
          variant="secondary"
          className="px-4 py-2 text-xs"
          onClick={handleCopy}
        >
          {copied ? "Copied" : "Copy Address"}
        </Button>
        <Button
          variant="ghost"
          className="px-4 py-2 text-xs"
          onClick={() => setShowQR((v) => !v)}
        >
          {showQR ? "Hide QR" : "Show QR"}
        </Button>
        {explorerUrl && (
          <a
            href={explorerUrl}
            target="_blank"
            rel="noreferrer"
            className="text-xs font-medium text-[#79F8D4] underline underline-offset-4 hover:text-[#00F6FF]"
          >
            View on NEAR Explorer
          </a>
        )}
      </div>

      {showQR && (
        <div className="inline-flex rounded-2xl bg-black/70 p-4 ring-1 ring-[#2a2a2b]">
          <QRCode value={address} size={112} fgColor="#79F8D4" bgColor="transparent" />
        </div>
      )}
    </div>
  );
}


