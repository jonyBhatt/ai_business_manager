// Deterministic mock data, shaped per vertical, standing in for the Django
// core models (Customer, Transaction, Task, Employee) plus each industry
// module's own objects (Room, Product, Application, MenuItem, Project...).

const REVENUE_SERIES = {
  hotel: [820, 940, 1100, 980, 1260, 1510, 1840],
  shop: [410, 520, 380, 610, 590, 720, 690],
  agency: [1200, 1350, 980, 1430, 1600, 1520, 1710],
  restaurant: [640, 700, 610, 780, 900, 1120, 980],
  "it-agency": [2200, 1800, 2600, 3100, 2400, 2900, 3400],
};

const PRODUCTS = {
  hotel: [
    { id: "R101", name: "Room 101 — Deluxe King", status: "Available", meta: "2nd floor · sea view", value: 140, stock: null },
    { id: "R102", name: "Room 102 — Deluxe King", status: "Occupied", meta: "Guest: A. Rahman · until Thu", value: 140, stock: null },
    { id: "R103", name: "Room 103 — Twin", status: "Cleaning", meta: "Housekeeping ETA 25 min", value: 95, stock: null },
    { id: "R104", name: "Room 104 — Twin", status: "Reserved", meta: "Arriving 3:00 PM", value: 95, stock: null },
    { id: "R201", name: "Room 201 — Suite", status: "Available", meta: "3rd floor · balcony", value: 260, stock: null },
    { id: "R202", name: "Room 202 — Suite", status: "Occupied", meta: "Guest: Tanvir Hossain", value: 260, stock: null },
    { id: "R305", name: "Room 305 — Family", status: "Available", meta: "Top floor · 2 queen beds", value: 210, stock: null },
    { id: "R306", name: "Room 306 — Family", status: "Cleaning", meta: "Housekeeping ETA 10 min", value: 210, stock: null },
  ],
  shop: [
    { id: "P-001", name: "Black Cotton Shirt", status: "In stock", meta: "Apparel · Supplier: Nova Textiles", value: 22, stock: 6 },
    { id: "P-002", name: "Denim Jacket", status: "Low stock", meta: "Apparel · Supplier: Nova Textiles", value: 48, stock: 2 },
    { id: "P-003", name: "White Sneakers", status: "In stock", meta: "Footwear · Supplier: StrideCo", value: 65, stock: 14 },
    { id: "P-004", name: "Leather Belt", status: "Low stock", meta: "Accessories · Supplier: Hidework", value: 18, stock: 3 },
    { id: "P-005", name: "Wool Scarf", status: "In stock", meta: "Accessories · Supplier: Hidework", value: 25, stock: 20 },
    { id: "P-006", name: "Slim Fit Trousers", status: "Out of stock", meta: "Apparel · Supplier: Nova Textiles", value: 40, stock: 0 },
  ],
  agency: [
    { id: "U-01", name: "University of Toronto", status: "Active", meta: "Canada · Fall intake open", value: null, stock: null },
    { id: "U-02", name: "University of Melbourne", status: "Active", meta: "Australia · 12 applications in progress", value: null, stock: null },
    { id: "U-03", name: "Humber College", status: "Active", meta: "Canada · Documents pending for 4 students", value: null, stock: null },
    { id: "U-04", name: "University of Manchester", status: "Deadline soon", meta: "UK · Closes in 5 days", value: null, stock: null },
    { id: "U-05", name: "Deakin University", status: "Active", meta: "Australia · Spring intake open", value: null, stock: null },
  ],
  restaurant: [
    { id: "M-01", name: "Beef Tehari", status: "Available", meta: "Main · 32 sold this week", value: 9, stock: 40 },
    { id: "M-02", name: "Chicken Biryani", status: "Available", meta: "Main · 51 sold this week", value: 8, stock: 12 },
    { id: "M-03", name: "Grilled Chicken Chargha", status: "Low stock", meta: "Needs 6kg chicken", value: 11, stock: 4 },
    { id: "M-04", name: "Vegetable Fried Rice", status: "Available", meta: "Main · vegetarian", value: 6, stock: 25 },
    { id: "M-05", name: "Mango Lassi", status: "Low stock", meta: "Needs mango pulp restock", value: 3, stock: 5 },
  ],
  "it-agency": [
    { id: "S-01", name: "Web App Development", status: "Active", meta: "Fixed-price & retainer", value: null, stock: null },
    { id: "S-02", name: "Mobile App Development", status: "Active", meta: "iOS & Android", value: null, stock: null },
    { id: "S-03", name: "UI / UX Design", status: "Active", meta: "Discovery to hi-fi", value: null, stock: null },
    { id: "S-04", name: "DevOps & Infrastructure", status: "Active", meta: "Monthly retainer", value: null, stock: null },
  ],
};

