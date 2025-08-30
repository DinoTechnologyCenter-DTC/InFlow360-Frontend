import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  Filter, 
  Plus, 
  Eye, 
  Edit,
  Download,
  MoreHorizontal,
  Calendar,
  CheckCircle,
  Clock,
  AlertCircle
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const invoicesData = [
  { 
    id: "INV-001", 
    client: "Acme Corporation", 
    amount: 2500, 
    status: "paid", 
    date: "2024-01-15",
    dueDate: "2024-01-30",
    description: "Web Development Services"
  },
  { 
    id: "INV-002", 
    client: "TechStart Inc", 
    amount: 1800, 
    status: "pending", 
    date: "2024-01-14",
    dueDate: "2024-02-14",
    description: "UI/UX Design Package"
  },
  { 
    id: "INV-003", 
    client: "Global Solutions", 
    amount: 3200, 
    status: "overdue", 
    date: "2024-01-10",
    dueDate: "2024-01-25",
    description: "Full Stack Development"
  },
  { 
    id: "INV-004", 
    client: "Creative Agency", 
    amount: 1500, 
    status: "paid", 
    date: "2024-01-12",
    dueDate: "2024-01-27",
    description: "Mobile App Development"
  },
  { 
    id: "INV-005", 
    client: "Startup Hub", 
    amount: 2800, 
    status: "pending", 
    date: "2024-01-08",
    dueDate: "2024-02-08",
    description: "E-commerce Platform"
  },
];

export default function Invoices() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredInvoices = invoicesData.filter(invoice => {
    const matchesSearch = invoice.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         invoice.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || invoice.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "paid":
        return <CheckCircle className="h-4 w-4" />;
      case "pending":
        return <Clock className="h-4 w-4" />;
      case "overdue":
        return <AlertCircle className="h-4 w-4" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "paid":
        return "bg-accent-green text-white";
      case "pending":
        return "bg-warning text-white";
      case "overdue":
        return "bg-destructive text-white";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <AppLayout>
      <div className="p-6 space-y-6 animate-slide-in-up">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Invoices
            </h1>
            <p className="text-muted-foreground">
              Manage and track all your invoices
            </p>
          </div>
          <Button className="bg-gradient-primary hover:shadow-glow transition-smooth hover-lift">
            <Plus className="h-4 w-4 mr-2" />
            New Invoice
          </Button>
        </div>

        {/* Filters and Search */}
        <Card className="shadow-soft">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder="Search invoices by client or ID..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 shadow-soft focus:shadow-medium transition-smooth"
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-40">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="paid">Paid</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="overdue">Overdue</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" className="hover-lift">
                  <Calendar className="h-4 w-4 mr-2" />
                  Date Range
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Invoices Table */}
        <Card className="shadow-soft hover-lift">
          <CardHeader>
            <CardTitle>All Invoices ({filteredInvoices.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredInvoices.map((invoice) => (
                <div 
                  key={invoice.id} 
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-smooth hover-lift"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-lg bg-gradient-subtle flex items-center justify-center">
                      <span className="font-bold text-primary text-sm">
                        {invoice.id.split('-')[1]}
                      </span>
                    </div>
                    <div>
                      <p className="font-semibold">{invoice.id}</p>
                      <p className="text-sm text-muted-foreground">{invoice.client}</p>
                      <p className="text-xs text-muted-foreground">{invoice.description}</p>
                    </div>
                  </div>
                  
                  <div className="hidden md:block text-center">
                    <p className="text-sm text-muted-foreground">Issue Date</p>
                    <p className="font-medium">{invoice.date}</p>
                  </div>
                  
                  <div className="hidden md:block text-center">
                    <p className="text-sm text-muted-foreground">Due Date</p>
                    <p className="font-medium">{invoice.dueDate}</p>
                  </div>
                  
                  <div className="text-right">
                    <p className="font-bold text-lg">${invoice.amount.toLocaleString()}</p>
                    <Badge className={getStatusColor(invoice.status)}>
                      {getStatusIcon(invoice.status)}
                      <span className="ml-1 capitalize">{invoice.status}</span>
                    </Badge>
                  </div>
                  
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="hover-lift">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Eye className="mr-2 h-4 w-4" />
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit Invoice
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Download className="mr-2 h-4 w-4" />
                        Download PDF
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="shadow-soft hover-lift">
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-2xl font-bold text-accent-green">
                  ${invoicesData.filter(i => i.status === 'paid').reduce((sum, i) => sum + i.amount, 0).toLocaleString()}
                </p>
                <p className="text-sm text-muted-foreground">Total Paid</p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-soft hover-lift">
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-2xl font-bold text-warning">
                  ${invoicesData.filter(i => i.status === 'pending').reduce((sum, i) => sum + i.amount, 0).toLocaleString()}
                </p>
                <p className="text-sm text-muted-foreground">Pending</p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-soft hover-lift">
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-2xl font-bold text-destructive">
                  ${invoicesData.filter(i => i.status === 'overdue').reduce((sum, i) => sum + i.amount, 0).toLocaleString()}
                </p>
                <p className="text-sm text-muted-foreground">Overdue</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
}