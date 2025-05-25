"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import AuthContent from "@/public/content/auth.json";
import { useState } from "react";
import { useRouter } from "next/navigation";
import LoadLink from "@/components/blocks/LoadLink";
import AuthForm from "@/components/auth/AuthForm";

const formSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
});

export default function ForgotForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess,setIsSuccess]= useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    try {
      const response = await fetch("/api/auth/forgot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Something went wrong");
      }

      setIsSuccess(true)
    } catch (error) {
      form.setError("root", {
        message: error instanceof Error ? error.message : "Something went wrong",
      });
      setIsSuccess(false)
    } finally {
      setIsLoading(false);
    }
  }
if(isSuccess)
  return <h3>{AuthContent.forgotSuccessMessage}</h3>
  return (
    <div className="space-y-8">
      <div className="space-y-2 inline-block md:hidden">
        <h1 className="text-3xl font-bold text-center md:text-left bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
          {AuthContent.resetFormTitle}
        </h1>
        <p className="text-center md:text-left text-muted-foreground">
          Enter your email address and we'll send you a link to reset your password.
        </p>
      </div>

      <AuthForm
        form={form}
        onSubmit={onSubmit}
        isLoading={isLoading}
        submitText="Send Reset Link"
        error={form.formState.errors.root?.message}
        fields={[
          {
            name: "email",
            label: "Email",
            type: "email",
            placeholder: "john@example.com",
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
