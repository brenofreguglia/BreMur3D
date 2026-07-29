import * as React from "react";
import { cn } from "@/lib/utils";

export function Badge({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-xs border border-[rgb(var(--border))] px-2.5 py-1 font-mono text-[11px] uppercase tracking-wider text-ink-400",
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
