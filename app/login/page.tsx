import AuthContent from "@/public/content/auth.json";
import LoginForm from "./loginForm";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Metadata } from "next";
import AuthLayout from "@/components/auth/AuthLayout";

export const metadata: Metadata = {
  title: "Login - Cloud Community Day 2025",
  description: "Login to your Cloud Community Day 2025 account",
};

const Page = async () => {
  const session = await getServerSession(authOptions);
  if (session && session?.access) redirect("/profile");
  
  return (
    <AuthLayout headerContent={<span className="text-white text-lg font-semibold">Login</span>}>
      <LoginForm />
    </AuthLayout>
  );
};

export default Page;
