import AuthContent from "@/public/content/auth.json";
import ForgotForm from "./forgotForm";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Metadata } from "next";
import AuthLayout from "@/components/auth/AuthLayout";

export const metadata: Metadata = {
  title: "Forgot Password - Cloud Community Day 2025",
  description: "Reset your Cloud Community Day 2025 account password",
};

const Page = async () => {
  const session = await getServerSession(authOptions);
  if (session && session?.access) redirect("/profile");
  
  return (
    <AuthLayout headerContent={<span className="text-white text-lg font-semibold">Reset</span>}>
      <ForgotForm />
    </AuthLayout>
  );
};

export default Page;
