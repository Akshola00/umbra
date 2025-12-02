import React from "react";

export type ButtonVariant = "primary" | "secondary" | "ghost";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
};

const baseClasses =
  "inline-flex items-center justify-center rounded-xl px-5 py-3 text-[13px] font-medium uppercase tracking-[0.18em] transition focus-visible:outline-none focus-visible:ring-0 focus-visible:shadow-[0_0_0_1px_rgba(9,255,200,0.25),0_0_30px_rgba(0,246,255,0.35)] disabled:opacity-40 disabled:cursor-not-allowed font-mono";

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-[#F6C915] text-black shadow-[0_0_18px_rgba(246,201,21,0.45)] hover:bg-[#e2b710] border border-yellow-400/80",
  secondary:
    "border border-[#27292f] bg-[#090a0d] text-gray-100 hover:border-[#79F8D4]/80 hover:bg-[#101118] shadow-[0_0_22px_rgba(0,0,0,0.8)]",
  ghost:
    "border border-transparent bg-transparent text-gray-500 hover:border-[#26272f] hover:bg-[#101015]",
};

export function Button(props: ButtonProps): JSX.Element;
export function Button(
  props: ButtonProps & { asChild?: false }
): JSX.Element;
export function Button(
  props: ButtonProps & { asChild: true; children: React.ReactElement }
): JSX.Element;
export function Button({
  variant = "primary",
  className = "",
  asChild,
  children,
  ...rest
}: ButtonProps & { asChild?: boolean }) {
  const classes = `${baseClasses} ${variantClasses[variant]} ${className}`;

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children, {
      className: [classes, (children.props as { className?: string }).className]
        .filter(Boolean)
        .join(" "),
      ...rest,
    });
  }

  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
}


