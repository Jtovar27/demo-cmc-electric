import { cn } from "@/lib/utils";
import { Zap } from "lucide-react";
import Link from "next/link";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  href?: string;
}

export function Logo({ className, size = "md", href = "/" }: LogoProps) {
  const sizes = {
    sm: { icon: "h-5 w-5", text: "text-sm", sub: "text-[9px]" },
    md: { icon: "h-6 w-6", text: "text-base", sub: "text-[10px]" },
    lg: { icon: "h-8 w-8", text: "text-xl", sub: "text-xs" },
  };

  const s = sizes[size];

  return (
    <Link href={href} className={cn("flex items-center gap-2 group", className)}>
      <div className="relative flex items-center justify-center">
        <div className="absolute inset-0 bg-[#FFD700]/20 rounded-sm blur-sm group-hover:bg-[#FFD700]/30 transition-all duration-300" />
        <div className="relative bg-[#FFD700] p-1.5 rounded-sm">
          <Zap className={cn(s.icon, "text-black fill-black")} />
        </div>
      </div>
      <div className="flex flex-col leading-none">
        <span
          className={cn(
            "font-mono font-bold tracking-widest text-white uppercase",
            s.text
          )}
        >
          CMC ELECTRIC
        </span>
        <span
          className={cn(
            "font-mono tracking-[0.2em] text-[#FFD700] uppercase",
            s.sub
          )}
        >
          LLC
        </span>
      </div>
    </Link>
  );
}
