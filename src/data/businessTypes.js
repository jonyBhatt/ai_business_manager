// Every vertical plugs the same core (Customers, Finance, Tasks, Staff, Reports,
// AI Assistant, Settings) and only swaps in its own Products/Services and
// Orders/Bookings vocabulary + focus checks. This mirrors the "core + industry
// module" architecture from the product doc.

export const BUSINESS_TYPES = [
  {
    id: "hotel",
    label: "Hotel",
    tagline: "Rooms & Bookings",
    icon: "BedDouble",
    productsLabel: "Rooms",
    productSingular: "room",
    ordersLabel: "Bookings",
    orderSingular: "booking",
    currency: "USD",
    focusChecks: [
      "Check-ins today",
      "Check-outs today",
      "Empty rooms tonight",
      "Housekeeping status",
      "Overdue payments",
      "Guest complaints",
    ],
  },
  {
    id: "shop",
    label: "Retail Shop",
    tagline: "Inventory & Sales",
    icon: "Store",
    productsLabel: "Products",
    productSingular: "product",
    ordersLabel: "Sales",
    orderSingular: "sale",
    currency: "USD",
    focusChecks: [
      "Products low in stock",
      "Sales today",
      "Supplier orders due",
      "Outstanding payments",
      "Best-selling product",
    ],
  },
  {
    id: "agency",
    label: "Education Agency",
    tagline: "Applications & Documents",
    icon: "GraduationCap",
    productsLabel: "Universities",
    productSingular: "university",
    ordersLabel: "Applications",
    orderSingular: "application",
    currency: "USD",
    focusChecks: [
      "Applications with deadlines this week",
      "Students with incomplete documents",
      "Visa tracking updates",
      "Student payments due",
      "Follow-ups pending",
    ],
  },
  {
    id: "restaurant",
    label: "Restaurant",
    tagline: "Menu & Kitchen",
    icon: "UtensilsCrossed",
    productsLabel: "Menu",
    productSingular: "menu item",
    ordersLabel: "Orders",
    orderSingular: "order",
    currency: "USD",
    focusChecks: [
      "Ingredients running low",
      "Orders in the kitchen",
      "Tables to turn over",
      "Ingredients to purchase tomorrow",
      "Best-selling item today",
    ],
  },
  {
    id: "it-agency",
    label: "IT Agency",
    tagline: "Projects & Milestones",
    icon: "Code2",
    productsLabel: "Services",
    productSingular: "service",
    ordersLabel: "Projects",
    orderSingular: "project",
    currency: "USD",
    focusChecks: [
      "Projects overdue",
      "Invoices unpaid",
      "Milestones due this week",
      "Developers without an active task",
      "Client follow-ups",
    ],
  },
];

export function getBusinessType(id) {
  return BUSINESS_TYPES.find((b) => b.id === id) ?? BUSINESS_TYPES[0];
}
