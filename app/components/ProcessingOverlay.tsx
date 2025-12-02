"use client";

import { Spinner } from "./ui/Loader";

type Props = {
  open: boolean;
  title: string;
  subtitle?: string;
};

export function ProcessingOverlay({ open, title, subtitle }: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <div className="mx-4 w-full max-w-sm rounded-2xl border border-[#2a2a2b] bg-[#080809] p-5 text-center shadow-[0_0_40px_rgba(0,0,0,0.9)]">
        <div className="mb-4 flex justify-center">
          <Spinner />
        </div>
        <h2 className="text-sm font-semibold text-gray-100">{title}</h2>
        {subtitle && (
          <p className="mt-2 text-xs text-gray-500">{subtitle}</p>
        )}
        <p className="mt-4 text-[10px] uppercase tracking-[0.2em] text-gray-600">
          Computing locally · Demo only
        </p>
      </div>
    </div>
  );
}


