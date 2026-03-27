import { cn } from "@/lib/utils";
import { Badge } from "./Badge";

interface SectionHeaderProps {
  badge?: string;
  title: string;
  titleHighlight?: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeader({
  badge,
  title,
  titleHighlight,
  subtitle,
  align = "center",
  className,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        align === "center" && "items-center text-center",
        align === "left" && "items-start text-left",
        className
      )}
    >
      {badge && (
        <Badge variant="yellow" size="md">
          {badge}
        </Badge>
      )}
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-mono font-bold tracking-tight text-white leading-tight">
        {title}{" "}
        {titleHighlight && (
          <span className="text-gradient">{titleHighlight}</span>
        )}
      </h2>
      {subtitle && (
        <p className="text-[#A0A0A0] text-base md:text-lg max-w-2xl leading-relaxed font-sans">
          {subtitle}
        </p>
      )}
    </div>
  );
}
