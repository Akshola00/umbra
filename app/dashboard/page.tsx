"use client";

import { useEffect, useState } from "react";
import { Card } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { StatusBadge } from "../components/ui/StatusBadge";
import { Spinner, ProgressBar } from "../components/ui/Loader";
import Link from "next/link";
import { useNearWallet } from "../hooks/useNearWallet";
import { ProcessingOverlay } from "../components/ProcessingOverlay";

type Step = "deposit" | "proof" | "intent";

const initialLog = [
  "Waiting for shielded deposit...",
  "Connect a wallet and choose an amount to begin.",
];

type PersistedState = {
  amount: string;
  currentStep: Step;
  logs: string[];
  depositNote: string | null;
  proof: string | null;
  nullifier: string | null;
  axelarTx: string | null;
};

const STORAGE_KEY = "umbra-teleport-state";

const CHAINS = ["Zcash", "NEAR"] as const;
type Chain = (typeof CHAINS)[number];

function randomHex(bytes: number) {
  const arr = new Uint8Array(bytes);
  if (typeof window !== "undefined" && window.crypto?.getRandomValues) {
    window.crypto.getRandomValues(arr);
  } else {
    for (let i = 0; i < bytes; i += 1) {
      arr[i] = Math.floor(Math.random() * 256);
    }
  }
  return (
    "0x" +
    Array.from(arr)
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("")
  );
}