const ORDERS = {
  hotel: [
    { id: "B-3301", title: "A. Rahman", meta: "Room 102 · 3 nights", status: "Checked in", amount: 420, date: "Sep 26" },
    { id: "B-3302", title: "Tanvir Hossain", meta: "Room 202 · 2 nights", status: "Checked in", amount: 520, date: "Sep 27" },
    { id: "B-3303", title: "Farah Chowdhury", meta: "Room 104 · 1 night", status: "Confirmed", amount: 95, date: "Sep 28" },
    { id: "B-3304", title: "James Whitfield", meta: "Room 201 · 4 nights", status: "Needs confirmation", amount: 1040, date: "Sep 29" },
    { id: "B-3305", title: "Nusrat Jahan", meta: "Room 306 · 2 nights", status: "Needs confirmation", amount: 420, date: "Sep 29" },
    { id: "B-3306", title: "Michael Osei", meta: "Room 101 · checked out", status: "Completed", amount: 280, date: "Sep 24" },
  ],
  shop: [
    { id: "S-9001", title: "Walk-in customer", meta: "2× Black Cotton Shirt", status: "Completed", amount: 44, date: "Sep 28" },
    { id: "S-9002", title: "Rima Akter", meta: "Denim Jacket, Leather Belt", status: "Completed", amount: 66, date: "Sep 28" },
    { id: "S-9003", title: "Walk-in customer", meta: "1× White Sneakers", status: "Completed", amount: 65, date: "Sep 27" },
    { id: "S-9004", title: "Kabir Traders (wholesale)", meta: "20× Wool Scarf", status: "Pending payment", amount: 500, date: "Sep 25" },
    { id: "S-9005", title: "Online order #4471", meta: "1× Slim Fit Trousers", status: "Awaiting stock", amount: 40, date: "Sep 28" },
  ],
  agency: [
    { id: "A-501", title: "Sadia Islam", meta: "University of Toronto · Undergrad", status: "Documents incomplete", amount: 1200, date: "Deadline Oct 3" },
    { id: "A-502", title: "Rakib Hasan", meta: "Humber College · Diploma", status: "Under review", amount: 950, date: "Deadline Oct 1" },
    { id: "A-503", title: "Mou Akhter", meta: "University of Manchester · Masters", status: "Documents incomplete", amount: 1400, date: "Deadline Oct 2" },
    { id: "A-504", title: "Tanjil Ahmed", meta: "Deakin University · Undergrad", status: "Submitted", amount: 1100, date: "Deadline Oct 10" },
    { id: "A-505", title: "Prianka Das", meta: "University of Melbourne · Masters", status: "Visa in process", amount: 1600, date: "Deadline Oct 14" },
  ],
  restaurant: [
    { id: "O-771", title: "Table 4", meta: "2× Chicken Biryani, 1× Lassi", status: "In kitchen", amount: 19, date: "12:41 PM" },
    { id: "O-772", title: "Table 7", meta: "1× Beef Tehari", status: "Served", amount: 9, date: "12:22 PM" },
    { id: "O-773", title: "Delivery — Foodpanda", meta: "3× Vegetable Fried Rice", status: "Out for delivery", amount: 18, date: "12:05 PM" },
    { id: "O-774", title: "Table 2", meta: "1× Chargha, 2× Lassi", status: "In kitchen", amount: 17, date: "12:50 PM" },
    { id: "O-775", title: "Table 9", meta: "4× Chicken Biryani", status: "Served", amount: 32, date: "11:58 AM" },
  ],
  "it-agency": [
    { id: "PR-12", title: "Northwind CRM Rebuild", meta: "Client: Northwind Logistics", status: "Overdue", amount: 8200, date: "Due Sep 20" },
    { id: "PR-13", title: "Fintra Mobile App", meta: "Client: Fintra Ltd", status: "On track", amount: 14500, date: "Due Oct 15" },
    { id: "PR-14", title: "Coastal Booking Platform", meta: "Client: Coastal Stays", status: "On track", amount: 9600, date: "Due Nov 2" },
    { id: "PR-15", title: "Aster Brand Site", meta: "Client: Aster Studio", status: "Overdue", amount: 3200, date: "Due Sep 22" },
    { id: "PR-16", title: "DevOps Retainer — Q4", meta: "Client: Northwind Logistics", status: "On track", amount: 4000, date: "Monthly" },
  ],
};

