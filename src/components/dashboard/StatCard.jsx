import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export function StatCard({ label, value, hint, tone = "default" }) {
  const toneClass =
    tone === "signal"
      ? "text-[var(--color-signal)]"
      : tone === "accent"
      ? "text-[var(--color-accent)]"
      : "text-[var(--color-ink)]";

  return (
    <Card className="p-5">
      <p className="text-[12.5px] text-[var(--color-muted)]">{label}</p>
      <p className={cn("mt-2 font-mono-tab text-[26px] font-medium leading-none", toneClass)}>{value}</p>
      {hint && <p className="mt-2 text-[12px] text-[var(--color-muted)]">{hint}</p>}
    </Card>
  );
}