export default function DashboardPage() {
  const { accountId, isConnected } = useNearWallet();
  const [amount, setAmount] = useState("");
  const [currentStep, setCurrentStep] = useState<Step>("deposit");
  const [logs, setLogs] = useState<string[]>(initialLog);
  const [depositNote, setDepositNote] = useState<string | null>(null);
  const [proof, setProof] = useState<string | null>(null);
  const [nullifier, setNullifier] = useState<string | null>(null);
  const [axelarTx, setAxelarTx] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [fromChain, setFromChain] = useState<Chain>("Zcash");
  const [toChain, setToChain] = useState<Chain>("NEAR");

  // hydrate from localStorage
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw) as PersistedState;
      setAmount(parsed.amount);
      setCurrentStep(parsed.currentStep);
      setLogs(parsed.logs.length ? parsed.logs : initialLog);
      setDepositNote(parsed.depositNote);
      setProof(parsed.proof);
      setNullifier(parsed.nullifier);
      setAxelarTx(parsed.axelarTx);
    } catch {
      // ignore
    }
  }, []);

  // persist to localStorage
  useEffect(() => {
    if (typeof window === "undefined") return;
    const state: PersistedState = {
      amount,
      currentStep,
      logs,
      depositNote,
      proof,
      nullifier,
      axelarTx,
    };
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [amount, currentStep, logs, depositNote, proof, nullifier, axelarTx]);

  const appendLog = (line: string) =>
    setLogs((prev) => [...prev, line].slice(-12));

  const simulateWork = (messages: string[], done: () => void) => {
    setIsLoading(true);
    setProgress(5);
    let i = 0;
    const interval = setInterval(() => {
      if (i < messages.length) {
        appendLog(messages[i]);
        setProgress((p) => Math.min(95, p + 25));
        i += 1;
      } else {
        clearInterval(interval);
        setProgress(100);
        setTimeout(() => {
          setIsLoading(false);
          setProgress(0);
          done();
        }, 400);
      }
    }, 450);
  };

  const handleDeposit = () => {
    if (!amount || Number.isNaN(Number(amount))) {
      appendLog("! Please enter a valid amount.");
      return;
    }
    setDepositNote(null);
    setProof(null);
    setNullifier(null);
    setAxelarTx(null);
    setCurrentStep("deposit");
    setLogs(["↳ Creating shielded note...", "↳ Broadcasting to Zcash..."]);

    simulateWork(
      [
        "↳ Waiting for confirmations...",
        "↳ Deposit confirmed!",
        "↳ Generated deposit note: note1qz...zk",
      ],
      () => {
        const fakeNote =
          "zcash1q" +
          Math.random().toString(36).slice(2, 10) +
          Math.random().toString(36).slice(2, 18);
        setDepositNote(fakeNote);
        setCurrentStep("proof");
      }
    );
  };

  const handleProof = () => {
    if (!depositNote) {
      appendLog("! No deposit note found. Create a shielded deposit first.");
      return;
    }
    setCurrentStep("proof");
    setProof(null);
    setNullifier(null);
    setLogs([
      "↳ Loading Merkle path from light client...",
      "↳ Computing witness for teleport circuit...",
    ]);

    simulateWork(
      [
        "↳ Generating Groth16 proof...",
        "↳ Compressing proof for Axelar payload...",
        "↳ Proof ready!",
      ],
      () => {
        setProof(randomHex(32));
        setNullifier(randomHex(32));
        setCurrentStep("intent");
      }
    );
  };

  const handleIntent = () => {
    if (!proof || !nullifier) {
      appendLog("! Generate a teleport proof before sending the intent.");
      return;
    }
    setCurrentStep("intent");
    setLogs([
      "↳ Preparing Axelar payload...",
      "↳ Encoding proof + nullifier + destination...",
    ]);

    simulateWork(
      [
        "↳ Broadcasting transaction to Axelar gateway...",
        "↳ Awaiting relayer execution on NEAR...",
        "↳ Teleport intent accepted.",
      ],
      () => {
        setAxelarTx(randomHex(20));
      }
    );
  };

  const statusForStep = (step: Step) => {
    if (currentStep === step && isLoading) return "pending" as const;
    if (step === "deposit" && depositNote) return "verified" as const;
    if (step === "proof" && proof) return "verified" as const;
    if (step === "intent" && axelarTx) return "complete" as const;
    if (currentStep === step) return "pending" as const;
    return "pending" as const;
  };

  const overlayTitle =
    currentStep === "deposit"
      ? "Creating shielded deposit..."
      : currentStep === "proof"
      ? "Generating ZK teleport proof..."
      : "Sending teleport intent via Axelar...";

  return (
    <div className="relative">
      <ProcessingOverlay open={isLoading} title={overlayTitle} />
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]">
        <Card className="space-y-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div className="space-y-1">
              <div className="text-xs font-semibold uppercase tracking-[0.3em] text-gray-500">
                Teleport
              </div>
              <h2 className="text-lg font-semibold text-gray-100 sm:text-xl">
                Zcash → NEAR Private Teleport
              </h2>
            </div>
            <div className="space-y-1 text-right">
              <div className="rounded-full bg-black/60 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-gray-500 ring-1 ring-[#2a2a2b]">
                Shielded Teleport
              </div>
              <div className="text-[10px] text-gray-500">
                Receiving NEAR account:{" "}
                <span className="font-mono text-[10px] text-gray-300">
                  {isConnected && accountId ? accountId : "not connected"}
                </span>
              </div>
            </div>
          </div>

          <div className="grid gap-4 text-xs text-gray-400 sm:grid-cols-3">
            <div className="space-y-2">
              <div className="text-[11px] uppercase tracking-[0.2em] text-gray-500">
                From
              </div>
              <div className="space-y-2">
                <select
                  value={fromChain}
                  onChange={(e) => setFromChain(e.target.value as Chain)}
                  className="w-full rounded-xl border border-[#2a2a2b] bg-black/60 px-3 py-2 text-xs text-gray-100 outline-none ring-0 focus:border-[#79F8D4] focus:ring-1 focus:ring-[#79F8D4]"
                >
                  {CHAINS.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
                <div className="text-[10px] text-gray-500">
                  {fromChain === "Zcash" ? "Shielded pool" : "Account-based"}
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="text-[11px] uppercase tracking-[0.2em] text-gray-500">
                To
              </div>
              <div className="space-y-2">
                <select
                  value={toChain}
                  onChange={(e) => setToChain(e.target.value as Chain)}
                  className="w-full rounded-xl border border-[#2a2a2b] bg-black/60 px-3 py-2 text-xs text-gray-100 outline-none ring-0 focus:border-[#79F8D4] focus:ring-1 focus:ring-[#79F8D4]"
                >
                  {CHAINS.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
                <div className="text-[10px] text-gray-500">
                  {toChain === "NEAR" ? "Stealth account" : "Shielded pool"}
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="text-[11px] uppercase tracking-[0.2em] text-gray-500">
                Asset
              </div>
              <div className="flex items-center justify-between rounded-xl bg-black/60 px-3 py-2 ring-1 ring-[#2a2a2b]">
                <span className="font-medium text-gray-100">wZEC</span>
                <span className="text-[11px] text-gray-500">testnet</span>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <label className="space-y-1 text-sm">
              <span className="text-xs uppercase tracking-[0.2em] text-gray-500">
                Amount
              </span>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <input
                  type="number"
                  min="0"
                  inputMode="decimal"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="Enter amount of ZEC to teleport"
                  className="flex-1 rounded-xl border border-[#2a2a2b] bg-black/60 px-3 py-2 text-sm text-gray-100 outline-none ring-0 placeholder:text-sm placeholder:text-gray-600 focus:border-[#79F8D4] focus:ring-1 focus:ring-[#79F8D4]"
                />
                <Button
                  type="button"
                  onClick={handleDeposit}
                  disabled={isLoading}
                  className="w-full sm:w-auto"
                >
                  {isLoading && currentStep === "deposit" ? (
                    <span className="inline-flex items-center gap-2">
                      <Spinner /> <span>Creating deposit</span>
                    </span>
                  ) : (
                    "Generate Shielded Deposit"
                  )}
                </Button>
              </div>
            </label>
          </div>

          <div className="grid gap-3 md:grid-cols-3">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.18em] text-gray-500">
                <span>Deposit</span>
                <StatusBadge status={statusForStep("deposit")} />
              </div>
              <Button
                variant="secondary"
                className="w-full text-xs"
                type="button"
                onClick={handleDeposit}
                disabled={isLoading}
              >
                Recreate deposit
              </Button>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.18em] text-gray-500">
                <span>Proof</span>
                <StatusBadge status={statusForStep("proof")} />
              </div>
              <Button
                variant="secondary"
                className="w-full text-xs"
                type="button"
                onClick={handleProof}
                disabled={isLoading}
              >
                Generate ZK Proof
              </Button>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.18em] text-gray-500">
                <span>Intent</span>
                <StatusBadge status={statusForStep("intent")} />
              </div>
              <Button
                variant="secondary"
                className="w-full text-xs"
                type="button"
                onClick={handleIntent}
                disabled={isLoading}
              >
                Send Teleport Intent
              </Button>
            </div>
          </div>

          {isLoading && <ProgressBar progress={progress} />}

          <div className="grid gap-4 lg:grid-cols-2">
            <div className="space-y-2 text-xs">
              <div className="text-[11px] uppercase tracking-[0.2em] text-gray-500">
                Deposit Note
              </div>
              <div className="rounded-xl bg-black/60 p-3 ring-1 ring-[#2a2a2b]">
                {depositNote ? (
                  <code className="block max-h-20 overflow-y-auto text-[11px] text-[#79F8D4]">
                    {depositNote}
                  </code>
                ) : (
                  <span className="text-[11px] text-gray-500">
                    No deposit note yet. Generate a shielded deposit to see it
                    here.
                  </span>
                )}
              </div>
            </div>
            <div className="space-y-2 text-xs">
              <div className="text-[11px] uppercase tracking-[0.2em] text-gray-500">
                Proof & Nullifier
              </div>
              <div className="space-y-2 rounded-xl bg-black/60 p-3 ring-1 ring-[#2a2a2b]">
                <div className="space-y-1">
                  <div className="text-[10px] text-gray-500">Proof ID</div>
                  <code className="block max-w-full overflow-hidden text-ellipsis whitespace-nowrap text-[11px] text-[#00F6FF]">
                    {proof ?? "—"}
                  </code>
                </div>
                <div className="space-y-1">
                  <div className="text-[10px] text-gray-500">Nullifier</div>
                  <code className="block max-w-full overflow-hidden text-ellipsis whitespace-nowrap text-[11px] text-[#F6C915]">
                    {nullifier ?? "—"}
                  </code>
                </div>
              </div>
            </div>
          </div>
        </Card>

        <div className="space-y-4">
          <Card className="h-full space-y-4">
            <div className="flex items-center justify-between gap-2">
              <div className="text-xs font-semibold uppercase tracking-[0.25em] text-gray-500">
                Teleport Timeline
              </div>
              {axelarTx && (
                <span className="rounded-full bg-[#03140f] px-3 py-1 text-[10px] font-medium uppercase tracking-[0.18em] text-[#79F8D4] ring-1 ring-[#79F8D4]/60">
                  Complete
                </span>
              )}
            </div>
            <ol className="space-y-4 text-xs text-gray-300">
              <li className="flex items-start gap-3">
                <span className="mt-0.5 h-2 w-2 rounded-full bg-[#F6C915]" />
                <div>
                  <div className="font-medium text-gray-100">
                    Shielded deposit on Zcash
                  </div>
                  <p className="text-[11px] text-gray-500">
                    Your funds enter a shielded pool. Only a note and nullifier
                    are kept client-side.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-0.5 h-2 w-2 rounded-full bg-[#00F6FF]" />
                <div>
                  <div className="font-medium text-gray-100">
                    ZK teleport proof generation
                  </div>
                  <p className="text-[11px] text-gray-500">
                    Locally generate a proof that your deposit exists in the
                    Merkle tree without revealing which leaf is yours.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-0.5 h-2 w-2 rounded-full bg-[#79F8D4]" />
                <div>
                  <div className="font-medium text-gray-100">
                    Axelar relay → NEAR stealth mint
                  </div>
                  <p className="text-[11px] text-gray-500">
                    Axelar delivers your teleport intent to a NEAR contract,
                    which mints funds to a fresh stealth address.
                  </p>
                </div>
              </li>
            </ol>

            <div className="space-y-2 rounded-xl bg-black/70 p-3 text-[11px] text-gray-400 ring-1 ring-[#2a2a2b]">
              <div className="mb-1 font-mono text-[10px] text-gray-500">
                prover / relayer log
              </div>
              <div className="max-h-40 space-y-1 overflow-y-auto font-mono text-[11px] leading-relaxed">
                {logs.map((line, idx) => (
                  <div key={idx}>{line}</div>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between gap-2 text-[11px] text-gray-500">
              {axelarTx ? (
                <>
                  <span className="truncate">
                    Axelar tx:{" "}
                    <span className="font-mono text-[#79F8D4]">{axelarTx}</span>
                  </span>
                  <Link
                    href="/success"
                    className="text-[11px] font-medium text-[#79F8D4] hover:text-[#00F6FF]"
                  >
                    View minted stealth address →
                  </Link>
                </>
              ) : (
                <span>
                  Teleport will be relayed via Axelar and minted to your NEAR
                  stealth account.
                </span>
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
