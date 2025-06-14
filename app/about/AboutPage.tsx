import React from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { ContentParagraph } from "@/components/ui/PageContentParagraph";
import HrWithImage from "@/components/ui/HrWithImage";

import aboutData from "../../public/content/about.json";

const AboutPage: React.FC = () => {
  interface AboutData {
    title: string;
    description: string;
    illustration: {
      src: string;
      alt: string;
      width: number;
      height: number;
    };
  }
  const aboutContent = aboutData as AboutData;

  return (
    <div className="container mx-auto px-4 md:px-12 py-14 relative z-10">
      <div className="min-h-screen overflow-hidden">
        <div className="">
          <PageHeader>{aboutContent.title}</PageHeader>

          <ContentParagraph className="text-base py-2">
            {aboutContent.description}
          </ContentParagraph>

          <HrWithImage
            src={aboutContent.illustration.src}
            alt={aboutContent.illustration.alt}
            width={aboutContent.illustration.width}
            height={aboutContent.illustration.height}
          />

          <div className="prose dark:prose-invert max-w-none mt-8">
            <h2 className="text-2xl font-bold mt-8 mb-4 text-black dark:text-white">
              Our Mission
            </h2>
            <p className="mb-6 text-gray dark:text-gray-20">
              Our mission is to foster a vibrant community of cloud practitioners
              and enthusiasts, providing a platform for knowledge sharing,
              networking, and collaboration. We aim to accelerate cloud adoption
              and innovation by bringing together diverse perspectives and
              experiences.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4 text-black dark:text-white">
              Event History
            </h2>
            <p className="mb-6 text-gray dark:text-gray-20">
              Cloud Community Day has grown from a small local meetup to a
              globally recognized event attracting participants from around the
              world. Each year, we strive to deliver exceptional content, engaging
              speakers, and valuable networking opportunities.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4 text-black dark:text-white">
              Organizing Team
            </h2>
            <p className="mb-6 text-gray dark:text-gray-20">
              Cloud Community Day is organized by a dedicated team of volunteers
              from GDG Cloud Kolkata, passionate about cloud technologies and
              community building. Our team works tirelessly to create an
              inclusive, informative, and inspiring event for all participants.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
