import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppShell } from "@/components/layout/AppShell";
import Dashboard from "@/pages/Dashboard";
import Customers from "@/pages/Customers";
import Finance from "@/pages/Finance";
import ProductsServices from "@/pages/ProductsServices";
import OrdersBookings from "@/pages/OrdersBookings";
import Staff from "@/pages/Staff";
import Tasks from "@/pages/Tasks";
import Reports from "@/pages/Reports";
import AIAssistant from "@/pages/AIAssistant";
import Settings from "@/pages/Settings";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppShell />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/finance" element={<Finance />} />
          <Route path="/products" element={<ProductsServices />} />
          <Route path="/orders" element={<OrdersBookings />} />
          <Route path="/staff" element={<Staff />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/ai-assistant" element={<AIAssistant />} />
          <Route path="/settings" element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
