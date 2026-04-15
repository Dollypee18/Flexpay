"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import AuthLayout from "@/components/layout/AuthLayout";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { useAuthStore } from "@/store/authStore";

interface FormState {
  email: string;
  password: string;
}

interface FormErrors {
  email?: string;
  password?: string;
  general?: string;
}

function validate(form: FormState): FormErrors {
  const errors: FormErrors = {};
  if (!form.email) errors.email = "Email is required.";
  else if (!/\S+@\S+\.\S+/.test(form.email))
    errors.email = "Enter a valid email.";
  if (!form.password) errors.password = "Password is required.";
  else if (form.password.length < 6) errors.password = "Minimum 6 characters.";
  return errors;
}

export default function LoginPage() {
  const router = useRouter();
  const { setAuth } = useAuthStore();
  const [form, setForm] = useState<FormState>({ email: "", password: "" });
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors({});
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
      const { loginUser } = await import("@/services/authService");

      const data = await loginUser(form).catch((err: Error) => {
        setErrors({ general: err.message });
        return null;
      });

      if (!data) return;

      setAuth(data.user, data.token);
      router.push("/dashboard");
    } catch {
      setErrors({ general: "Something went wrong. Try again." });
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Sign in to your FlexPay account."
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {errors.general && (
          <div className="px-3 py-2.5 rounded bg-[#FF4D4D]/10 border border-[#FF4D4D]/30 text-xs text-[#FF4D4D]">
            {errors.general}
          </div>
        )}

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
          autoComplete="current-password"
        />

        <Button
          type="submit"
          loading={loading}
          size="lg"
          className="mt-1 w-full"
        >
          Sign in
        </Button>

        <p className="text-xs text-center text-[#888888]">
          No account?{" "}
          <Link href="/signup" className="text-[#00C896] hover:underline">
            Sign up
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}
