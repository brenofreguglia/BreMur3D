import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-gradient-to-r from-[#B8860B] via-[#D4AF37] to-[#F5D77A] text-[#111111] shadow-sm hover:shadow-[0_6px_24px_rgba(212,175,55,0.25)] hover:-translate-y-0.5",

        secondary:
          "border border-[#D4AF37]/50 bg-transparent text-[rgb(var(--foreground))] hover:border-[#D4AF37] hover:bg-[#D4AF37]/10",

        outline:
          "border border-[rgb(var(--border))] bg-transparent hover:border-[#D4AF37]",

        ghost: "hover:bg-[#D4AF37]/10 hover:text-[#D4AF37]",

        destructive: "bg-red-600 text-white hover:bg-red-700",
      },
      size: {
        default: "h-10 px-5 py-2",
        sm: "h-9 px-4",
        lg: "h-12 px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, size, className }))}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
