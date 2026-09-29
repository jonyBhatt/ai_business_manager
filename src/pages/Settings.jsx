import {
  BedDouble,
  Store,
  GraduationCap,
  UtensilsCrossed,
  Code2,
  Check,
} from "lucide-react";
import { BUSINESS_TYPES, useBusinessStore } from "@/store/useBusinessStore";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const ICONS = { BedDouble, Store, GraduationCap, UtensilsCrossed, Code2 };

export default function Settings() {
  const { businessTypeId, setBusinessType } = useBusinessStore();

  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Business profile</CardTitle>
          <CardDescription>The core details every module reads from.</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <label className="flex flex-col gap-1.5">
            <span className="text-[12.5px] font-medium text-[var(--color-muted)]">Business name</span>
            <Input defaultValue="Nova Ridge Ventures" />
          </label>
          <label className="flex flex-col gap-1.5">
            <span className="text-[12.5px] font-medium text-[var(--color-muted)]">Owner</span>
            <Input defaultValue="Nafis Rahman" />
          </label>
          <label className="flex flex-col gap-1.5">
            <span className="text-[12.5px] font-medium text-[var(--color-muted)]">Email</span>
            <Input defaultValue="owner@novaridge.com" />
          </label>
          <label className="flex flex-col gap-1.5">
            <span className="text-[12.5px] font-medium text-[var(--color-muted)]">Currency</span>
            <Input defaultValue="USD" />
          </label>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Business type</CardTitle>
          <CardDescription>
            Switching this swaps the industry module — its own Products/Services and Orders/Bookings vocabulary,
            data, and AI focus checks — while the core (Customers, Finance, Tasks, Staff, Reports) stays exactly
            the same.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {BUSINESS_TYPES.map((b) => {
            const Icon = ICONS[b.icon];
            const active = b.id === businessTypeId;
            return (
              <button
                key={b.id}
                onClick={() => setBusinessType(b.id)}
                className={cn(
                  "flex items-start gap-3 rounded-lg border p-4 text-left transition-colors",
                  active
                    ? "border-[var(--color-accent)] bg-[var(--color-accent-tint)]"
                    : "border-[var(--color-line)] bg-white hover:border-[var(--color-accent)]/50"
                )}
              >
                <Icon size={18} className={active ? "text-[var(--color-accent-strong)]" : "text-[var(--color-muted)]"} />
                <div className="flex-1">
                  <p className="text-[13.5px] font-medium text-[var(--color-ink)]">{b.label}</p>
                  <p className="text-[12px] text-[var(--color-muted)]">{b.tagline}</p>
                </div>
                {active && <Check size={16} className="text-[var(--color-accent-strong)]" />}
              </button>
            );
          })}
        </CardContent>
      </Card>
    </div>
  );
}
