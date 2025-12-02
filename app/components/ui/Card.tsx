type CardProps = React.HTMLAttributes<HTMLDivElement>;

export function Card({ className = "", ...props }: CardProps) {
  return (
    <div
      className={`relative overflow-hidden rounded-2xl border border-[#202027] bg-[radial-gradient(circle_at_top,#15151b_0,#050507_55%,#010101_100%)] p-4 sm:p-6 shadow-[0_0_40px_rgba(0,0,0,0.9)] before:pointer-events-none before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_top,#79F8D4/10,transparent_55%)] before:opacity-60 before:mix-blend-screen ${className}`}
      {...props}
    />
  );
}


