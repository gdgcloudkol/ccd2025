import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Metadata } from "next";
import ProfileForm from "./profileForm";
import Layout from "@/components/layout/Layout";
import ProfileCard from "./ProfileCard";

export const metadata: Metadata = {
  title: "Profile - Cloud Community Day 2025",
  description: "Manage your Cloud Community Day 2025 account profile",
};

const Page = async () => {
  const session = await getServerSession(authOptions);
  // if (!session?.access) redirect("/login");
  
  return (
    <Layout>
    <section className="min-h-[calc(100vh-4rem)] w-full  container mx-auto py-20 relative">
          {/* <ProfileForm user={{
            email:"gourav@devgg.in",
            first_name:"Gourav",
            last_name:"Ghosal",
            pk:1,
            profile:{
              bio:"",
              role:"member"
            }
          }} /> */}
          <ProfileCard/>
    </section>
    </Layout>
  );
};

export default Page;
