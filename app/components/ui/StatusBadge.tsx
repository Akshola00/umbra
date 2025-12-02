type Status = "pending" | "relayed" | "verified" | "complete" | "error";

const statusConfig: Record<
  Status,
  { label: string; className: string; dotClass: string }
> = {
  pending: {
    label: "Pending",
    className:
      "bg-[#101018] text-yellow-200 border-yellow-500/40 shadow-[0_0_18px_rgba(246,201,21,0.2)]",
    dotClass: "bg-yellow-400",
  },
  relayed: {
    label: "Relayed",
    className:
      "bg-[#04161c] text-cyan-200 border-cyan-500/40 shadow-[0_0_18px_rgba(0,246,255,0.25)]",
    dotClass: "bg-cyan-400",
  },
  verified: {
    label: "Verified",
    className:
      "bg-[#03140f] text-emerald-200 border-emerald-500/40 shadow-[0_0_18px_rgba(16,185,129,0.28)]",
    dotClass: "bg-emerald-400",
  },
  complete: {
    label: "Complete",
    className:
      "bg-[#050607] text-[#79F8D4] border-[#79F8D4]/60 shadow-[0_0_22px_rgba(121,248,212,0.4)]",
    dotClass: "bg-[#79F8D4]",
  },
  error: {
    label: "Error",
    className:
      "bg-[#190b0d] text-rose-200 border-rose-500/40 shadow-[0_0_18px_rgba(244,63,94,0.32)]",
    dotClass: "bg-rose-400",
  },
};

export function StatusBadge({ status }: { status: Status }) {
  const cfg = statusConfig[status];
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[11px] font-medium uppercase tracking-[0.2em] ${cfg.className}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${cfg.dotClass}`} />
      {cfg.label}
    </span>
  );
}


