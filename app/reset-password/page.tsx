import AuthContent from "@/public/content/auth.json";
import ResetForm from "./resetForm";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Metadata } from "next";
import AuthLayout from "@/components/auth/AuthLayout";

export const metadata: Metadata = {
  title: "Reset Password - Cloud Community Day 2025",
  description: "Set a new password for your Cloud Community Day 2025 account",
};

const Page = async () => {
  const session = await getServerSession(authOptions);
  if (session && session?.access) redirect("/profile");
  
  return (
    <AuthLayout showBanner={false}>
      <ResetForm />
    </AuthLayout>
  );
};

export default Page; 