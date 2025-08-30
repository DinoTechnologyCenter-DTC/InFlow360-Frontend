import { useMemo, useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableHeader,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import {
  Search,
  Filter,
  Calendar,
  Download,
  CheckCircle,
  XCircle,
  Clock,
  CreditCard,
  Banknote,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Transaction = {
  id: string;
  invoiceId: string;
  client: string;
  amount: number;     // gross
  fee: number;        // processing fee
  net: number;
  currency: string;
  method: "card" | "bank_transfer" | "mobile_money";
  status: "succeeded" | "pending" | "failed";
  date: string;       // ISO or yyyy-mm-dd
  reference: string;
};

const transactionsData: Transaction[] = [
  {
    id: "TXN-1001",
    invoiceId: "INV-001",
    client: "Acme Corporation",
    amount: 2500,
    fee: 25,
    net: 2475,
    currency: "TSH",
    method: "card",
    status: "succeeded",
    date: "2024-01-16",
    reference: "PAY-8F3A12",
  },
  {
    id: "TXN-1004",
    invoiceId: "INV-004",
    client: "Creative Agency",
    amount: 1500,
    fee: 15,
    net: 1485,
    currency: "TSH",
    method: "bank_transfer",
    status: "succeeded",
    date: "2024-01-13",
    reference: "PAY-77BC22",
  },
];

export default function Payments() {
  const [search, setSearch] = useState("");
  const [method, setMethod] = useState<string>("all");
  const [status, setStatus] = useState<string>("paid"); // locked to paid by default

  const filtered = useMemo(() => {
    return transactionsData.filter((t) => {
      const matchesSearch =
        t.client.toLowerCase().includes(search.toLowerCase()) ||
        t.invoiceId.toLowerCase().includes(search.toLowerCase()) ||
        t.id.toLowerCase().includes(search.toLowerCase()) ||
        t.reference.toLowerCase().includes(search.toLowerCase());
      const matchesMethod = method === "all" || t.method === method;
      // "based on paid invoice": only show succeeded payments
      const matchesStatus =
        status === "paid" ? t.status === "succeeded" : true;
      return matchesSearch && matchesMethod && matchesStatus;
    });
  }, [search, method, status]);

  const totals = useMemo(() => {
    const gross = filtered.reduce((s, t) => s + t.amount, 0);
    const fees = filtered.reduce((s, t) => s + t.fee, 0);
    const net = filtered.reduce((s, t) => s + t.net, 0);
    return { gross, fees, net, currency: filtered[0]?.currency ?? "TSH" };
  }, [filtered]);

  function formatMoney(cur: string, value: number) {
    return `${cur} ${value.toLocaleString(undefined, { maximumFractionDigits: 2 })}`;
  }

  function methodIcon(m: Transaction["method"]) {
    switch (m) {
      case "card":
        return <CreditCard className="h-4 w-4" />;
      case "bank_transfer":
        return <Banknote className="h-4 w-4" />;
      case "mobile_money":
        return <Banknote className="h-4 w-4" />;
      default:
        return null;
    }
  }

  function statusBadge(s: Transaction["status"]) {
    switch (s) {
      case "succeeded":
        return (
          <Badge className="bg-accent-green text-white">
            <CheckCircle className="h-4 w-4 mr-1" />
            Paid
          </Badge>
        );
      case "pending":
        return (
          <Badge className="bg-warning text-white">
            <Clock className="h-4 w-4 mr-1" />
            Pending
          </Badge>
        );
      case "failed":
        return (
          <Badge className="bg-destructive text-white">
            <XCircle className="h-4 w-4 mr-1" />
            Failed
          </Badge>
        );
    }
  }

  function exportCSV() {
    const header = [
      "Transaction ID",
      "Invoice ID",
      "Client",
      "Date",
      "Method",
      "Status",
      "Gross",
      "Fee",
      "Net",
      "Currency",
      "Reference",
    ];
    const rows = filtered.map((t) => [
      t.id,
      t.invoiceId,
      t.client,
      t.date,
      t.method,
      t.status,
      t.amount.toFixed(2),
      t.fee.toFixed(2),
      t.net.toFixed(2),
      t.currency,
      t.reference,
    ]);
    const csv = [header, ...rows]
      .map((r) => r.map((v) => `"${String(v).replace(/"/g, '""')}"`).join(","))
      .join("\n");

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "payments.csv";
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <AppLayout>
      <div className="p-6 space-y-6 animate-slide-in-up">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold ">
              Payments
            </h1>
            <p className="text-muted-foreground">
              Transaction details based on paid invoices
            </p>
          </div>
          <Button className="bg-gradient-primary hover:shadow-glow transition-smooth hover-lift" onClick={exportCSV}>
            <Download className="h-4 w-4 mr-2" />
            Export CSV
          </Button>
        </div>

        {/* Filters */}
        <Card className="shadow-soft">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder="Search by invoice, transaction, client, or reference..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="pl-10 shadow-soft focus:shadow-medium transition-smooth"
                  />
                </div>
              </div>

              <div className="flex gap-2">
                <Select value={method} onValueChange={setMethod}>
                  <SelectTrigger className="w-48">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Methods</SelectItem>
                    <SelectItem value="card">Card</SelectItem>
                    <SelectItem value="bank_transfer">Bank Transfer</SelectItem>
                    <SelectItem value="mobile_money">Mobile Money</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={status} onValueChange={setStatus} disabled>
                  <SelectTrigger className="w-40">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="paid">Paid</SelectItem>
                  </SelectContent>
                </Select>

                <Button variant="outline" className="hover-lift" type="button">
                  <Calendar className="h-4 w-4 mr-2" />
                  Date Range
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="shadow-soft hover-lift">
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-2xl font-bold text-foreground">
                  {formatMoney(totals.currency, totals.gross)}
                </p>
                <p className="text-sm text-muted-foreground">Total Gross</p>
              </div>
            </CardContent>
          </Card>
          <Card className="shadow-soft hover-lift">
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-2xl font-bold text-warning">
                  {formatMoney(totals.currency, totals.fees)}
                </p>
                <p className="text-sm text-muted-foreground">Processing Fees</p>
              </div>
            </CardContent>
          </Card>
          <Card className="shadow-soft hover-lift">
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-2xl font-bold text-accent-green">
                  {formatMoney(totals.currency, totals.net)}
                </p>
                <p className="text-sm text-muted-foreground">Net Received</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Payments Table */}
        <Card className="shadow-soft hover-lift">
          <CardHeader>
            <CardTitle>Paid Transactions ({filtered.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Transaction</TableHead>
                    <TableHead>Invoice</TableHead>
                    <TableHead>Client</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Method</TableHead>
                    <TableHead className="text-right">Gross</TableHead>
                    <TableHead className="text-right">Fee</TableHead>
                    <TableHead className="text-right">Net</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Reference</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtered.map((t) => (
                    <TableRow key={t.id} className="hover:bg-muted/50 transition-smooth">
                      <TableCell className="font-medium">{t.id}</TableCell>
                      <TableCell>{t.invoiceId}</TableCell>
                      <TableCell>{t.client}</TableCell>
                      <TableCell>{t.date}</TableCell>
                      <TableCell>
                        <span className="inline-flex items-center gap-2">
                          {methodIcon(t.method)}
                          <span className="capitalize">
                            {t.method.replace("_", " ")}
                          </span>
                        </span>
                      </TableCell>
                      <TableCell className="text-right">{formatMoney(t.currency, t.amount)}</TableCell>
                      <TableCell className="text-right">{formatMoney(t.currency, t.fee)}</TableCell>
                      <TableCell className="text-right">{formatMoney(t.currency, t.net)}</TableCell>
                      <TableCell>{statusBadge(t.status)}</TableCell>
                      <TableCell className="font-mono text-xs">{t.reference}</TableCell>
                    </TableRow>
                  ))}
                  {filtered.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={10} className="text-center text-muted-foreground">
                        No paid transactions found.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}