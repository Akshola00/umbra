import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

type ButtonVariant = "primary" | "secondary" | "ghost";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  icon?: ReactNode;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-gradient-to-r from-[#F6C915] via-[#79F8D4] to-[#00F6FF] text-black font-semibold shadow-[0_0_40px_rgba(0,246,255,0.25)]",
  secondary:
    "bg-[#161617] text-gray-100 border border-[#2a2a2b] hover:border-[#3f3f41]",
  ghost:
    "bg-transparent text-gray-300 border border-transparent hover:border-[#2a2a2b]",
};

export function Button({
  className,
  children,
  variant = "primary",
  icon,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-2xl px-5 py-3 text-sm tracking-wide transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400 disabled:opacity-60",
        variantStyles[variant],
        className,
      )}
      {...props}
    >
      {icon}
      {children}
    </button>
  );
}

