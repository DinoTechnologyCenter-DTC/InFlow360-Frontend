import { useMemo, useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

export type ClientFormValues = {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  status: "active" | "inactive";
  address?: string;
  notes?: string;
};

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: ClientFormValues) => void | Promise<void>;
  defaultValues?: Partial<ClientFormValues>;
};

const DEFAULT_VALUES: ClientFormValues = {
  name: "",
  email: "",
  phone: "",
  company: "",
  status: "active",
  address: "",
  notes: "",
};

export function ClientFormModal({ open, onOpenChange, onSubmit, defaultValues }: Props) {
  const [form, setForm] = useState<ClientFormValues>({ ...DEFAULT_VALUES, ...defaultValues });

  const isValid = useMemo(() => {
    if (!form.name.trim()) return false;
    if (!form.email.trim()) return false;
    return true;
  }, [form.name, form.email]);

  function update<K extends keyof ClientFormValues>(key: K, value: ClientFormValues[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!isValid) return;
    await onSubmit(form);
    setForm({ ...DEFAULT_VALUES, ...defaultValues });
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>New Client</DialogTitle>
          <DialogDescription>Add a new client to your account.</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" placeholder="Jane Doe" value={form.name} onChange={(e) => update("name", e.target.value)} />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="jane@acme.com" value={form.email} onChange={(e) => update("email", e.target.value)} />
            </div>
            <div>
              <Label htmlFor="phone">Phone</Label>
              <Input id="phone" placeholder="+255 700 000 000" value={form.phone} onChange={(e) => update("phone", e.target.value)} />
            </div>
            {/* <div>
              <Label htmlFor="company">Company</Label>
              <Input id="company" placeholder="Acme Corp" value={form.company} onChange={(e) => update("company", e.target.value)} />
            </div> */}
            {/* <div>
              <Label htmlFor="status">Status</Label>
              <Select value={form.status} onValueChange={(v) => update("status", v as ClientFormValues["status"])}>
                <SelectTrigger id="status">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div> */}
            <div className="md:col-span-2">
              <Label htmlFor="address">Address</Label>
              <Textarea id="address" placeholder="Street, City, Country" value={form.address} onChange={(e) => update("address", e.target.value)} />
            </div>
            {/* <div className="md:col-span-2">
              <Label htmlFor="notes">Notes</Label>
              <Textarea id="notes" placeholder="Additional information" value={form.notes} onChange={(e) => update("notes", e.target.value)} />
            </div> */}
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" className="bg-gradient-primary hover:shadow-glow transition-smooth hover-lift" disabled={!isValid}>
              Save Client
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default ClientFormModal;
