import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Metadata } from "next";
import ProfileForm from "./profileForm";

export const metadata: Metadata = {
  title: "Profile - Cloud Community Day 2025",
  description: "Manage your Cloud Community Day 2025 account profile",
};

const Page = async () => {
  const session = await getServerSession(authOptions);
  if (!session?.access) redirect("/login");
  
  return (
    <section className="min-h-[calc(100vh-4rem)] w-full bg-gradient-to-b from-background to-secondary/20">
      <div className="w-full max-w-4xl mx-auto py-10 px-4">
        <div className="bg-card text-card-foreground p-8 rounded-xl shadow-lg border border-border">
          <ProfileForm user={session.user} />
        </div>
      </div>
    </section>
  );
};

export default Page;
