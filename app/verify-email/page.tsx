import AuthContent from "@/public/content/auth.json";
import VerifyForm from "./verifyForm";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Metadata } from "next";
import AuthLayout from "@/components/auth/AuthLayout";

export const metadata: Metadata = {
  title: "Verify Email - Cloud Community Day 2025",
  description: "Verify your email address for Cloud Community Day 2025",
};

const Page = async () => {
  const session = await getServerSession(authOptions);
  if (session && session?.access) redirect("/profile");
  
  return (
    <AuthLayout showBanner={false}>
      <VerifyForm />
    </AuthLayout>
  );
};

export default Page; 