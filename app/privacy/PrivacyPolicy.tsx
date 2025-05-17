import React from "react";
import { ContentParagraph } from "@/components/ui/PageContentParagraph";
import { PageHeader } from "@/components/ui/PageHeader";
import { SubHeader } from "@/components/ui/SubHeader";
import privacyPolicy from "../../public/content/privacypolicy.json";
import HrWithImage from "@/components/ui/HrWithImage";

interface SectionData {
  title: string;
  content: string;
  listItems?: string[];
}

interface PrivacyPolicyData {
  title: string;
  introduction: string;
  illustration: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
  mainContent: string;
  sections: SectionData[];
}
const PrivacyPolicy: React.FC = () => {
  const policyData = privacyPolicy as PrivacyPolicyData;

  return (
    <div className="container mx-auto px-4 md:px-12 py-14 relative z-10">
      <div className="min-h-screen overflow-hidden">
        <div className="">
          <PageHeader>{policyData.title}</PageHeader>

          <ContentParagraph className="text-base py-2">
            {policyData.introduction}
          </ContentParagraph>

          <HrWithImage
            src={policyData.illustration.src}
            alt={policyData.illustration.alt}
            width={policyData.illustration.width}
            height={policyData.illustration.height}
          />

          <ContentParagraph html={policyData.mainContent} />

          {policyData.sections.map((section, index) => (
            <section key={index}>
              <SubHeader>{section.title}</SubHeader>
              <ContentParagraph>{section.content}</ContentParagraph>
              {section.listItems && section.listItems.length > 0 && (
                <ul className="list-disc pl-6 mb-6 space-y-2">
                  {section.listItems.map((item, itemIndex) => (
                    <li
                      key={itemIndex}
                      className="text-base text-gray dark:text-gray-20"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
