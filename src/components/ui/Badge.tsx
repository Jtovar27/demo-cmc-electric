import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "yellow" | "success" | "error" | "warning" | "muted" | "outline";
  size?: "sm" | "md";
  className?: string;
}

export function Badge({
  children,
  variant = "yellow",
  size = "md",
  className,
}: BadgeProps) {
  const variants = {
    yellow: "bg-[#FFD700]/10 text-[#FFD700] border border-[#FFD700]/20",
    success: "bg-green-500/10 text-green-400 border border-green-500/20",
    error: "bg-red-500/10 text-red-400 border border-red-500/20",
    warning: "bg-amber-500/10 text-amber-400 border border-amber-500/20",
    muted: "bg-white/5 text-[#A0A0A0] border border-white/10",
    outline: "bg-transparent text-[#E5E5E5] border border-[#2A2A2A]",
  };

  const sizes = {
    sm: "text-[10px] px-2 py-0.5 font-mono tracking-wider",
    md: "text-xs px-3 py-1 font-mono tracking-widest",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-sm font-medium uppercase",
        variants[variant],
        sizes[size],
        className
      )}
    >
      {children}
    </span>
  );
}