const CUSTOMERS = {
  hotel: [
    { id: 1, name: "A. Rahman", contact: "+880 1711-223344", last: "Checked in · Room 102", outstanding: 0 },
    { id: 2, name: "James Whitfield", contact: "j.whitfield@mail.com", last: "Booking pending confirmation", outstanding: 1040 },
    { id: 3, name: "Farah Chowdhury", contact: "+880 1922-556677", last: "Confirmed for Sep 28", outstanding: 0 },
    { id: 4, name: "Michael Osei", contact: "mosei@mail.com", last: "Checked out Sep 24", outstanding: 280 },
    { id: 5, name: "Nusrat Jahan", contact: "+880 1611-889900", last: "Booking pending confirmation", outstanding: 420 },
  ],
  shop: [
    { id: 1, name: "Rima Akter", contact: "+880 1755-112233", last: "Purchased Denim Jacket", outstanding: 0 },
    { id: 2, name: "Kabir Traders", contact: "kabir.traders@mail.com", last: "Wholesale order pending payment", outstanding: 500 },
    { id: 3, name: "Nasir Uddin", contact: "+880 1811-998877", last: "Regular · 12 visits", outstanding: 0 },
    { id: 4, name: "Sultana Begum", contact: "+880 1911-334455", last: "Store credit balance", outstanding: 120 },
  ],
  agency: [
    { id: 1, name: "Sadia Islam", contact: "sadia.islam@mail.com", last: "Documents incomplete", outstanding: 1200 },
    { id: 2, name: "Rakib Hasan", contact: "+880 1733-221100", last: "Application under review", outstanding: 950 },
    { id: 3, name: "Mou Akhter", contact: "mou.akhter@mail.com", last: "Documents incomplete", outstanding: 1400 },
    { id: 4, name: "Tanjil Ahmed", contact: "+880 1644-778899", last: "Application submitted", outstanding: 0 },
    { id: 5, name: "Prianka Das", contact: "prianka.das@mail.com", last: "Visa in process", outstanding: 1600 },
  ],
  restaurant: [
    { id: 1, name: "Walk-in guests", contact: "—", last: "Table 4, 7, 2 active", outstanding: 0 },
    { id: 2, name: "Foodpanda Partner", contact: "partners@foodpanda.com", last: "3 deliveries today", outstanding: 0 },
    { id: 3, name: "Corporate — Nexus Ltd", contact: "events@nexus.com", last: "Weekly lunch order", outstanding: 210 },
  ],
  "it-agency": [
    { id: 1, name: "Northwind Logistics", contact: "ops@northwind.com", last: "CRM rebuild overdue", outstanding: 8200 },
    { id: 2, name: "Fintra Ltd", contact: "hello@fintra.io", last: "Mobile app on track", outstanding: 0 },
    { id: 3, name: "Coastal Stays", contact: "team@coastalstays.com", last: "Booking platform in dev", outstanding: 2400 },
    { id: 4, name: "Aster Studio", contact: "aster@studio.com", last: "Brand site overdue", outstanding: 3200 },
  ],
};

