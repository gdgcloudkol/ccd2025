"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import LoadLink from "@/components/blocks/LoadLink";
import AuthForm from "@/components/auth/AuthForm";

const formSchema = z.object({
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
    .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter" })
    .regex(/[0-9]/, { message: "Password must contain at least one number" })
    .regex(/[^A-Za-z0-9]/, { message: "Password must contain at least one special character" }),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export default function ResetForm() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  // const searchParams = useSearchParams();
  // const token = searchParams.get("token");


const pathname= usePathname()
const token = pathname.split('/')[3]
  if (!token) {
    router.push("/forgot");
    return null;
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    try {
      const response = await fetch("/api/auth/password/reset/confirm/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token,
          new_password1: values.password,
          new_password2:values.confirmPassword,
          uid: pathname.split('/')[2]
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Something went wrong");
      }

      router.push("/login?message=Password reset successful. Please log in with your new password.");
    } catch (error) {
      form.setError("root", {
        message: error instanceof Error ? error.message : "Something went wrong",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-center md:text-left bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
          Reset Your Password
        </h1>
        <p className="text-center md:text-left text-muted-foreground">
          Enter your new password below.
        </p>
      </div>

      <AuthForm
        form={form}
        onSubmit={onSubmit}
        isLoading={isLoading}
        submitText="Reset Password"
        error={form.formState.errors.root?.message}
        fields={[
          {
            name: "password",
            label: "New Password",
            type: "password",
            placeholder: "********",
            description: "Password must be at least 8 characters long and contain uppercase, lowercase, numbers, and special characters",
          },
          {
            name: "confirmPassword",
            label: "Confirm New Password",
            type: "password",
            placeholder: "********",
          },
        ]}
        footer={
          <p>
            Remember your password?{" "}
            <LoadLink
              href="/login"
              className="text-google-blue hover:text-google-blue/80 transition-colors font-medium"
            >
              Log in
            </LoadLink>
          </p>
        }
      />
    </div>
  );
}
