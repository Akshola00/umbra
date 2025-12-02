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
  title: "Z-Teleport",
  description:
    "Teleport assets privately across chains using Zcash shielded pools and NEAR.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#0e0e0f] text-gray-100`}
      >
        <div className="min-h-screen bg-[radial-gradient(circle_at_top,_#1b1b1f_0,_#050506_55%,_#000000_100%)] text-gray-100">
          <header className="border-b border-[#1f1f21] bg-black/40 backdrop-blur-md">
            <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
              <Link
                href="/"
                className="flex items-center gap-2 text-sm font-semibold tracking-[0.25em] uppercase text-gray-300"
              >
                <span className="h-2 w-2 rounded-full bg-[#F6C915] shadow-[0_0_16px_rgba(246,201,21,0.9)]" />
                Z-Teleport
              </Link>
              <nav className="flex items-center gap-4 text-xs text-gray-400">
                <Link
                  href="/dashboard"
                  className="rounded-full px-3 py-1 hover:bg-white/5"
                >
                  App
                </Link>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full px-3 py-1 hover:bg-white/5"
                >
                  GitHub
                </a>
                <a
                  href="https://docs.example.com"
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full px-3 py-1 hover:bg:white/5 hover:bg-white/5"
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
          <footer className="border-t border-[#1f1f21] bg-black/60">
            <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 text-xs text-gray-500">
              <span>Zypherpunk Hackathon 2025 · Prototype UI</span>
              <span className="hidden sm:inline">
                Built for privacy-preserving cross-chain teleports
              </span>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
