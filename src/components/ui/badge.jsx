import * as React from "react";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-[12px] font-medium",
  {
    variants: {
      variant: {
        default: "border-transparent bg-[var(--color-ink)] text-white",
        accent: "border-transparent bg-[var(--color-accent-tint)] text-[var(--color-accent-strong)]",
        signal: "border-transparent bg-[var(--color-signal-tint)] text-[var(--color-signal)]",
        gold: "border-transparent bg-[var(--color-gold-tint)] text-[var(--color-gold)]",
        outline: "border-[var(--color-line)] text-[var(--color-muted)]",
      },
    },
    defaultVariants: { variant: "default" },
  }
);

function Badge({ className, variant, ...props }) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
