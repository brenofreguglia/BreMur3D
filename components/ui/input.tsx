import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  hint?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, hint, id, ...props }, ref) => {
    const inputId = id ?? props.name;
    return (
      <div className="flex flex-col gap-2">
        {label && (
          <label htmlFor={inputId} className="font-mono text-xs uppercase tracking-wider text-ink-400">
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={cn(
            "h-11 rounded-xs border border-[rgb(var(--border))] bg-transparent px-4 text-sm outline-none transition-colors placeholder:text-ink-400 focus:border-accent-500",
            className
          )}
          {...props}
        />
        {hint && <span className="text-xs text-ink-400">{hint}</span>}
      </div>
    );
  }
);
Input.displayName = "Input";

const Textarea = React.forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement> & { label?: string }>(
  ({ className, label, id, ...props }, ref) => {
    const inputId = id ?? props.name;
    return (
      <div className="flex flex-col gap-2">
        {label && (
          <label htmlFor={inputId} className="font-mono text-xs uppercase tracking-wider text-ink-400">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={inputId}
          className={cn(
            "min-h-[120px] rounded-xs border border-[rgb(var(--border))] bg-transparent px-4 py-3 text-sm outline-none transition-colors placeholder:text-ink-400 focus:border-accent-500",
            className
          )}
          {...props}
        />
      </div>
    );
  }
);
Textarea.displayName = "Textarea";

export { Input, Textarea };
