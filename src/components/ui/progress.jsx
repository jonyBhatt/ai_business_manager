import * as React from "react";
import { cn } from "@/lib/utils";

const Progress = React.forwardRef(({ className, value = 0, tone = "accent", ...props }, ref) => {
  const bar =
    tone === "signal"
      ? "bg-[var(--color-signal)]"
      : tone === "gold"
      ? "bg-[var(--color-gold)]"
      : "bg-[var(--color-accent)]";
  return (
    <div
      ref={ref}
      className={cn("h-1.5 w-full overflow-hidden rounded-full bg-[var(--color-line)]", className)}
      {...props}
    >
      <div
        className={cn("h-full rounded-full transition-[width] duration-500", bar)}
        style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
      />
    </div>
  );
});
Progress.displayName = "Progress";

export { Progress };
