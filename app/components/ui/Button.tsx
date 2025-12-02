import React from "react";

export type ButtonVariant = "primary" | "secondary" | "ghost";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
};

const baseClasses =
  "inline-flex items-center justify-center rounded-xl px-5 py-3 text-sm font-semibold tracking-wide transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-black disabled:opacity-40 disabled:cursor-not-allowed";

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-[#F6C915] text-black shadow-[0_0_12px_rgba(246,201,21,0.35)] hover:bg-[#e2b710]",
  secondary:
    "border border-[#2a2a2b] bg-[#151517] text-gray-100 hover:border-[#79F8D4]/60 hover:bg-[#1b1b1d]",
  ghost:
    "border border-transparent bg-transparent text-gray-400 hover:border-[#2a2a2b] hover:bg-[#151517]",
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


