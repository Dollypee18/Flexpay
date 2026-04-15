"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import AuthLayout from "@/components/layout/AuthLayout";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

interface FormState {
  name: string;
  email: string;
  password: string;
  confirm: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  password?: string;
  confirm?: string;
  general?: string;
}

function validate(form: FormState): FormErrors {
  const errors: FormErrors = {};
  if (!form.name.trim()) errors.name = "Name is required.";
  if (!form.email) errors.email = "Email is required.";
  else if (!/\S+@\S+\.\S+/.test(form.email))
    errors.email = "Enter a valid email.";
  if (!form.password) errors.password = "Password is required.";
  else if (form.password.length < 6) errors.password = "Minimum 6 characters.";
  if (!form.confirm) errors.confirm = "Please confirm your password.";
  else if (form.confirm !== form.password)
    errors.confirm = "Passwords do not match.";
  return errors;
}

export default function SignupPage() {
  const router = useRouter();
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    password: "",
    confirm: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
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
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          password: form.password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrors({ general: data.message || "Registration failed." });
        return;
      }

      router.push("/login?registered=true");
    } catch {
      setErrors({ general: "Something went wrong. Try again." });
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthLayout
      title="Create account"
      subtitle="Start sending invoices in minutes."
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {errors.general && (
          <div className="px-3 py-2.5 rounded bg-[var(--danger)]/10 border border-[var(--danger)]/30 text-xs text-[var(--danger)]">
            {errors.general}
          </div>
        )}

        <Input
          label="Full name"
          name="name"
          type="text"
          placeholder="Ada Okafor"
          value={form.name}
          onChange={handleChange}
          error={errors.name}
          autoComplete="name"
        />

        <Input
          label="Email"
          name="email"
          type="email"
          placeholder="you@example.com"
          value={form.email}
          onChange={handleChange}
          error={errors.email}
          autoComplete="email"
        />

        <Input
          label="Password"
          name="password"
          type="password"
          placeholder="••••••••"
          value={form.password}
          onChange={handleChange}
          error={errors.password}
          autoComplete="new-password"
        />

        <Input
          label="Confirm password"
          name="confirm"
          type="password"
          placeholder="••••••••"
          value={form.confirm}
          onChange={handleChange}
          error={errors.confirm}
          autoComplete="new-password"
        />

        <Button
          type="submit"
          loading={loading}
          size="lg"
          className="mt-1 w-full"
        >
          Create account
        </Button>

        <p className="text-xs text-center text-[var(--text-muted)]">
          Already have an account?{" "}
          <Link href="/login" className="text-[var(--accent)] hover:underline">
            Sign in
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}
