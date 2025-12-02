export function Spinner() {
  return (
    <div className="inline-flex h-5 w-5 items-center justify-center">
      <div className="h-5 w-5 animate-spin rounded-full border-[2px] border-[#00F6FF]/40 border-t-[#F6C915]" />
    </div>
  );
}

export function ProgressBar({ progress }: { progress: number }) {
  const clamped = Math.max(0, Math.min(100, progress));
  return (
    <div className="h-1.5 w-full overflow-hidden rounded-full bg-[#1b1b1d]">
      <div
        className="h-full bg-gradient-to-r from-[#F6C915] via-[#00F6FF] to-[#79F8D4] shadow-[0_0_18px_rgba(0,246,255,0.5)] transition-[width]"
        style={{ width: `${clamped}%` }}
      />
    </div>
  );
}


