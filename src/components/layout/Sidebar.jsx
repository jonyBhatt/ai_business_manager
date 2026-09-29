import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Wallet,
  Package,
  ClipboardList,
  Users2,
  CheckSquare,
  BarChart3,
  Sparkles,
  Settings as SettingsIcon,
  BedDouble,
  Store,
  GraduationCap,
  UtensilsCrossed,
  Code2,
} from "lucide-react";
import { useBusinessStore } from "@/store/useBusinessStore";
import { cn } from "@/lib/utils";

const VERTICAL_ICONS = {
  BedDouble,
  Store,
  GraduationCap,
  UtensilsCrossed,
  Code2,
};

const CORE_NAV = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/customers", label: "Customers", icon: Users },
  { to: "/finance", label: "Finance", icon: Wallet },
];

const CORE_NAV_2 = [
  { to: "/staff", label: "Staff", icon: Users2 },
  { to: "/tasks", label: "Tasks", icon: CheckSquare },
  { to: "/reports", label: "Reports", icon: BarChart3 },
];

function NavItem({ to, label, icon: Icon, end }) {
  return (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) =>
        cn(
          "group flex items-center gap-3 rounded-md px-3 py-2 text-[13.5px] font-medium transition-colors",
          isActive
            ? "bg-white/10 text-white"
            : "text-white/60 hover:bg-white/5 hover:text-white/90"
        )
      }
    >
      <Icon size={17} strokeWidth={1.75} />
      <span>{label}</span>
    </NavLink>
  );
}

export function Sidebar() {
  const { businessType } = useBusinessStore();
  const VerticalIcon = VERTICAL_ICONS[businessType.icon] ?? Package;

  return (
    <aside className="flex h-full w-64 shrink-0 flex-col bg-[var(--color-ink)] px-4 py-5">
      <div className="mb-6 flex items-center gap-2 px-1">
        <div className="flex h-8 w-8 items-center justify-center rounded-md bg-[var(--color-accent)] font-serif text-[15px] text-white">
          L
        </div>
        <div>
          <p className="font-serif text-[16px] leading-none text-white">Ledger</p>
          <p className="mt-1 text-[11px] leading-none text-white/40">Your business. One AI.</p>
        </div>
      </div>

      <div className="mb-4 flex items-center gap-2 rounded-md border border-white/10 bg-white/[0.04] px-3 py-2">
        <VerticalIcon size={16} className="text-[var(--color-gold)]" strokeWidth={1.75} />
        <div className="leading-tight">
          <p className="text-[12.5px] font-medium text-white">{businessType.label}</p>
          <p className="text-[11px] text-white/40">{businessType.tagline}</p>
        </div>
      </div>

      <nav className="flex flex-1 flex-col gap-4 overflow-y-auto scroll-quiet">
        <div className="flex flex-col gap-0.5">
          {CORE_NAV.map((item) => (
            <NavItem key={item.to} {...item} />
          ))}
        </div>

        <div>
          <p className="mb-1 px-3 text-[10.5px] font-medium uppercase tracking-wide text-white/30">
            {businessType.label}
          </p>
          <div className="flex flex-col gap-0.5">
            <NavItem to="/products" label={businessType.productsLabel} icon={VerticalIcon} />
            <NavItem to="/orders" label={businessType.ordersLabel} icon={ClipboardList} />
          </div>
        </div>

        <div className="flex flex-col gap-0.5">
          {CORE_NAV_2.map((item) => (
            <NavItem key={item.to} {...item} />
          ))}
        </div>

        <div className="mt-auto flex flex-col gap-0.5 border-t border-white/10 pt-3">
          <NavItem to="/ai-assistant" label="AI Assistant" icon={Sparkles} />
          <NavItem to="/settings" label="Settings" icon={SettingsIcon} />
        </div>
      </nav>
    </aside>
  );
}
