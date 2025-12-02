import Link from "next/link";
import { Card } from "./components/ui/Card";
import { Button } from "./components/ui/Button";

export default function Home() {
  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]">
      <section className="space-y-8">
        <div className="inline-flex items-center gap-2 rounded-full border border-[#2a2a2b] bg-black/50 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.25em] text-gray-400">
          <span className="h-1.5 w-1.5 rounded-full bg-[#79F8D4] shadow-[0_0_12px_rgba(121,248,212,0.9)]" />
          Private Cross-Chain Teleport
        </div>
        <div className="space-y-4">
          <h1 className="text-balance text-4xl font-semibold tracking-tight text-gray-100 sm:text-5xl">
            Teleport Assets{" "}
            <span className="text-[#79F8D4]">Privately</span>{" "}
            Across Chains.
          </h1>
          <p className="max-w-xl text-balance text-sm text-gray-400 sm:text-base">
            Use Zcash shielded pools to teleport value into NEAR without
            revealing your identity. Zero-knowledge proofs, stealth addresses,
            and cross-chain messaging, wrapped in one clean interface.
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
          <Link href="/dashboard" className="sm:inline-flex sm:items-center">
            <Button className="w-full px-7 py-3.5 text-sm sm:w-auto">
              Launch App
            </Button>
          </Link>
          <Link
            href="/dashboard"
            className="text-xs font-medium text-gray-400 hover:text-[#79F8D4]"
          >
            Or explore the teleport flow →
          </Link>
        </div>

        <div className="grid gap-4 text-xs text-gray-400 sm:grid-cols-3">
          <div>
            <div className="text-[11px] uppercase tracking-[0.2em] text-gray-500">
              Step 1
            </div>
            <div className="mt-1 font-medium text-gray-200">
              Create shielded deposit
            </div>
            <p className="mt-1 text-[11px] text-gray-500">
              Lock ZEC into a shielded pool and receive a private note.
            </p>
          </div>
          <div>
            <div className="text-[11px] uppercase tracking-[0.2em] text-gray-500">
              Step 2
            </div>
            <div className="mt-1 font-medium text-gray-200">
              Generate ZK teleport proof
            </div>
            <p className="mt-1 text-[11px] text-gray-500">
              Locally create a proof that your deposit exists, without
              revealing which one.
            </p>
          </div>
          <div>
            <div className="text-[11px] uppercase tracking-[0.2em] text-gray-500">
              Step 3
            </div>
            <div className="mt-1 font-medium text-gray-200">
              Axelar → NEAR stealth mint
            </div>
            <p className="mt-1 text-[11px] text-gray-500">
              Relay your intent to NEAR and receive funds at a stealth address.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <Card className="relative overflow-hidden">
          <div className="pointer-events-none absolute inset-0 opacity-40 mix-blend-screen">
            <div className="from-[#F6C915]/20 via-transparent to-[#00F6FF]/20 absolute -left-36 top-0 h-72 w-72 rounded-full bg-linear-to-br blur-3xl" />
            <div className="from-[#79F8D4]/25 via-transparent to-transparent absolute bottom-0 right-0 h-72 w-72 rounded-full bg-linear-to-tl blur-3xl" />
          </div>
          <div className="relative space-y-4">
            <div className="flex items-center justify-between gap-3">
              <div className="text-xs font-medium uppercase tracking-[0.2em] text-gray-400">
                Teleport Preview
              </div>
              <div className="rounded-full bg-black/60 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-gray-500 ring-1 ring-[#2a2a2b]">
                Zcash → NEAR
              </div>
            </div>
            <div className="space-y-3 text-xs text-gray-300">
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#F6C915]" />
                Shielded deposit created
              </div>
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#00F6FF]" />
                ZK teleport proof ready
              </div>
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#79F8D4]" />
                Axelar message en route to NEAR
              </div>
            </div>
            <div className="mt-2 rounded-xl bg-black/60 p-3 text-[11px] text-gray-400 ring-1 ring-[#2a2a2b]">
              <div className="mb-1 font-mono text-[10px] text-gray-500">
                terminal
              </div>
              <div className="space-y-1 font-mono text-[11px] leading-relaxed">
                <div>↳ Creating shielded note...</div>
                <div>↳ Broadcasting to Zcash...</div>
                <div className="text-[#79F8D4]">↳ Deposit confirmed.</div>
                <div>↳ Loading Merkle path...</div>
                <div>↳ Generating teleport proof...</div>
                <div className="text-[#00F6FF]">↳ Proof ready.</div>
              </div>
            </div>
          </div>
        </Card>
      </section>
    </div>
  );
}
