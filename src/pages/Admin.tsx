import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  DollarSign, 
  FileText, 
  TrendingUp,
  Settings,
  Shield,
  Database,
  Activity,
  AlertTriangle,
  CheckCircle,
  Plus,
  MoreHorizontal
} from "lucide-react";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from "recharts";

const systemStats = [
  { title: "Total Users", value: "1,247", change: "+12%", icon: Users, color: "text-primary" },
  { title: "Monthly Revenue", value: "$48,500", change: "+18%", icon: DollarSign, color: "text-accent-green" },
  { title: "Active Invoices", value: "328", change: "+5%", icon: FileText, color: "text-secondary" },
  { title: "System Health", value: "99.8%", change: "+0.2%", icon: Activity, color: "text-accent-green" },
];

const revenueData = [
  { month: "Jan", revenue: 38000, users: 220 },
  { month: "Feb", revolution: 42000, users: 245 },
  { month: "Mar", revenue: 45000, users: 278 },
  { month: "Apr", revenue: 48500, users: 310 },
  { month: "May", revenue: 52000, users: 342 },
  { month: "Jun", revenue: 48500, users: 365 },
];

const recentUsers = [
  { name: "Alice Johnson", email: "alice@example.com", plan: "Pro", status: "active", joined: "2024-01-15" },
  { name: "Bob Smith", email: "bob@example.com", plan: "Basic", status: "active", joined: "2024-01-14" },
  { name: "Carol Davis", email: "carol@example.com", plan: "Enterprise", status: "inactive", joined: "2024-01-12" },
  { name: "David Wilson", email: "david@example.com", plan: "Pro", status: "active", joined: "2024-01-10" },
];

export default function Admin() {
  return (
    <AppLayout>
      <div className="p-6 space-y-6 animate-slide-in-up">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Admin Panel
            </h1>
            <p className="text-muted-foreground">
              Manage users, system settings, and monitor performance
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="hover-lift">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
            <Button className="bg-gradient-primary hover:shadow-glow transition-smooth hover-lift">
              <Plus className="h-4 w-4 mr-2" />
              Add User
            </Button>
          </div>
        </div>

        {/* System Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {systemStats.map((stat, index) => (
            <Card key={index} className="shadow-soft hover-lift">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">
                  <TrendingUp className="inline h-3 w-3 mr-1" />
                  {stat.change} from last month
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Charts and Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="shadow-soft hover-lift">
            <CardHeader>
              <CardTitle>Revenue & User Growth</CardTitle>
              <CardDescription>Monthly revenue and user acquisition</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={revenueData}>
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
                  <Bar dataKey="revenue" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="shadow-soft hover-lift">
            <CardHeader>
              <CardTitle>System Status</CardTitle>
              <CardDescription>Real-time system health monitoring</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <Database className="h-5 w-5 text-accent-green" />
                  <div>
                    <p className="font-medium">Database</p>
                    <p className="text-sm text-muted-foreground">All systems operational</p>
                  </div>
                </div>
                <Badge className="bg-accent-green text-white">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Online
                </Badge>
              </div>

              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <Shield className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">Security</p>
                    <p className="text-sm text-muted-foreground">No threats detected</p>
                  </div>
                </div>
                <Badge className="bg-accent-green text-white">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Secure
                </Badge>
              </div>

              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <Activity className="h-5 w-5 text-warning" />
                  <div>
                    <p className="font-medium">API Performance</p>
                    <p className="text-sm text-muted-foreground">Average response: 120ms</p>
                  </div>
                </div>
                <Badge className="bg-warning text-white">
                  <AlertTriangle className="h-3 w-3 mr-1" />
                  Monitor
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Users */}
        <Card className="shadow-soft hover-lift">
          <CardHeader>
            <CardTitle>Recent Users</CardTitle>
            <CardDescription>Latest user registrations and activity</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentUsers.map((user, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-smooth">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center">
                      <span className="text-white font-semibold text-sm">
                        {user.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium">{user.name}</p>
                      <p className="text-sm text-muted-foreground">{user.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-center">
                      <p className="text-sm font-medium">{user.plan}</p>
                      <p className="text-xs text-muted-foreground">Plan</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-medium">{user.joined}</p>
                      <p className="text-xs text-muted-foreground">Joined</p>
                    </div>
                    <Badge 
                      className={user.status === 'active' ? 'bg-accent-green text-white' : 'bg-muted text-muted-foreground'}
                    >
                      {user.status}
                    </Badge>
                    <Button variant="ghost" size="icon" className="hover-lift">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}