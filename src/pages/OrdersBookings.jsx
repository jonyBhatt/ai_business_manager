import { useBusinessStore } from "@/store/useBusinessStore";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/lib/utils";

const STATUS_TONE = {
  "Checked in": "accent",
  Completed: "accent",
  Confirmed: "accent",
  Served: "accent",
  "On track": "accent",
  Submitted: "accent",
  "Needs confirmation": "gold",
  "Pending payment": "signal",
  "Awaiting stock": "gold",
  "Documents incomplete": "signal",
  "Under review": "gold",
  "Visa in process": "gold",
  "In kitchen": "gold",
  "Out for delivery": "gold",
  Overdue: "signal",
};

export default function OrdersBookings() {
  const { businessType, data } = useBusinessStore();

  return (
    <Card className="overflow-hidden">
      <table className="w-full text-left text-[13px]">
        <thead>
          <tr className="border-b border-[var(--color-line)] text-[11.5px] uppercase tracking-wide text-[var(--color-muted)]">
            <th className="px-5 py-3 font-medium">{businessType.orderSingular}</th>
            <th className="px-5 py-3 font-medium">Details</th>
            <th className="px-5 py-3 font-medium">Status</th>
            <th className="px-5 py-3 font-medium">When</th>
            <th className="px-5 py-3 font-medium text-right">Amount</th>
          </tr>
        </thead>
        <tbody>
          {data.orders.map((o) => (
            <tr key={o.id} className="border-b border-[var(--color-line)] last:border-0">
              <td className="px-5 py-3 font-medium text-[var(--color-ink)]">{o.title}</td>
              <td className="px-5 py-3 text-[var(--color-muted)]">{o.meta}</td>
              <td className="px-5 py-3">
                <Badge variant={STATUS_TONE[o.status] ?? "outline"}>{o.status}</Badge>
              </td>
              <td className="px-5 py-3 text-[var(--color-muted)]">{o.date}</td>
              <td className="px-5 py-3 text-right font-mono-tab">{formatCurrency(o.amount, businessType.currency)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  );
}
