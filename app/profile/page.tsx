import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Metadata } from "next";
import ProfileForm from "./profileForm";
import Layout from "@/components/layout/Layout";
import ProfileCard from "./ProfileCard";
import { Suspense } from "react";
import bkFetch from "@/services/backend.services";
import { USERS_DJANGO_URL } from "@/lib/constants/be";

export const metadata: Metadata = {
  title: "Profile - Cloud Community Day 2025",
  description: "Manage your Cloud Community Day 2025 account profile",
};

const Page = async () => {
  const session = await getServerSession(authOptions);
  if (!session?.access) redirect("/login");
  const response = await bkFetch(USERS_DJANGO_URL, {
    method: "GET",
    cache: 'no-store',
});
const user = await response.json();

  return (
    <Layout>
    <section className="min-h-[calc(100vh-4rem)] w-full  container mx-auto py-20 relative">
      <Suspense fallback={<>Loading profile...</>}>

    <ProfileCard user={user} session={session}/>
      </Suspense>
    </section>
    </Layout>
  );
};

export default Page;
