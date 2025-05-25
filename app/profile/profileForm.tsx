"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";
import { useRouter } from "next/navigation";
import AuthForm from "@/components/auth/AuthForm";
import { AlertCircle } from "lucide-react";
import { Session } from "next-auth";

const formSchema = z.object({
  firstName: z.string().min(1, { message: "First name is required" }),
  lastName: z.string().min(1, { message: "Last name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  organization: z.string().min(1, { message: "Organization is required" }),
  role: z.string().min(1, { message: "Role is required" }),
  bio: z.string().optional(),
  twitter: z.string().url({ message: "Invalid Twitter URL" }).optional().or(z.literal("")),
  linkedin: z.string().url({ message: "Invalid LinkedIn URL" }).optional().or(z.literal("")),
  github: z.string().url({ message: "Invalid GitHub URL" }).optional().or(z.literal("")),
});

interface ProfileFormProps {
  user: Session["user"];
}

export default function ProfileForm({ user }: ProfileFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: user.profile?.first_name || "",
      lastName: user.profile?.last_name || "",
      email: user.email || "",
      organization:  "",
      role: user.profile?.role || "",
      bio: user.profile?.bio || "",
      twitter: user.profile?.socials?.twitter || "",
      linkedin: user.profile?.socials?.linkedin || "",
      github: user.profile?.socials?.github || "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    try {
      const response = await fetch("/api/auth/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Something went wrong");
      }

      router.refresh();
    } catch (error) {
      form.setError("root", {
        message: error instanceof Error ? error.message : "Something went wrong",
      });
    } finally {
      setIsLoading(false);
    }
  }

  const isProfileComplete = Boolean(
    user.profile?.first_name &&
    user.profile?.last_name 
    //&& user.profile?.active_role &&
    // user.profile?.active_organization?.name
  );

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-center md:text-left bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
          Profile Settings
        </h1>
        <p className="text-center md:text-left text-muted-foreground">
          Update your profile information below.
        </p>
        {!isProfileComplete && (
          <div className="flex items-center gap-2 text-destructive bg-destructive/10 p-4 rounded-lg">
            <AlertCircle className="h-5 w-5" />
            <p>
              Your profile is incomplete. Please fill in all required fields to ensure your applications are not rejected.
            </p>
          </div>
        )}
      </div>

      <AuthForm
        form={form}
        onSubmit={onSubmit}
        isLoading={isLoading}
        submitText="Update Profile"
        error={form.formState.errors.root?.message}
        fields={[
          {
            name: "firstName",
            label: "First Name",
            placeholder: "John",
          },
          {
            name: "lastName",
            label: "Last Name",
            placeholder: "Doe",
          },
          {
            name: "email",
            label: "Email",
            type: "email",
            placeholder: "john@example.com",
          },
          {
            name: "organization",
            label: "Organization",
            placeholder: "Your company or institution",
          },
          {
            name: "role",
            label: "Role",
            placeholder: "Your current role",
          },
          {
            name: "bio",
            label: "Bio",
            placeholder: "Tell us about yourself",
            description: "Optional: A brief description about yourself",
          },
          {
            name: "twitter",
            label: "Twitter Profile",
            placeholder: "https://twitter.com/username",
            description: "Optional: Your Twitter profile URL",
          },
          {
            name: "linkedin",
            label: "LinkedIn Profile",
            placeholder: "https://linkedin.com/in/username",
            description: "Optional: Your LinkedIn profile URL",
          },
          {
            name: "github",
            label: "GitHub Profile",
            placeholder: "https://github.com/username",
            description: "Optional: Your GitHub profile URL",
          },
        ]}
      />
    </div>
  );
}