const STAFF = {
  hotel: [
    { id: 1, name: "Imran Kabir", role: "Front Desk Manager", load: 72, active: "3 check-ins today" },
    { id: 2, name: "Lina Chowdhury", role: "Housekeeping Lead", load: 88, active: "4 rooms in queue" },
    { id: 3, name: "Omar Faruk", role: "Night Auditor", load: 40, active: "Reconciling ledgers" },
  ],
  shop: [
    { id: 1, name: "Sabrina Yasmin", role: "Store Manager", load: 65, active: "Restocking apparel" },
    { id: 2, name: "Hasib Rahman", role: "Sales Associate", load: 54, active: "On the floor" },
    { id: 3, name: "Palash Dey", role: "Inventory Clerk", load: 80, active: "Counting stock" },
  ],
  agency: [
    { id: 1, name: "Farzana Yasmin", role: "Counsellor", load: 90, active: "6 active students" },
    { id: 2, name: "Rezaul Karim", role: "Document Officer", load: 76, active: "Reviewing documents" },
    { id: 3, name: "Nabila Haque", role: "Visa Coordinator", load: 58, active: "3 visas in process" },
  ],
  restaurant: [
    { id: 1, name: "Chef Kamal", role: "Head Chef", load: 82, active: "Kitchen — 3 orders" },
    { id: 2, name: "Rupa Sultana", role: "Floor Manager", load: 60, active: "Tables 2, 4, 7" },
    { id: 3, name: "Jashim Uddin", role: "Delivery Coordinator", load: 45, active: "1 delivery out" },
  ],
  "it-agency": [
    { id: 1, name: "Arif Chowdhury", role: "Lead Developer", load: 95, active: "Northwind CRM" },
    { id: 2, name: "Meherun Nesa", role: "Product Designer", load: 70, active: "Fintra Mobile App" },
    { id: 3, name: "Tahsin Rahman", role: "DevOps Engineer", load: 55, active: "Q4 retainer" },
  ],
};

const TASKS = {
  hotel: [
    { id: 1, title: "Prepare Room 104 for 3 PM arrival", status: "todo", owner: "Lina Chowdhury" },
    { id: 2, title: "Confirm booking B-3304 with guest", status: "todo", owner: "Imran Kabir" },
    { id: 3, title: "Restock minibar — floor 2", status: "in_progress", owner: "Lina Chowdhury" },
    { id: 4, title: "Reconcile last night's ledger", status: "in_progress", owner: "Omar Faruk" },
    { id: 5, title: "Deep clean Room 103", status: "done", owner: "Lina Chowdhury" },
    { id: 6, title: "Send checkout receipt to M. Osei", status: "done", owner: "Imran Kabir" },
  ],
  shop: [
    { id: 1, title: "Reorder Denim Jackets from Nova Textiles", status: "todo", owner: "Palash Dey" },
    { id: 2, title: "Follow up on Kabir Traders payment", status: "todo", owner: "Sabrina Yasmin" },
    { id: 3, title: "Count evening stock", status: "in_progress", owner: "Palash Dey" },
    { id: 4, title: "Update window display", status: "in_progress", owner: "Hasib Rahman" },
    { id: 5, title: "Process wholesale delivery", status: "done", owner: "Palash Dey" },
  ],
  agency: [
    { id: 1, title: "Chase documents from Sadia Islam", status: "todo", owner: "Rezaul Karim" },
    { id: 2, title: "Submit Mou Akhter's application", status: "todo", owner: "Farzana Yasmin" },
    { id: 3, title: "Visa interview prep — Prianka Das", status: "in_progress", owner: "Nabila Haque" },
    { id: 4, title: "Review Manchester deadline list", status: "in_progress", owner: "Farzana Yasmin" },
    { id: 5, title: "Confirm Tanjil Ahmed's submission", status: "done", owner: "Rezaul Karim" },
  ],
  restaurant: [
    { id: 1, title: "Order chicken for tomorrow", status: "todo", owner: "Chef Kamal" },
    { id: 2, title: "Restock mango pulp", status: "todo", owner: "Rupa Sultana" },
    { id: 3, title: "Prep Table 4 order", status: "in_progress", owner: "Chef Kamal" },
    { id: 4, title: "Coordinate Foodpanda pickup", status: "in_progress", owner: "Jashim Uddin" },
    { id: 5, title: "Clean Table 9", status: "done", owner: "Rupa Sultana" },
  ],
  "it-agency": [
    { id: 1, title: "Push Northwind CRM overdue fix", status: "todo", owner: "Arif Chowdhury" },
    { id: 2, title: "Send Aster Studio invoice reminder", status: "todo", owner: "Meherun Nesa" },
    { id: 3, title: "Fintra sprint review", status: "in_progress", owner: "Meherun Nesa" },
    { id: 4, title: "Set up staging for Coastal Stays", status: "in_progress", owner: "Tahsin Rahman" },
    { id: 5, title: "Close Q3 retainer report", status: "done", owner: "Tahsin Rahman" },
  ],
};

