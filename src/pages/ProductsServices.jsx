import { useBusinessStore } from "@/store/useBusinessStore";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { formatCurrency } from "@/lib/utils";

const STATUS_TONE = {
  Available: "accent",
  "In stock": "accent",
  Active: "accent",
  Occupied: "outline",
  Reserved: "gold",
  "Low stock": "signal",
  "Deadline soon": "signal",
  "Out of stock": "signal",
  Cleaning: "gold",
};

function StatusBadge({ status }) {
  return <Badge variant={STATUS_TONE[status] ?? "outline"}>{status}</Badge>;
}

export default function ProductsServices() {
  const { businessType, data } = useBusinessStore();
  const items = data.products;
  const hasStock = items.some((p) => p.stock !== null);
  const isRoomLike = businessType.id === "hotel";

  if (isRoomLike) {
    return (
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {items.map((r) => (
          <Card key={r.id} className="p-4">
            <div className="flex items-start justify-between">
              <p className="font-serif text-[15px] leading-tight">{r.name}</p>
            </div>
            <p className="mt-1 text-[12px] text-[var(--color-muted)]">{r.meta}</p>
            <div className="mt-4 flex items-center justify-between">
              <StatusBadge status={r.status} />
              <span className="font-mono-tab text-[13px] text-[var(--color-ink)]">
                {formatCurrency(r.value, businessType.currency)}/night
              </span>
            </div>
          </Card>
        ))}
      </div>
    );
  }

  if (hasStock) {
    return (
      <Card className="overflow-hidden">
        <table className="w-full text-left text-[13px]">
          <thead>
            <tr className="border-b border-[var(--color-line)] text-[11.5px] uppercase tracking-wide text-[var(--color-muted)]">
              <th className="px-5 py-3 font-medium">{businessType.productSingular}</th>
              <th className="px-5 py-3 font-medium">Details</th>
              <th className="px-5 py-3 font-medium">Stock</th>
              <th className="px-5 py-3 font-medium text-right">Price</th>
            </tr>
          </thead>
          <tbody>
            {items.map((p) => (
              <tr key={p.id} className="border-b border-[var(--color-line)] last:border-0">
                <td className="px-5 py-3 font-medium text-[var(--color-ink)]">{p.name}</td>
                <td className="px-5 py-3 text-[var(--color-muted)]">{p.meta}</td>
                <td className="px-5 py-3">
                  <div className="flex items-center gap-2">
                    <div className="w-24">
                      <Progress value={(p.stock / 40) * 100} tone={p.stock <= 5 ? "signal" : "accent"} />
                    </div>
                    <span className="text-[12px] text-[var(--color-muted)]">{p.stock}</span>
                  </div>
                </td>
                <td className="px-5 py-3 text-right font-mono-tab">{formatCurrency(p.value, businessType.currency)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {items.map((p) => (
        <Card key={p.id} className="flex items-center justify-between p-4">
          <div>
            <p className="font-medium text-[var(--color-ink)]">{p.name}</p>
            <p className="text-[12.5px] text-[var(--color-muted)]">{p.meta}</p>
          </div>
          <StatusBadge status={p.status} />
        </Card>
      ))}
    </div>
  );
}
