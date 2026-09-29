import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export function Topbar({ title, subtitle }) {
  return (
    <header className="flex items-center justify-between border-b border-[var(--color-line)] bg-[var(--color-canvas)]/80 px-8 py-5 backdrop-blur">
      <div>
        <h1 className="font-serif text-[22px] leading-tight text-[var(--color-ink)]">{title}</h1>
        {subtitle && <p className="mt-0.5 text-[13px] text-[var(--color-muted)]">{subtitle}</p>}
      </div>
      <div className="flex items-center gap-3">
        <div className="relative hidden sm:block">
          <Search
            size={15}
            className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-[var(--color-muted)]"
          />
          <Input placeholder="Search…" className="w-56 pl-8" />
        </div>
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--color-ink)] font-serif text-[13px] text-white">
          NR
        </div>
      </div>
    </header>
  );
}
