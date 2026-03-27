import { cn } from "@/lib/utils";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  glow?: boolean;
}

export function Card({ children, className, hover = false, glow = false }: CardProps) {
  return (
    <div
      className={cn(
        "bg-[#0F0F0F] border border-[#1A1A1A] relative",
        hover && "transition-all duration-300 hover:border-[#FFD700]/30 hover:bg-[#111111] cursor-pointer group",
        glow && "hover:shadow-[0_0_30px_rgba(255,215,0,0.08)]",
        className
      )}
    >
      {children}
    </div>
  );
}

interface CardHeaderProps {
  children: React.ReactNode;
  className?: string;
}

export function CardHeader({ children, className }: CardHeaderProps) {
  return (
    <div className={cn("p-6 pb-4", className)}>
      {children}
    </div>
  );
}

export function CardContent({ children, className }: CardHeaderProps) {
  return (
    <div className={cn("px-6 pb-6", className)}>
      {children}
    </div>
  );
}

export function CardFooter({ children, className }: CardHeaderProps) {
  return (
    <div className={cn("px-6 py-4 border-t border-[#1A1A1A]", className)}>
      {children}
    </div>
  );
}
