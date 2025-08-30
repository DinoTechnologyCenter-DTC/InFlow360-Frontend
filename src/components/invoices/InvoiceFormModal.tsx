import React, { useMemo, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Plus, Trash } from "lucide-react";

export type InvoiceItem = {
  description: string;
  quantity: number;
  unitPrice: number;
};

export type InvoiceFormValues = {
  clientName: string;
  clientEmail: string;
  currency: string;
  issueDate: string;
  dueDate: string;
  items: InvoiceItem[];
  taxRate: number;   // percent
  discount: number;  // percent
  notes?: string;
};

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: InvoiceFormValues) => void | Promise<void>;
  defaultValues?: Partial<InvoiceFormValues>;
};

const DEFAULT_VALUES: InvoiceFormValues = {
  clientName: "",
  clientEmail: "",
  currency: "TSH",
  issueDate: new Date().toISOString().slice(0, 10),
  dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10),
  items: [{ description: "", quantity: 1, unitPrice: 0 }],
  taxRate: 0,
  discount: 0,
  notes: "",
};

export function InvoiceFormModal({ open, onOpenChange, onSubmit, defaultValues }: Props) {
  const [form, setForm] = useState<InvoiceFormValues>({ ...DEFAULT_VALUES, ...defaultValues });

  const subtotal = useMemo(
    () => form.items.reduce((sum, it) => sum + (Number(it.quantity) || 0) * (Number(it.unitPrice) || 0), 0),
    [form.items]
  );
  const taxAmount = useMemo(() => subtotal * ((Number(form.taxRate) || 0) / 100), [subtotal, form.taxRate]);
  const discountAmount = useMemo(() => subtotal * ((Number(form.discount) || 0) / 100), [subtotal, form.discount]);
  const total = useMemo(() => Math.max(0, subtotal + taxAmount - discountAmount), [subtotal, taxAmount, discountAmount]);

  const isValid = useMemo(() => {
    if (!form.clientName.trim()) return false;
    if (!form.issueDate || !form.dueDate) return false;
    if (new Date(form.dueDate) < new Date(form.issueDate)) return false;
    if (!form.items.length) return false;
    const hasValidItem = form.items.some(
      (it) => it.description.trim() && Number(it.quantity) > 0 && Number(it.unitPrice) >= 0
    );
    return hasValidItem;
  }, [form]);

  function updateField<K extends keyof InvoiceFormValues>(key: K, value: InvoiceFormValues[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function updateItem(index: number, patch: Partial<InvoiceItem>) {
    setForm((prev) => {
      const items = prev.items.map((it, i) => (i === index ? { ...it, ...patch } : it));
      return { ...prev, items };
    });
  }

  function addItem() {
    setForm((prev) => ({ ...prev, items: [...prev.items, { description: "", quantity: 1, unitPrice: 0 }] }));
  }

  function removeItem(index: number) {
    setForm((prev) => ({ ...prev, items: prev.items.filter((_, i) => i !== index) }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!isValid) return;
    await onSubmit(form);
    // Reset form after submit
    setForm({ ...DEFAULT_VALUES, ...defaultValues });
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Create Invoice</DialogTitle>
          <DialogDescription>Fill out the details below to create a new invoice.</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Client Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <Label htmlFor="clientName">Client Name</Label>
              <Input
                id="clientName"
                placeholder="Acme Corp"
                value={form.clientName}
                onChange={(e) => updateField("clientName", e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="clientPhone">Phone Number</Label>
              <Input
                id="clientPhone"
                type="tel"
                placeholder="+255 123 456 789"
                value={form.clientPhone}
                onChange={(e) => updateField("clientPhone", e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="currency">Currency</Label>
              <Select
                value={form.currency}
                onValueChange={(v) => updateField("currency", v)}
              >
                <SelectTrigger id="currency">
                  <SelectValue placeholder="Select currency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="USD">USD</SelectItem>
                  <SelectItem value="TSH">TSH</SelectItem>
                  <SelectItem value="EUR">EUR</SelectItem>
                  <SelectItem value="GBP">GBP</SelectItem>
                  <SelectItem value="INR">INR</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="issueDate">Issue Date</Label>
              <Input
                id="issueDate"
                type="date"
                value={form.issueDate}
                onChange={(e) => updateField("issueDate", e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="dueDate">Due Date</Label>
              <Input
                id="dueDate"
                type="date"
                value={form.dueDate}
                onChange={(e) => updateField("dueDate", e.target.value)}
              />
            </div>
          </div>

          {/* Items */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="font-semibold">Items</h4>
              <Button type="button" variant="outline" onClick={addItem} className="hover-lift">
                <Plus className="h-4 w-4 mr-1" /> Add Item
              </Button>
            </div>

            <div className="space-y-3">
              {form.items.map((item, idx) => (
                <div key={idx} className="grid grid-cols-1 md:grid-cols-12 gap-3 p-3 border rounded-lg">
                  <div className="md:col-span-6">
                    <Label>Description</Label>
                    <Input
                      placeholder="Service or product description"
                      value={item.description}
                      onChange={(e) => updateItem(idx, { description: e.target.value })}
                    />
                  </div>
                  <div className="md:col-span-2">
                    <Label>Qty</Label>
                    <Input
                      type="number"
                      min={0}
                      step="1"
                      value={Number.isFinite(item.quantity) ? item.quantity : 0}
                      onChange={(e) => updateItem(idx, { quantity: Number(e.target.value) })}
                    />
                  </div>
                  <div className="md:col-span-3">
                    <Label>Unit Price</Label>
                    <Input
                      type="number"
                      min={0}
                      step="0.01"
                      value={Number.isFinite(item.unitPrice) ? item.unitPrice : 0}
                      onChange={(e) => updateItem(idx, { unitPrice: Number(e.target.value) })}
                    />
                  </div>
                  <div className="md:col-span-1 flex items-end">
                    <Button
                      type="button"
                      variant="ghost"
                      className="text-destructive"
                      onClick={() => removeItem(idx)}
                      disabled={form.items.length === 1}
                      title="Remove item"
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Totals & Extras */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="taxRate">Tax (%)</Label>
              <Input
                id="taxRate"
                type="number"
                min={0}
                step="0.01"
                value={form.taxRate}
                onChange={(e) => updateField("taxRate", Number(e.target.value))}
              />
            </div>
          
            <div className="p-3 border rounded-lg">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span>{form.currency} {subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Tax</span>
                <span>{form.currency} {taxAmount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Discount</span>
                <span>- {form.currency} {discountAmount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-semibold mt-1">
                <span>Total</span>
                <span>{form.currency} {total.toFixed(2)}</span>
              </div>
            </div>
          </div>


          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" className="bg-gradient-primary hover:shadow-glow transition-smooth hover-lift" disabled={!isValid}>
              Create Invoice
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}