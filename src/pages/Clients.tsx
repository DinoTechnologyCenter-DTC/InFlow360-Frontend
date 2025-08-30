import { useMemo, useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ClientFormModal, type ClientFormValues } from "@/components/clients/ClientFormModal";
import { Plus, Search, Users, CheckCircle, XCircle, Mail, Phone, Building2 } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type Client = {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  status: "active" | "inactive";
  address?: string;
  invoicesCount: number;
  totalBilled: number;
  currency: string;
};

const clientsSeed: Client[] = [
  {
    id: "CL-001",
    name: "Acme Corporation",
    email: "billing@acme.com",
    phone: "+255 700 001 001",
    company: "Acme",
    status: "active",
    address: "Dar es Salaam, TZ",
    invoicesCount: 12,
    totalBilled: 152000,
    currency: "TSH",
  },
  {
    id: "CL-002",
    name: "TechStart Inc",
    email: "ap@techstart.io",
    phone: "+255 700 002 002",
    company: "TechStart",
    status: "inactive",
    address: "Arusha, TZ",
    invoicesCount: 5,
    totalBilled: 48000,
    currency: "TSH",
  },
  {
    id: "CL-003",
    name: "Creative Agency",
    email: "pay@creative.agency",
    phone: "+255 700 003 003",
    company: "Creative",
    status: "active",
    address: "Mwanza, TZ",
    invoicesCount: 8,
    totalBilled: 91000,
    currency: "TSH",
  },
];

export default function Clients() {
  const [clients, setClients] = useState<Client[]>(clientsSeed);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<string>("all");
  const [modalOpen, setModalOpen] = useState(false);

  const filtered = useMemo(() => {
    return clients.filter((c) => {
      const s = search.toLowerCase();
      const matchesSearch =
        c.name.toLowerCase().includes(s) ||
        c.email.toLowerCase().includes(s) ||
        c.company?.toLowerCase().includes(s) ||
        c.id.toLowerCase().includes(s);
      const matchesStatus = status === "all" || c.status === (status as Client["status"]);
      return matchesSearch && matchesStatus;
    });
  }, [clients, search, status]);

  const summary = useMemo(() => {
    const total = clients.length;
    const active = clients.filter((c) => c.status === "active").length;
    const inactive = total - active;
    const totalBilled = clients.reduce((s, c) => s + c.totalBilled, 0);
    const currency = clients[0]?.currency ?? "TSH";
    return { total, active, inactive, totalBilled, currency };
  }, [clients]);

  function formatMoney(cur: string, value: number) {
    return `${cur} ${value.toLocaleString(undefined, { maximumFractionDigits: 2 })}`;
  }

  async function handleAddClient(data: ClientFormValues) {
    const newClient: Client = {
      id: `CL-${String(clients.length + 1).padStart(3, "0")}`,
      name: data.name,
      email: data.email,
      phone: data.phone,
      company: data.company,
      status: data.status,
      address: data.address,
      invoicesCount: 0,
      totalBilled: 0,
      currency: "TSH",
    };
    setClients((prev) => [newClient, ...prev]);
  }

  function statusBadge(s: Client["status"]) {
    return (
      <Badge className={s === "active" ? "bg-accent-green text-white" : "bg-muted text-foreground"}>
        {s === "active" ? <CheckCircle className="h-4 w-4 mr-1" /> : <XCircle className="h-4 w-4 mr-1" />}
        {s.charAt(0).toUpperCase() + s.slice(1)}
      </Badge>
    );
  }

  return (
    <AppLayout>
      <div className="p-6 space-y-6 animate-slide-in-up">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold ">Clients</h1>
            <p className="text-muted-foreground">Manage your clients and their billing profiles</p>
          </div>
          <Button className="bg-gradient-primary hover:shadow-glow transition-smooth hover-lift" onClick={() => setModalOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            New Client
          </Button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="shadow-soft hover-lift">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Clients</CardTitle>
              <Users className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{summary.total}</div>
            </CardContent>
          </Card>
          <Card className="shadow-soft hover-lift">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active</CardTitle>
              <CheckCircle className="h-4 w-4 text-accent-green" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{summary.active}</div>
            </CardContent>
          </Card>
          <Card className="shadow-soft hover-lift">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Billed</CardTitle>
              <Building2 className="h-4 w-4 text-secondary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatMoney(summary.currency, summary.totalBilled)}</div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="shadow-soft">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder="Search by name, email, company, or ID"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div>
                <Select value={status} onValueChange={setStatus}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Clients Table */}
        <Card className="shadow-soft hover-lift">
          <CardHeader>
            <CardTitle>All Clients ({filtered.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Client</TableHead>
                    <TableHead>Company</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Invoices</TableHead>
                    <TableHead className="text-right">Total Billed</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtered.map((c) => (
                    <TableRow key={c.id} className="hover:bg-muted/50 transition-smooth">
                      <TableCell>
                        <div className="font-medium">{c.name}</div>
                        <div className="text-xs text-muted-foreground">{c.id}</div>
                      </TableCell>
                      <TableCell>{c.company ?? "-"}</TableCell>
                      <TableCell>
                        <span className="inline-flex items-center gap-2"><Mail className="h-4 w-4" />{c.email}</span>
                      </TableCell>
                      <TableCell>
                        <span className="inline-flex items-center gap-2"><Phone className="h-4 w-4" />{c.phone ?? "-"}</span>
                      </TableCell>
                      <TableCell>{statusBadge(c.status)}</TableCell>
                      <TableCell className="text-right">{c.invoicesCount}</TableCell>
                      <TableCell className="text-right">{formatMoney(c.currency, c.totalBilled)}</TableCell>
                    </TableRow>
                  ))}
                  {filtered.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center text-muted-foreground">No clients found.</TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Modal */}
        <ClientFormModal open={modalOpen} onOpenChange={setModalOpen} onSubmit={handleAddClient} />
      </div>
    </AppLayout>
  );
}
