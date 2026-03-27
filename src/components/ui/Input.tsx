import { cn } from "@/lib/utils";
import type { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
}

export function Input({ label, error, hint, className, id, ...props }: InputProps) {
  const inputId = id || label?.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label
          htmlFor={inputId}
          className="text-xs font-mono tracking-widest text-[#A0A0A0] uppercase"
        >
          {label}
        </label>
      )}
      <input
        id={inputId}
        className={cn(
          "h-11 w-full rounded-none border border-[#2A2A2A] bg-[#0F0F0F] px-4 font-mono text-sm text-white placeholder:text-[#404040] transition-all duration-200",
          "focus:outline-none focus:border-[#FFD700] focus:bg-[#111111]",
          "disabled:opacity-40 disabled:cursor-not-allowed",
          error && "border-red-500 focus:border-red-500",
          className
        )}
        {...props}
      />
      {error && (
        <p className="text-xs text-red-400 font-mono">{error}</p>
      )}
      {hint && !error && (
        <p className="text-xs text-[#606060] font-mono">{hint}</p>
      )}
    </div>
  );
}

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  hint?: string;
}

export function Textarea({ label, error, hint, className, id, ...props }: TextareaProps) {
  const inputId = id || label?.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label
          htmlFor={inputId}
          className="text-xs font-mono tracking-widest text-[#A0A0A0] uppercase"
        >
          {label}
        </label>
      )}
      <textarea
        id={inputId}
        className={cn(
          "w-full rounded-none border border-[#2A2A2A] bg-[#0F0F0F] px-4 py-3 font-mono text-sm text-white placeholder:text-[#404040] transition-all duration-200 resize-y min-h-[120px]",
          "focus:outline-none focus:border-[#FFD700] focus:bg-[#111111]",
          "disabled:opacity-40 disabled:cursor-not-allowed",
          error && "border-red-500 focus:border-red-500",
          className
        )}
        {...props}
      />
      {error && (
        <p className="text-xs text-red-400 font-mono">{error}</p>
      )}
      {hint && !error && (
        <p className="text-xs text-[#606060] font-mono">{hint}</p>
      )}
    </div>
  );
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: { value: string; label: string }[];
}

export function Select({ label, error, options, className, id, ...props }: SelectProps) {
  const inputId = id || label?.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label
          htmlFor={inputId}
          className="text-xs font-mono tracking-widest text-[#A0A0A0] uppercase"
        >
          {label}
        </label>
      )}
      <select
        id={inputId}
        className={cn(
          "h-11 w-full rounded-none border border-[#2A2A2A] bg-[#0F0F0F] px-4 font-mono text-sm text-white transition-all duration-200",
          "focus:outline-none focus:border-[#FFD700] focus:bg-[#111111]",
          "disabled:opacity-40 disabled:cursor-not-allowed",
          error && "border-red-500 focus:border-red-500",
          className
        )}
        {...props}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value} className="bg-[#0F0F0F]">
            {opt.label}
          </option>
        ))}
      </select>
      {error && (
        <p className="text-xs text-red-400 font-mono">{error}</p>
      )}
    </div>
  );
}
