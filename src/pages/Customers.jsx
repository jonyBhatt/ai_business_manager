import { useState } from "react";
import { Search } from "lucide-react";
import { useBusinessStore } from "@/store/useBusinessStore";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { formatCurrency, initials } from "@/lib/utils";

export default function Customers() {
  const { businessType, data } = useBusinessStore();
  const [q, setQ] = useState("");

  const filtered = data.customers.filter((c) => c.name.toLowerCase().includes(q.toLowerCase()));

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <p className="text-[13px] text-[var(--color-muted)]">
          {data.customers.length} customer profiles · {data.customers.filter((c) => c.outstanding > 0).length} with
          outstanding balances
        </p>
        <div className="relative">
          <Search size={15} className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-[var(--color-muted)]" />
          <Input placeholder="Search customers…" className="w-64 pl-8" value={q} onChange={(e) => setQ(e.target.value)} />
        </div>
      </div>

      <Card className="overflow-hidden">
        <table className="w-full text-left text-[13px]">
          <thead>
            <tr className="border-b border-[var(--color-line)] text-[11.5px] uppercase tracking-wide text-[var(--color-muted)]">
              <th className="px-5 py-3 font-medium">Customer</th>
              <th className="px-5 py-3 font-medium">Contact</th>
              <th className="px-5 py-3 font-medium">Last activity</th>
              <th className="px-5 py-3 font-medium text-right">Outstanding</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((c) => (
              <tr key={c.id} className="border-b border-[var(--color-line)] last:border-0 hover:bg-white/60">
                <td className="px-5 py-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--color-accent-tint)] text-[11px] font-medium text-[var(--color-accent-strong)]">
                      {initials(c.name)}
                    </div>
                    <span className="font-medium text-[var(--color-ink)]">{c.name}</span>
                  </div>
                </td>
                <td className="px-5 py-3 text-[var(--color-muted)]">{c.contact}</td>
                <td className="px-5 py-3 text-[var(--color-muted)]">{c.last}</td>
                <td className="px-5 py-3 text-right">
                  {c.outstanding > 0 ? (
                    <Badge variant="signal">{formatCurrency(c.outstanding, businessType.currency)}</Badge>
                  ) : (
                    <span className="text-[var(--color-muted)]">Settled</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
