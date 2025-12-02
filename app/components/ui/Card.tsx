type CardProps = React.HTMLAttributes<HTMLDivElement>;

export function Card({ className = "", ...props }: CardProps) {
  return (
    <div
      className={`bg-[#161617] border border-[#2a2a2b] rounded-2xl p-4 sm:p-6 shadow-[0_0_40px_rgba(0,0,0,0.7)] ${className}`}
      {...props}
    />
  );
}


