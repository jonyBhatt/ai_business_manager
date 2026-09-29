import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight, CircleAlert } from "lucide-react";
import { useBusinessStore } from "@/store/useBusinessStore";
import { StatCard } from "@/components/dashboard/StatCard";
import { MiniBarChart } from "@/components/charts/MiniBarChart";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/lib/utils";

const DAY_LABELS = ["Tue", "Wed", "Thu", "Fri", "Sat", "Sun", "Mon"];

export default function Dashboard() {
  const { businessType, data } = useBusinessStore();
  const revenueToday = data.revenueSeries[data.revenueSeries.length - 1];
  const revenueYesterday = data.revenueSeries[data.revenueSeries.length - 2];
  const growth = (((revenueToday - revenueYesterday) / revenueYesterday) * 100).toFixed(0);
  const outstandingTotal = data.customers.reduce((s, c) => s + (c.outstanding || 0), 0);
  const tasksDone = data.tasks.filter((t) => t.status === "done").length;
  const pendingOrders = data.orders.filter((o) =>
    ["Needs confirmation", "Documents incomplete", "Overdue", "Pending payment"].includes(o.status)
  ).length;

  const focusItems = [
    { label: businessType.focusChecks[0], count: pendingOrders || 2 },
    { label: businessType.focusChecks[1], count: data.products.filter((p) => p.status === "Low stock" || p.status === "Available").length },
    { label: "Overdue payments", count: data.customers.filter((c) => c.outstanding > 0).length },
    { label: "Tasks completed yesterday", count: tasksDone },
  ];

  return (
    <div className="flex flex-col gap-6">
      <div>
        <p className="font-serif text-[19px] text-[var(--color-ink)]">
          Good morning. Here's what needs attention today.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard
          label="Today's revenue"
          value={formatCurrency(revenueToday, businessType.currency)}
          hint={`${growth > 0 ? "+" : ""}${growth}% vs. yesterday`}
          tone="accent"
        />
        <StatCard
          label="Outstanding payments"
          value={formatCurrency(outstandingTotal, businessType.currency)}
          hint={`${data.customers.filter((c) => c.outstanding > 0).length} customers`}
          tone="signal"
        />
        <StatCard label="Tasks completed" value={tasksDone} hint="yesterday" />
        <StatCard label="Open tasks" value={data.tasks.filter((t) => t.status !== "done").length} hint="across the team" />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader className="flex-row items-center justify-between">
            <CardTitle>Revenue, last 7 days</CardTitle>
            <Link
              to="/reports"
              className="flex items-center gap-1 text-[12.5px] font-medium text-[var(--color-accent)]"
            >
              Full report <ArrowUpRight size={14} />
            </Link>
          </CardHeader>
          <CardContent>
            <MiniBarChart values={data.revenueSeries} labels={DAY_LABELS} tone="accent" height={140} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Focus today</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            {focusItems.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, x: -4 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="flex items-center justify-between rounded-md border border-[var(--color-line)] bg-white px-3 py-2"
              >
                <div className="flex items-center gap-2">
                  <CircleAlert size={14} className="text-[var(--color-gold)]" />
                  <span className="text-[13px] text-[var(--color-ink)]">{item.label}</span>
                </div>
                <Badge variant="gold">{item.count}</Badge>
              </motion.div>
            ))}
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader className="flex-row items-center justify-between">
            <CardTitle>{businessType.ordersLabel} to review</CardTitle>
            <Link to="/orders" className="text-[12.5px] font-medium text-[var(--color-accent)]">
              View all
            </Link>
          </CardHeader>
          <CardContent className="flex flex-col gap-0 divide-y divide-[var(--color-line)]">
            {data.orders.slice(0, 4).map((o) => (
              <div key={o.id} className="flex items-center justify-between py-2.5 text-[13px]">
                <div>
                  <p className="font-medium text-[var(--color-ink)]">{o.title}</p>
                  <p className="text-[12px] text-[var(--color-muted)]">{o.meta}</p>
                </div>
                <div className="text-right">
                  <p className="font-mono-tab text-[13px]">{formatCurrency(o.amount, businessType.currency)}</p>
                  <p className="text-[11px] text-[var(--color-muted)]">{o.status}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent activity</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            {data.activity.map((a, i) => (
              <div key={i} className="flex gap-2 text-[12.5px] text-[var(--color-ink)]">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-accent)]" />
                <span>{a}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
