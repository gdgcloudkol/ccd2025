"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import AuthContent from "@/public/content/auth.json";
import { useState } from "react";
import { signIn } from "next-auth/react";
import LoadLink from "@/components/blocks/LoadLink";
import { useSearchParams } from "next/navigation";
import AuthForm from "@/components/auth/AuthForm";

const formSchema = z.object({
  username: z.string().min(1, { message: "Username is required" }),
  password: z
    .string()
    .min(8, { message: "Password minimum length is of 8 characters" }),
});

export default function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const searchParams = useSearchParams();
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    await signIn("ccd2025", {
      username: values.username,
      password: values.password,
    });
    setIsLoading(false);
  }

  const error = searchParams.get("error")
    ? searchParams.get("error") === "CredentialsSignin"
      ? "Invalid credentials"
      : searchParams.get("error")
    : undefined;

    const message = searchParams.get("message")
      ? searchParams.get("message")
    : undefined;

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-center md:text-left bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
          {AuthContent.loginFormTitle}
        </h1>
        <p
          className="text-center md:text-left text-muted-foreground"
          dangerouslySetInnerHTML={{ __html: AuthContent.loginFormDescription }}
        />
      </div>

      <AuthForm
        form={form}
        onSubmit={onSubmit}
        isLoading={isLoading}
        submitText="Log in"
        error={error||""}
        message={message||""}
        fields={[
          {
            name: "username",
            label: "Username",
            placeholder: "john",
          },
          {
            name: "password",
            label: "Password",
            type: "password",
            placeholder: "********",
          },
        ]}
        footer={
          <>
            <div className="flex items-center justify-between mb-4">
              <LoadLink
                href="/forgot"
                className="text-primary hover:text-primary/80 transition-colors"
              >
                Forgot Password?
              </LoadLink>
            </div>
            <p>
              Don't have an account?{" "}
              <LoadLink
                href="/signup"
                className="text-primary hover:text-primary/80 transition-colors font-medium underline"
              >
                Create an account
              </LoadLink>
            </p>
          </>
        }
      />
    </div>
  );
}
