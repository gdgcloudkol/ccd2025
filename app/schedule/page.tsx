import Layout from "@/components/layout/Layout";
import { PageHeader } from "@/components/ui/PageHeader";
import { ContentParagraph } from "@/components/ui/PageContentParagraph";
import HrWithImage from "@/components/ui/HrWithImage";
import Sessions from "@/components/Schedule/Schedule";
import { Metadata } from "next";

import scheduleData from "../../public/content/schedule.json";
import { Suspense } from "react";
import ScheduleLoading from "./loading";

export const metadata: Metadata = {
  title: "Schedule - CCD 2025",
  description: "View the complete schedule for CCD 2025 conference",
};

export default async function Page() {
  interface ScheduleData {
    title: string;
    description: string;
    illustration: {
      src: string;
      alt: string;
      width: number;
      height: number;
    };
  }
  const scheduleContent = scheduleData as ScheduleData;

  return (
    <Layout>
      <div className="container mx-auto px-4 md:px-12 py-14 relative z-10">
        <div className="min-h-screen overflow-hidden">
          <div className="">
            <PageHeader>{scheduleContent.title}</PageHeader>
            
            <ContentParagraph className="text-base py-2">
              {scheduleContent.description}
            </ContentParagraph>

            <HrWithImage
              src={scheduleContent.illustration.src}
              alt={scheduleContent.illustration.alt}
              width={scheduleContent.illustration.width}
              height={scheduleContent.illustration.height}
            />

            <div className="mt-8">
              <Suspense fallback={<ScheduleLoading/>}>
              <SchedulePage />
              </Suspense>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
} 

async function SchedulePage() {

  async function getSchedule() {
    try {
      const res = await fetch(
        "https://sessionize.com/api/v2/pkltj8cb/view/Sessions",
        {
          next: { revalidate: 3600 }, // Revalidate every hour
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      
      if (!res.ok) {
        throw new Error(`Failed to fetch schedule: ${res.status} ${res.statusText}`);
      }
      
      const data = await res.json();
      return data;
    } catch (error) {
      console.error("Error fetching schedule:", error);
      return [];
    }
  }

  const data = await getSchedule();

  return <Sessions sessions={data} />
} 