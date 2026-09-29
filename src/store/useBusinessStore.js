import { create } from "zustand";
import { BUSINESS_TYPES, getBusinessType } from "@/data/businessTypes";
import { getMockData } from "@/data/mockData";
import { formatCurrency } from "@/lib/utils";

function buildAiReply(question, businessType, data) {
  const q = question.toLowerCase();
  const revenueToday = data.revenueSeries[data.revenueSeries.length - 1];
  const outstanding = data.customers.reduce((s, c) => s + (c.outstanding || 0), 0);
  const overdueCustomers = data.customers.filter((c) => c.outstanding > 0);

  if (q.includes("owe") || q.includes("overdue") || q.includes("outstanding")) {
    if (overdueCustomers.length === 0) return "Nobody owes you money right now — all accounts are settled.";
    return `${overdueCustomers.length} customers owe you money, totalling ${formatCurrency(
      outstanding,
      businessType.currency
    )}. The largest is ${overdueCustomers.sort((a, b) => b.outstanding - a.outstanding)[0].name} at ${formatCurrency(
      overdueCustomers[0].outstanding,
      businessType.currency
    )}.`;
  }
  if (q.includes("revenue") || q.includes("sales") || q.includes("doing")) {
    return `Today's recorded revenue is ${formatCurrency(revenueToday, businessType.currency)}, and your business is trending ${
      revenueToday > data.revenueSeries[data.revenueSeries.length - 2] ? "up" : "down"
    } compared with yesterday.`;
  }
  if (q.includes("stock") || q.includes("available") || q.includes("room")) {
    const low = data.products.filter((p) => p.status === "Low stock" || p.status === "Available").length;
    return `${low} ${businessType.productsLabel.toLowerCase()} currently show as "${
      businessType.id === "hotel" ? "available" : "low stock or available"
    }". Check the ${businessType.productsLabel} page for the full breakdown.`;
  }
  if (q.includes("focus") || q.includes("today") || q.includes("attention")) {
    return `Here's what needs attention: ${businessType.focusChecks.slice(0, 3).join(", ").toLowerCase()}.`;
  }
  if (q.includes("expense")) {
    return `Your recent expenses are logged on the Finance page — I can prepare a weekly expense summary if you'd like.`;
  }
  return `Here's a quick read on ${businessType.label.toLowerCase()}: ${formatCurrency(
    revenueToday,
    businessType.currency
  )} in revenue today, ${overdueCustomers.length} overdue accounts, and ${
    data.tasks.filter((t) => t.status !== "done").length
  } open tasks.`;
}

export const useBusinessStore = create((set, get) => ({
  businessTypeId: "hotel",
  sidebarCollapsed: false,
  aiMessages: [
    {
      id: "welcome",
      role: "ai",
      text: "Good morning. Ask me anything about your business — I can check payments, stock, bookings, or tell you what needs attention today.",
    },
  ],

  businessType: getBusinessType("hotel"),
  data: getMockData("hotel"),

  setBusinessType: (id) =>
    set(() => ({
      businessTypeId: id,
      businessType: getBusinessType(id),
      data: getMockData(id),
      aiMessages: [
        {
          id: "welcome-" + id,
          role: "ai",
          text: `Switched to ${getBusinessType(id).label}. Ask me anything about your business.`,
        },
      ],
    })),

  toggleSidebar: () => set((s) => ({ sidebarCollapsed: !s.sidebarCollapsed })),

  sendAiMessage: (text) => {
    const userMsg = { id: crypto.randomUUID(), role: "user", text };
    set((s) => ({ aiMessages: [...s.aiMessages, userMsg] }));
    const { businessType, data } = get();
    const reply = buildAiReply(text, businessType, data);
    setTimeout(() => {
      set((s) => ({
        aiMessages: [...s.aiMessages, { id: crypto.randomUUID(), role: "ai", text: reply }],
      }));
    }, 500);
  },
}));

export { BUSINESS_TYPES };
