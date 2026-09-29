import { useBusinessStore } from "@/store/useBusinessStore";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { MiniBarChart } from "@/components/charts/MiniBarChart";
import { formatCurrency } from "@/lib/utils";

const DAY_LABELS = ["Tue", "Wed", "Thu", "Fri", "Sat", "Sun", "Mon"];

export default function Reports() {
  const { businessType, data } = useBusinessStore();
  const expensesSeries = data.revenueSeries.map((v) => Math.round(v * (0.35 + Math.random() * 0.1)));
  const customerSeries = [3, 5, 2, 6, 4, 7, 5];
  const growthSeries = data.revenueSeries.map((v, i, arr) =>
    i === 0 ? 0 : Math.round(((v - arr[i - 1]) / arr[i - 1]) * 100)
  );

  return (
    <Tabs defaultValue="revenue" className="flex flex-col gap-4">
      <TabsList>
        <TabsTrigger value="revenue">Revenue</TabsTrigger>
        <TabsTrigger value="expenses">Expenses</TabsTrigger>
        <TabsTrigger value="customers">Customers</TabsTrigger>
        <TabsTrigger value="growth">Growth</TabsTrigger>
      </TabsList>

      <TabsContent value="revenue">
        <Card>
          <CardHeader>
            <CardTitle>Revenue — last 7 days</CardTitle>
          </CardHeader>
          <CardContent>
            <MiniBarChart values={data.revenueSeries} labels={DAY_LABELS} tone="accent" height={180} />
            <p className="mt-4 text-[13px] text-[var(--color-muted)]">
              Total revenue this week: {formatCurrency(data.revenueSeries.reduce((a, b) => a + b, 0), businessType.currency)}
            </p>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="expenses">
        <Card>
          <CardHeader>
            <CardTitle>Expenses — last 7 days</CardTitle>
          </CardHeader>
          <CardContent>
            <MiniBarChart values={expensesSeries} labels={DAY_LABELS} tone="signal" height={180} />
            <p className="mt-4 text-[13px] text-[var(--color-muted)]">
              Total expenses this week: {formatCurrency(expensesSeries.reduce((a, b) => a + b, 0), businessType.currency)}
            </p>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="customers">
        <Card>
          <CardHeader>
            <CardTitle>New customers — last 7 days</CardTitle>
          </CardHeader>
          <CardContent>
            <MiniBarChart values={customerSeries} labels={DAY_LABELS} tone="gold" height={180} />
            <p className="mt-4 text-[13px] text-[var(--color-muted)]">
              {data.customers.length} total profiles on record
            </p>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="growth">
        <Card>
          <CardHeader>
            <CardTitle>Day-over-day growth</CardTitle>
          </CardHeader>
          <CardContent>
            <MiniBarChart values={growthSeries.map((v) => Math.abs(v) + 5)} labels={DAY_LABELS} tone="accent" height={180} />
            <p className="mt-4 text-[13px] text-[var(--color-muted)]">
              Revenue is trending {growthSeries[growthSeries.length - 1] >= 0 ? "up" : "down"} compared with the
              previous day.
            </p>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
