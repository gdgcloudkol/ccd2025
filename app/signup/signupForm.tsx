"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import AuthContent from "@/public/content/auth.json";
import { useState } from "react";
import { useRouter } from "next/navigation";
import LoadLink from "@/components/blocks/LoadLink";
import AuthForm from "@/components/auth/AuthForm";

const formSchema = z
  .object({
    username: z.string().min(1, { message: "Username is required" }),
    email: z.string().email({ message: "Invalid email address" }),
    password: z
      .string()
      .min(8, { message: "Password minimum length is of 8 characters" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export default function SignupForm() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: values.username,
          email: values.email,
          password1: values.password,
          password2: values.confirmPassword,
        }),
      });

      if (!response.ok) {
        const error = await response.json();

        // Handle field-wise backend errors
        if (typeof error === "object" && error !== null) {
          for (const key in error) {
            if (Array.isArray(error[key]) && error[key].length > 0) {
              form.setError(key as keyof typeof values, {
                message: error[key][0],
              });
            }
          }
        } else {
          form.setError("root", {
            message: error.message || "Something went wrong",
          });
        }

        return;
      }

      window.location.href = "/login";
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
          {AuthContent.signupFormTitle}
        </h1>
        <p
          className="text-center md:text-left text-muted-foreground"
          dangerouslySetInnerHTML={{ __html: AuthContent.signupFormDescription }}
        />
      </div>

      <AuthForm
        form={form}
        onSubmit={onSubmit}
        isLoading={isLoading}
        submitText="Create Account"
        error={form.formState.errors.root?.message}
        fields={[
          {
            name: "username",
            label: "Username",
            placeholder: "john",
          },
          {
            name: "email",
            label: "Email",
            type: "email",
            placeholder: "john@example.com",
          },
          {
            name: "password",
            label: "Password",
            type: "password",
            placeholder: "********",
            description: "Password must be at least 8 characters long",
          },
          {
            name: "confirmPassword",
            label: "Confirm Password",
            type: "password",
            placeholder: "********",
          },
        ]}
        footer={
          <p>
            Already have an account?{" "}
            <LoadLink
              href="/login"
              className="text-primary hover:text-primary/80 transition-colors font-medium"
            >
              Log in
            </LoadLink>
          </p>
        }
      />
    </div>
  );
}