const TRANSACTIONS = {
  hotel: [
    { id: 1, type: "income", label: "Booking B-3302 payment", amount: 520, date: "Sep 27" },
    { id: 2, type: "income", label: "Booking B-3301 payment", amount: 420, date: "Sep 26" },
    { id: 3, type: "expense", label: "Linen supplier — invoice #221", amount: 180, date: "Sep 25" },
    { id: 4, type: "expense", label: "Housekeeping supplies", amount: 65, date: "Sep 24" },
    { id: 5, type: "income", label: "Booking B-3306 (checked out)", amount: 280, date: "Sep 24" },
  ],
  shop: [
    { id: 1, type: "income", label: "Sale S-9002", amount: 66, date: "Sep 28" },
    { id: 2, type: "income", label: "Sale S-9001", amount: 44, date: "Sep 28" },
    { id: 3, type: "expense", label: "Nova Textiles restock", amount: 210, date: "Sep 26" },
    { id: 4, type: "expense", label: "Store rent", amount: 400, date: "Sep 25" },
    { id: 5, type: "income", label: "Sale S-9003", amount: 65, date: "Sep 27" },
  ],
  agency: [
    { id: 1, type: "income", label: "Tanjil Ahmed — application fee", amount: 1100, date: "Sep 27" },
    { id: 2, type: "income", label: "Rakib Hasan — service fee", amount: 950, date: "Sep 26" },
    { id: 3, type: "expense", label: "University partner commission", amount: 300, date: "Sep 24" },
    { id: 4, type: "expense", label: "Office rent", amount: 500, date: "Sep 20" },
  ],
  restaurant: [
    { id: 1, type: "income", label: "Table 9 order", amount: 32, date: "Sep 28" },
    { id: 2, type: "income", label: "Delivery — Foodpanda", amount: 18, date: "Sep 28" },
    { id: 3, type: "expense", label: "Chicken & produce delivery", amount: 140, date: "Sep 27" },
    { id: 4, type: "expense", label: "Gas cylinder refill", amount: 45, date: "Sep 26" },
  ],
  "it-agency": [
    { id: 1, type: "income", label: "Fintra — milestone 2 payment", amount: 5000, date: "Sep 25" },
    { id: 2, type: "expense", label: "Cloud infrastructure — AWS", amount: 640, date: "Sep 24" },
    { id: 3, type: "expense", label: "Contractor payout — design", amount: 1200, date: "Sep 22" },
    { id: 4, type: "income", label: "Coastal Stays — deposit", amount: 3000, date: "Sep 20" },
  ],
};

const ACTIVITY = {
  hotel: [
    "Lina checked in guest A. Rahman to Room 102",
    "Payment of $520 received for booking B-3302",
    "Housekeeping marked Room 103 as cleaning",
    "New booking request from James Whitfield",
  ],
  shop: [
    "Sale completed — 2× Black Cotton Shirt",
    "Denim Jacket stock fell below threshold",
    "Kabir Traders wholesale order placed",
    "Palash finished evening stock count",
  ],
  agency: [
    "Rezaul requested documents from Sadia Islam",
    "Mou Akhter's application marked incomplete",
    "Visa interview scheduled for Prianka Das",
    "Tanjil Ahmed's application submitted",
  ],
  restaurant: [
    "Table 4 order sent to kitchen",
    "Mango Lassi stock running low",
    "Delivery dispatched via Foodpanda",
    "Table 9 order served",
  ],
  "it-agency": [
    "Northwind CRM milestone marked overdue",
    "Fintra sprint review scheduled",
    "Invoice sent to Aster Studio",
    "Staging environment created for Coastal Stays",
  ],
};

export function getMockData(businessId) {
  const id = PRODUCTS[businessId] ? businessId : "shop";
  return {
    revenueSeries: REVENUE_SERIES[id],
    products: PRODUCTS[id],
    orders: ORDERS[id],
    customers: CUSTOMERS[id],
    staff: STAFF[id],
    tasks: TASKS[id],
    transactions: TRANSACTIONS[id],
    activity: ACTIVITY[id],
  };
}
