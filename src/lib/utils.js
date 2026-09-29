import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(value, currency = "USD") {
  const symbols = { USD: "$", BDT: "৳", EUR: "€", GBP: "£" };
  const symbol = symbols[currency] ?? "$";
  const n = Number(value) || 0;
  return `${symbol}${n.toLocaleString("en-US", { maximumFractionDigits: 0 })}`;
}

export function initials(name = "") {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase())
    .join("");
}
