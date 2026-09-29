import * as React from "react";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors disabled:pointer-events-none disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--color-accent)]",
  {
    variants: {
      variant: {
        default:
          "bg-[var(--color-ink)] text-white hover:bg-[var(--color-ink-soft)]",
        accent:
          "bg-[var(--color-accent)] text-white hover:bg-[var(--color-accent-strong)]",
        outline:
          "border border-[var(--color-line)] bg-transparent text-[var(--color-ink)] hover:bg-[var(--color-surface)]",
        ghost: "bg-transparent text-[var(--color-ink)] hover:bg-[var(--color-surface)]",
        signal: "bg-[var(--color-signal)] text-white hover:opacity-90",
        link: "text-[var(--color-accent)] underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4",
        sm: "h-8 px-3 text-[13px]",
        lg: "h-11 px-6",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

const Button = React.forwardRef(
  ({ className, variant, size, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  )
);
Button.displayName = "Button";

export { Button, buttonVariants };
