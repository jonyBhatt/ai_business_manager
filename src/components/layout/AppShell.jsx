import { Outlet, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Sidebar } from "./Sidebar";
import { Topbar } from "./Topbar";

const TITLES = {
  "/": { title: "Dashboard", subtitle: "What needs your attention today" },
  "/customers": { title: "Customers", subtitle: "Profiles, history, and outstanding balances" },
  "/finance": { title: "Finance", subtitle: "Revenue, expenses, and profit" },
  "/products": { title: "Products", subtitle: "" },
  "/orders": { title: "Orders", subtitle: "" },
  "/staff": { title: "Staff", subtitle: "Roles, tasks, and performance" },
  "/tasks": { title: "Tasks", subtitle: "Assignments across the whole team" },
  "/reports": { title: "Reports", subtitle: "Revenue, expenses, customers, and growth" },
  "/ai-assistant": { title: "AI Assistant", subtitle: "Ask about your business, in plain language" },
  "/settings": { title: "Settings", subtitle: "Business profile and preferences" },
};

export function AppShell() {
  const location = useLocation();
  const meta = TITLES[location.pathname] ?? { title: "", subtitle: "" };

  return (
    <div className="flex h-screen w-full overflow-hidden bg-[var(--color-canvas)]">
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar title={meta.title} subtitle={meta.subtitle} />
        <main className="scroll-quiet flex-1 overflow-y-auto px-8 py-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
