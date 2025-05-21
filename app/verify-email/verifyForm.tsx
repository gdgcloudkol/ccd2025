"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import LoadLink from "@/components/blocks/LoadLink";
import AuthForm from "@/components/auth/AuthForm";

const formSchema = z.object({
  code: z.string().min(6, { message: "Verification code must be 6 characters" }),
});

export default function VerifyForm() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email");

  if (!email) {
    window.location.replace("/signup");
    return null;
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      code: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    try {
      const response = await fetch("/api/auth/verify-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          code: values.code,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Something went wrong");
      }

      window.location.replace("/login?message=Email verified successfully. Please log in.");
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
          Verify Your Email
        </h1>
        <p className="text-center md:text-left text-muted-foreground">
          We've sent a verification code to {email}. Please enter it below.
        </p>
      </div>

      <AuthForm
        form={form}
        onSubmit={onSubmit}
        isLoading={isLoading}
        submitText="Verify Email"
        error={form.formState.errors.root?.message}
        fields={[
          {
            name: "code",
            label: "Verification Code",
            placeholder: "123456",
            description: "Enter the 6-digit code sent to your email",
          },
        ]}
        footer={
          <>
            <p className="mb-4">
              Didn't receive the code?{" "}
              <button
                type="button"
                onClick={() => {
                  // TODO: Implement resend code functionality
                }}
                className="text-primary hover:text-primary/80 transition-colors font-medium"
              >
                Resend Code
              </button>
            </p>
            <p>
              Remember your password?{" "}
              <LoadLink
                href="/login"
                className="text-primary hover:text-primary/80 transition-colors font-medium"
              >
                Log in
              </LoadLink>
            </p>
          </>
        }
      />
    </div>
  );
} 