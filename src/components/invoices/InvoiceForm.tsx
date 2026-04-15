"use client";

import { useState } from "react";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { Invoice } from "@/types";

interface FormState {
  clientName: string;
  clientEmail: string;
  amount: string;
  currency: string;
  dueDate: string;
  description: string;
}

interface FormErrors {
  clientName?: string;
  clientEmail?: string;
  amount?: string;
  dueDate?: string;
  description?: string;
}

interface InvoiceFormProps {
  onSubmit: (invoice: Invoice) => void;
  onCancel: () => void;
}

function validate(form: FormState): FormErrors {
  const errors: FormErrors = {};
  if (!form.clientName.trim()) errors.clientName = "Client name is required.";
  if (!form.clientEmail.trim())
    errors.clientEmail = "Client email is required.";
  else if (!/\S+@\S+\.\S+/.test(form.clientEmail))
    errors.clientEmail = "Enter a valid email.";
  if (!form.amount) errors.amount = "Amount is required.";
  else if (isNaN(Number(form.amount)) || Number(form.amount) <= 0)
    errors.amount = "Enter a valid amount.";
  if (!form.dueDate) errors.dueDate = "Due date is required.";
  if (!form.description.trim()) errors.description = "Description is required.";
  return errors;
}

const CURRENCIES = ["USD", "EUR", "GBP", "NGN", "CAD", "AUD"];

export default function InvoiceForm({ onSubmit, onCancel }: InvoiceFormProps) {
  const [form, setForm] = useState<FormState>({
    clientName: "",
    clientEmail: "",
    amount: "",
    currency: "USD",
    dueDate: "",
    description: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const validationErrors = validate(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    await new Promise((res) => setTimeout(res, 800));

    const newInvoice: Invoice = {
      id: `inv_${Date.now()}`,
      clientName: form.clientName,
      clientEmail: form.clientEmail,
      amount: Number(form.amount),
      currency: form.currency,
      dueDate: form.dueDate,
      description: form.description,
      status: "pending",
      createdAt: new Date().toISOString().split("T")[0],
      userId: "user_1",
    };

    setLoading(false);
    onSubmit(newInvoice);
  }

  const selectStyle = {
    backgroundColor: "#1E1E1E",
    border: "1px solid #2A2A2A",
    borderRadius: "4px",
    padding: "10px 12px",
    color: "#F0F0F0",
    fontSize: "14px",
    outline: "none",
    width: "100%",
  };

  const labelStyle = {
    fontSize: "11px",
    color: "#888888",
    textTransform: "uppercase" as const,
    letterSpacing: "0.06em",
    fontWeight: 500,
    marginBottom: "6px",
    display: "block",
  };

  const textareaStyle = {
    backgroundColor: "#1E1E1E",
    border: `1px solid ${errors.description ? "#FF4D4D" : "#2A2A2A"}`,
    borderRadius: "4px",
    padding: "10px 12px",
    color: "#F0F0F0",
    fontSize: "14px",
    outline: "none",
    width: "100%",
    resize: "vertical" as const,
    minHeight: "80px",
    fontFamily: "inherit",
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{ display: "flex", flexDirection: "column", gap: "16px" }}
    >
      <Input
        label="Client name"
        name="clientName"
        value={form.clientName}
        onChange={handleChange}
        error={errors.clientName}
        placeholder="Techwave Ltd"
      />
      <Input
        label="Client email"
        name="clientEmail"
        type="email"
        value={form.clientEmail}
        onChange={handleChange}
        error={errors.clientEmail}
        placeholder="billing@client.com"
      />

      {/* Amount + Currency row */}
      <div style={{ display: "flex", gap: "12px" }}>
        <div style={{ flex: 1 }}>
          <Input
            label="Amount"
            name="amount"
            type="number"
            value={form.amount}
            onChange={handleChange}
            error={errors.amount}
            placeholder="0.00"
          />
        </div>
        <div style={{ width: "120px" }}>
          <label style={labelStyle}>Currency</label>
          <select
            name="currency"
            value={form.currency}
            onChange={handleChange}
            style={selectStyle}
          >
            {CURRENCIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
      </div>

      <Input
        label="Due date"
        name="dueDate"
        type="date"
        value={form.dueDate}
        onChange={handleChange}
        error={errors.dueDate}
      />

      {/* Description */}
      <div>
        <label style={labelStyle}>Description</label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="UI/UX Design — April"
          style={textareaStyle}
        />
        {errors.description && (
          <p style={{ fontSize: "12px", color: "#FF4D4D", marginTop: "4px" }}>
            {errors.description}
          </p>
        )}
      </div>

      <div style={{ display: "flex", gap: "12px", marginTop: "8px" }}>
        <Button
          type="button"
          variant="secondary"
          size="lg"
          onClick={onCancel}
          style={{ flex: 1 }}
        >
          Cancel
        </Button>
        <Button type="submit" size="lg" loading={loading} style={{ flex: 1 }}>
          Create Invoice
        </Button>
      </div>
    </form>
  );
}
