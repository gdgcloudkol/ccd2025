import AuthContent from "@/public/content/auth.json";
import ResetForm from "../../resetForm";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect, useSearchParams } from "next/navigation";
import { Metadata } from "next";
import AuthLayout from "@/components/auth/AuthLayout";

export const metadata: Metadata = {
  title: "Reset Password - Cloud Community Day 2025",
  description: "Set a new password for your Cloud Community Day 2025 account",
};

const Page = async ({ searchParams }: { searchParams: Promise<{ onboarding: string }> }) => {
const {onboarding} = await searchParams
let title= "Reset"
  const session = await getServerSession(authOptions);
  if (session && session?.access) redirect("/profile");
  if(onboarding && onboarding=="true")
    title="Activate"
  return (
    <AuthLayout headerContent={<span className="text-white text-lg font-semibold">{title}</span>}>
      <ResetForm />
    </AuthLayout>
  );
};

export default Page; 