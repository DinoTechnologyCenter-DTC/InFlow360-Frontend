import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  DollarSign, 
  FileText, 
  Users, 
  TrendingUp, 
  Clock, 
  CheckCircle,
  AlertCircle,
  Plus
} from "lucide-react";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line
} from "recharts";
import { useState } from "react";
import { InvoiceFormModal, type InvoiceFormValues } from "@/components/invoices/InvoiceFormModal";


const revenueData = [
  { month: "Jan", revenue: 12000, invoices: 24 },
  { month: "Feb", revenue: 15000, invoices: 30 },
  { month: "Mar", revenue: 18000, invoices: 36 },
  { month: "Apr", revenue: 22000, invoices: 44 },
  { month: "May", revenue: 20000, invoices: 40 },
  { month: "Jun", revenue: 25000, invoices: 50 },
];

const statusData = [
  { name: "Paid", value: 65, color: "hsl(var(--accent-green))" },
  { name: "Pending", value: 25, color: "hsl(var(--warning))" },
  { name: "Overdue", value: 10, color: "hsl(var(--destructive))" },
];

const recentInvoices = [
  { id: "INV-001", client: "Acme Corp", amount: 2500, status: "paid", date: "2024-01-15" },
  { id: "INV-002", client: "TechStart Inc", amount: 1800, status: "pending", date: "2024-01-14" },
  { id: "INV-003", client: "Global Solutions", amount: 3200, status: "overdue", date: "2024-01-10" },
  { id: "INV-004", client: "Creative Agency", amount: 1500, status: "paid", date: "2024-01-12" },
];


export default function Dashboard() {
    const [invoiceModalOpen, setInvoiceModalOpen] = useState(false);

  const handleCreateInvoice = async (data: InvoiceFormValues) => {
    // TODO: Replace with API call to persist invoice
    // Example:
    // await api.invoices.create(data);
    console.log("New invoice created:", data);
  };
  return (
    <AppLayout>
      <div className="p-6 space-y-6 animate-slide-in-up">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Dashboard
            </h1>
            <p className="text-muted-foreground">
              Welcome back! Here's what's happening with your business.
            </p>
          </div>
          <Button className="bg-gradient-primary hover:shadow-glow transition-smooth hover-lift" onClick={() => setInvoiceModalOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Create Invoice
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="shadow-soft hover-lift">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-accent-green" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-accent-green">$112,000</div>
              <p className="text-xs text-muted-foreground">
                <TrendingUp className="inline h-3 w-3 mr-1" />
                +12% from last month
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-soft hover-lift">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Invoices</CardTitle>
              <FileText className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">87</div>
              <p className="text-xs text-muted-foreground">
                <Plus className="inline h-3 w-3 mr-1" />
                5 new this week
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-soft hover-lift">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Clients</CardTitle>
              <Users className="h-4 w-4 text-secondary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24</div>
              <p className="text-xs text-muted-foreground">
                <TrendingUp className="inline h-3 w-3 mr-1" />
                +3 new clients
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-soft hover-lift">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Overdue Amount</CardTitle>
              <AlertCircle className="h-4 w-4 text-destructive" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-destructive">$8,400</div>
              <p className="text-xs text-muted-foreground">
                3 overdue invoices
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="shadow-soft hover-lift">
            <CardHeader>
              <CardTitle>Revenue Trend</CardTitle>
              <CardDescription>Monthly revenue over the last 6 months</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                  <YAxis stroke="hsl(var(--muted-foreground))" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "var(--radius)"
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="revenue" 
                    stroke="hsl(var(--primary))" 
                    strokeWidth={3}
                    dot={{ fill: "hsl(var(--primary))", strokeWidth: 2, r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="shadow-soft hover-lift">
            <CardHeader>
              <CardTitle>Invoice Status</CardTitle>
              <CardDescription>Current status distribution</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={statusData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={120}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {statusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="flex justify-center space-x-4 mt-4">
                {statusData.map((entry, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: entry.color }}
                    />
                    <span className="text-sm text-muted-foreground">
                      {entry.name} ({entry.value}%)
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Invoices */}
        <Card className="shadow-soft hover-lift">
          <CardHeader>
            <CardTitle>Recent Invoices</CardTitle>
            <CardDescription>Latest invoice activity</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentInvoices.map((invoice) => (
                <div key={invoice.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-smooth">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 rounded-lg bg-gradient-subtle flex items-center justify-center">
                      <FileText className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">{invoice.id}</p>
                      <p className="text-sm text-muted-foreground">{invoice.client}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <p className="font-medium">${invoice.amount.toLocaleString()}</p>
                      <p className="text-sm text-muted-foreground">{invoice.date}</p>
                    </div>
                    <Badge 
                      variant={invoice.status === "paid" ? "default" : "secondary"}
                      className={
                        invoice.status === "paid" 
                          ? "bg-accent-green text-white" 
                          : invoice.status === "pending"
                          ? "bg-warning text-white"
                          : "bg-destructive text-white"
                      }
                    >
                      {invoice.status === "paid" && <CheckCircle className="h-3 w-3 mr-1" />}
                      {invoice.status === "pending" && <Clock className="h-3 w-3 mr-1" />}
                      {invoice.status === "overdue" && <AlertCircle className="h-3 w-3 mr-1" />}
                      {invoice.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      {/* Invoice Form Modal */}
      <InvoiceFormModal
        open={invoiceModalOpen}
        onOpenChange={setInvoiceModalOpen}
        onSubmit={handleCreateInvoice}
      />
    </AppLayout>
  );
}