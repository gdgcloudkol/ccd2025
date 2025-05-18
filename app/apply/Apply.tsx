import React from "react";
import { ContentParagraph } from "@/components/ui/PageContentParagraph";
import { PageHeader } from "@/components/ui/PageHeader";
import { SubHeader } from "@/components/ui/SubHeader";
import HrWithImage from "@/components/ui/HrWithImage";
import { ArrowRight } from "lucide-react";

const Apply: React.FC = () => {
  return (
    <div className="container mx-auto px-4 md:px-12 py-14 relative z-10">
      <div className="min-h-screen overflow-hidden">
        <div className="max-w-4xl mx-auto">
          <PageHeader>Apply for Tickets</PageHeader>

          <ContentParagraph className="text-lg md:text-xl py-4 text-muted-foreground">
            Follow these steps to secure your ticket for Cloud Community Day
            Kolkata 2025:
          </ContentParagraph>

          <HrWithImage
            src="/images/elements/2025-black.svg"
            alt="CCD 2025"
            width={200}
            height={100}
            className="dark:brightness-0 dark:invert"
          />

          <div className="space-y-12 mt-12">
            {[
              {
                step: "Step 1: Fill the Application Form",
                content:
                  "Head to Commudle and fill in the attendee application form. Make sure to provide accurate and complete information.",
                icon: "📝",
              },
              {
                step: "Step 2: Await Confirmation",
                content:
                  "Wait for confirmation from Commudle that you can purchase the ticket. This is subject to selection, so make sure to fill your Commudle profile with as much detail as possible to increase your chances.",
                icon: "⏳",
              },
              {
                step: "Step 3: Purchase Your Ticket",
                content:
                  "Once you receive the confirmation email, you will have 72 hours to purchase your ticket. Don't delay - pay for and secure your ticket as soon as possible.",
                icon: "🎫",
              },
              {
                step: "Step 4: Access CCD Kolkata Dashboard",
                content:
                  "After we confirm your payment, you will receive login access to the CCD Kolkata Dashboard where you can manage your participation.",
                icon: "🔑",
              },
              {
                step: "Bonus Opportunities",
                content:
                  "Once you access the CCD Kolkata dashboard, you can participate in online challenges and the referral program to grab exclusive swag. Plus, 3 lucky guests will be invited to the speakers + team dinner pre-event!",
                icon: "🎁",
              },
            ].map((section, index) => (
              <section
                key={index}
                className="group dark:bg-black dark:text-white dark:border-white dark:hover:border-google-blue bg-white text-black relative p-6 rounded-2xl border border-border hover:border-google-blue transition-all duration-300 hover:shadow-lg"
              >
                <div className="absolute -left-3 -top-3 w-12 h-12 bg-gradient-to-r from-google-blue to-google-red rounded-full flex items-center justify-center text-2xl">
                  {section.icon}
                </div>
                <SubHeader className="text-2xl font-semibold mb-3 group-hover:text-google-blue transition-colors">
                  {section.step}
                </SubHeader>
                <ContentParagraph className="text-muted-foreground">
                  {section.content}
                </ContentParagraph>
              </section>
            ))}
          </div>

          <div className="mt-16 flex justify-center">
            <a
              href="https://www.commudle.com/communities/gdg-cloud-kolkata/events/cloud-community-days-kolkata-2025"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center gap-2 bg-gradient-to-r from-google-blue via-google-red to-google-yellow p-[1px] rounded-full hover:scale-105 transition-all duration-300"
            >
              <span className="bg-background rounded-full px-8 py-3 font-semibold text-lg group-hover:text-google-blue transition-colors">
                Apply Now on Commudle
                <ArrowRight className="inline-block ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Apply;
