import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";
import { WalletConnectButton } from "./components/WalletConnectButton";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Umbra",
  description:
    "Umbra: teleport assets privately across chains using Zcash shielded pools and NEAR.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased text-gray-100`}
      >
        <div className="min-h-screen text-gray-100">
          <header className="border-b border-[#171821] bg-black/50 backdrop-blur-md">
            <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
              <Link
                href="/"
                className="flex items-center gap-2 text-xs font-semibold tracking-[0.22em] uppercase text-gray-300"
              >
                <span className="h-2 w-2 rounded-full bg-[#79F8D4] shadow-[0_0_16px_rgba(121,248,212,0.9)]" />
                <span className="font-mono">Umbra</span>
              </Link>
              <nav className="flex items-center gap-4 text-[11px] text-gray-400 font-mono uppercase tracking-[0.2em]">
                <Link
                  href="/dashboard"
                  className="rounded-full px-3 py-1 hover:bg-white/5/50 hover:text-gray-100"
                >
                  App
                </Link>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full px-3 py-1 hover:bg-white/5/50 hover:text-gray-100"
                >
                  GitHub
                </a>
                <a
                  href="https://docs.example.com"
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full px-3 py-1 hover:bg-white/5/50 hover:text-gray-100"
                >
                  Docs
                </a>
                <WalletConnectButton />
              </nav>
            </div>
          </header>
          <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
            {children}
          </main>
          <footer className="border-t border-[#171821] bg-black/70">
            <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 text-[11px] text-gray-500 font-mono uppercase tracking-[0.2em]">
              <span>zypherpunk hackathon 2025 · umbra teleport</span>
              <span className="hidden sm:inline">
                shielded teleport · zcash → near
              </span>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
