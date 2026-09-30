import type { ButtonHTMLAttributes, ReactNode } from "react";

interface PrimaryButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  fullWidth?: boolean;
}

export function PrimaryButton({
  children,
  fullWidth,
  className,
  disabled,
  type = "button",
  ...rest
}: PrimaryButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled}
      className={`inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-lg bg-primary px-6 text-label-lg text-white transition-colors hover:bg-primary-hover focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-60 ${fullWidth ? "w-full" : ""} ${className ?? ""}`}
      {...rest}
    >
      {children}
    </button>
  );
}
