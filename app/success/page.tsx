"use client";

import { Card } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { StealthAddressDisplay } from "../components/StealthAddressDisplay";
import Link from "next/link";

export default function SuccessPage() {
  const stealthAddress = "near:stealth_xyz1234demo_abc";

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
      <Card className="space-y-6">
        <div className="flex items-center justify-between gap-3">
          <div className="space-y-1">
            <div className="text-xs font-semibold uppercase tracking-[0.3em] text-gray-500">
              Teleport Complete
            </div>
            <h1 className="text-2xl font-semibold text-gray-100 sm:text-3xl">
              Your assets have been teleported privately.
            </h1>
          </div>
          <div className="relative h-12 w-12">
            <div className="absolute inset-0 rounded-full bg-[#03140f] shadow-[0_0_40px_rgba(121,248,212,0.9)]" />
            <div className="relative flex h-full w-full items-center justify-center text-2xl">
              <span className="text-[#79F8D4]">✓</span>
            </div>
          </div>
        </div>

        <p className="max-w-xl text-sm text-gray-400">
          Axelar relayers have verified your ZK teleport proof and executed the
          mint on NEAR. Funds now sit at a freshly generated stealth address,
          unlinkable to your original Zcash source.
        </p>

        <div className="rounded-2xl bg-black/60 p-4 ring-1 ring-[#2a2a2b]">
          <StealthAddressDisplay
            address={stealthAddress}
            amount="10 wZEC"
            explorerUrl="https://explorer.near.org"
          />
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
          <Button asChild>
            <Link href="/dashboard">Teleport Again</Link>
          </Button>
          <Button variant="secondary" asChild>
            <a
              href="https://explorer.near.org"
              target="_blank"
              rel="noreferrer"
            >
              View on NEAR Explorer
            </a>
          </Button>
        </div>
      </Card>

      <Card className="space-y-4">
        <div className="text-xs font-semibold uppercase tracking-[0.25em] text-gray-500">
          What just happened?
        </div>
        <ol className="space-y-4 text-sm text-gray-300">
          <li>
            <span className="font-medium text-[#F6C915]">
              1. Shielded deposit
            </span>
            <p className="mt-1 text-[11px] text-gray-500">
              You created a Zcash shielded note and locked funds into the pool,
              receiving a private note + nullifier client-side.
            </p>
          </li>
          <li>
            <span className="font-medium text-[#00F6FF]">
              2. Teleport proof
            </span>
            <p className="mt-1 text-[11px] text-gray-500">
              A ZK proof was generated that your note exists in the Merkle tree
              and has not been spent, without revealing which note is yours.
            </p>
          </li>
          <li>
            <span className="font-medium text-[#79F8D4]">
              3. Axelar + NEAR mint
            </span>
            <p className="mt-1 text-[11px] text-gray-500">
              Axelar relayed your teleport intent to NEAR, where a contract
              minted wrapped ZEC to a brand-new stealth address.
            </p>
          </li>
        </ol>

        <div className="rounded-xl bg-black/70 p-3 text-[11px] text-gray-400 ring-1 ring-[#2a2a2b]">
          <div className="mb-1 font-mono text-[10px] text-gray-500">
            next steps
          </div>
          <ul className="list-disc space-y-1 pl-4">
            <li>Wire in real Zcash lightwallet SDK calls for deposits.</li>
            <li>Connect to a Rust proving backend from a Next.js API route.</li>
            <li>Integrate Axelar + NEAR contracts for end-to-end teleport.</li>
          </ul>
        </div>
      </Card>
    </div>
  );
}


