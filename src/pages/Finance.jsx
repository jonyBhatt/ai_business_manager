import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { useBusinessStore } from "@/store/useBusinessStore";
import { StatCard } from "@/components/dashboard/StatCard";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";

export default function Finance() {
  const { businessType, data } = useBusinessStore();
  const income = data.transactions.filter((t) => t.type === "income").reduce((s, t) => s + t.amount, 0);
  const expenses = data.transactions.filter((t) => t.type === "expense").reduce((s, t) => s + t.amount, 0);
  const profit = income - expenses;
  const outstanding = data.customers.reduce((s, c) => s + (c.outstanding || 0), 0);

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="Revenue" value={formatCurrency(income, businessType.currency)} tone="accent" />
        <StatCard label="Expenses" value={formatCurrency(expenses, businessType.currency)} />
        <StatCard label="Profit" value={formatCurrency(profit, businessType.currency)} tone="accent" />
        <StatCard label="Outstanding" value={formatCurrency(outstanding, businessType.currency)} tone="signal" />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Transactions</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col divide-y divide-[var(--color-line)] p-0">
          {data.transactions.map((t) => (
            <div key={t.id} className="flex items-center justify-between px-5 py-3 text-[13px]">
              <div className="flex items-center gap-3">
                <div
                  className={
                    "flex h-8 w-8 items-center justify-center rounded-full " +
                    (t.type === "income" ? "bg-[var(--color-accent-tint)]" : "bg-[var(--color-signal-tint)]")
                  }
                >
                  {t.type === "income" ? (
                    <ArrowUpRight size={15} className="text-[var(--color-accent-strong)]" />
                  ) : (
                    <ArrowDownRight size={15} className="text-[var(--color-signal)]" />
                  )}
                </div>
                <div>
                  <p className="font-medium text-[var(--color-ink)]">{t.label}</p>
                  <p className="text-[12px] text-[var(--color-muted)]">{t.date}</p>
                </div>
              </div>
              <p
                className={
                  "font-mono-tab text-[13.5px] " +
                  (t.type === "income" ? "text-[var(--color-accent-strong)]" : "text-[var(--color-signal)]")
                }
              >
                {t.type === "income" ? "+" : "−"}
                {formatCurrency(t.amount, businessType.currency)}
              </p>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
