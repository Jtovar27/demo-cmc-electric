"use client";

import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import { Loader2 } from "lucide-react";
import type { ButtonHTMLAttributes, ReactNode } from "react";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 font-mono text-sm font-medium tracking-wider transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFD700] focus-visible:ring-offset-2 focus-visible:ring-offset-black disabled:pointer-events-none disabled:opacity-40 uppercase select-none",
  {
    variants: {
      variant: {
        primary:
          "bg-[#FFD700] text-black hover:bg-[#FFC200] active:bg-[#FFB300] shadow-[0_0_20px_rgba(255,215,0,0.2)] hover:shadow-[0_0_30px_rgba(255,215,0,0.4)]",
        secondary:
          "border border-[#FFD700] text-[#FFD700] bg-transparent hover:bg-[#FFD700] hover:text-black active:bg-[#FFC200]",
        ghost:
          "text-[#A0A0A0] hover:text-white hover:bg-white/5 border border-transparent",
        danger:
          "bg-[#EF4444] text-white hover:bg-[#DC2626] border border-[#EF4444]",
        outline:
          "border border-[#2A2A2A] text-[#E5E5E5] bg-transparent hover:border-[#FFD700] hover:text-[#FFD700]",
        muted:
          "bg-[#1A1A1A] text-[#E5E5E5] hover:bg-[#222222] border border-[#2A2A2A]",
      },
      size: {
        sm: "h-8 px-4 text-xs",
        md: "h-10 px-6 text-sm",
        lg: "h-12 px-8 text-base",
        xl: "h-14 px-10 text-base",
        icon: "h-10 w-10 p-0",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  loading?: boolean;
  icon?: ReactNode;
  iconRight?: ReactNode;
}

export function Button({
  className,
  variant,
  size,
  loading = false,
  icon,
  iconRight,
  children,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(buttonVariants({ variant, size, className }))}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        icon && <span className="flex-shrink-0">{icon}</span>
      )}
      {children}
      {!loading && iconRight && (
        <span className="flex-shrink-0">{iconRight}</span>
      )}
    </button>
  );
}
