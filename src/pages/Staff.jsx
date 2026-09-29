import { useBusinessStore } from "@/store/useBusinessStore";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { initials } from "@/lib/utils";

export default function Staff() {
  const { data } = useBusinessStore();

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {data.staff.map((s) => (
        <Card key={s.id} className="p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--color-ink)] font-serif text-[13px] text-white">
              {initials(s.name)}
            </div>
            <div>
              <p className="font-medium text-[var(--color-ink)]">{s.name}</p>
              <p className="text-[12px] text-[var(--color-muted)]">{s.role}</p>
            </div>
          </div>
          <p className="mt-4 text-[12.5px] text-[var(--color-muted)]">Currently: {s.active}</p>
          <div className="mt-3 flex items-center gap-2">
            <Progress value={s.load} tone={s.load > 85 ? "signal" : "accent"} className="flex-1" />
            <span className="text-[11.5px] text-[var(--color-muted)]">{s.load}% load</span>
          </div>
        </Card>
      ))}
    </div>
  );
}
