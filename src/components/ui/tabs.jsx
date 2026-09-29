import * as React from "react";
import { cn } from "@/lib/utils";

const TabsContext = React.createContext(null);

function Tabs({ value, defaultValue, onValueChange, className, children }) {
  const [internal, setInternal] = React.useState(defaultValue);
  const active = value ?? internal;
  const setActive = (v) => {
    setInternal(v);
    onValueChange?.(v);
  };
  return (
    <TabsContext.Provider value={{ active, setActive }}>
      <div className={className}>{children}</div>
    </TabsContext.Provider>
  );
}

function TabsList({ className, children }) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-1 rounded-md border border-[var(--color-line)] bg-white p-1",
        className
      )}
    >
      {children}
    </div>
  );
}

function TabsTrigger({ value, className, children }) {
  const ctx = React.useContext(TabsContext);
  const isActive = ctx.active === value;
  return (
    <button
      type="button"
      onClick={() => ctx.setActive(value)}
      className={cn(
        "rounded px-3 py-1.5 text-[13px] font-medium transition-colors",
        isActive
          ? "bg-[var(--color-ink)] text-white"
          : "text-[var(--color-muted)] hover:text-[var(--color-ink)]",
        className
      )}
    >
      {children}
    </button>
  );
}

function TabsContent({ value, className, children }) {
  const ctx = React.useContext(TabsContext);
  if (ctx.active !== value) return null;
  return <div className={className}>{children}</div>;
}

export { Tabs, TabsList, TabsTrigger, TabsContent };
