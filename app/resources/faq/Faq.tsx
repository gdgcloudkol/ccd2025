import React, { useState } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { ContentParagraph } from "@/components/ui/PageContentParagraph";
import HrWithImage from "@/components/ui/HrWithImage";
import CardContainer from "@/components/ui/CardContainer";
import Accordion from "@/components/ui/Accordion";
import faqDataJson from "../../../public/content/faqdata.json";

interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

interface FaqCategory {
  title: string;
  items: FaqItem[];
}

const faqData: FaqCategory[] = faqDataJson.categories;

const Faq: React.FC = () => {
  const [openAccordions, setOpenAccordions] = useState<{
    [key: string]: boolean;
  }>({});

  const toggleAccordion = (id: string) => {
    setOpenAccordions((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div className="container mx-auto px-4 md:px-12 py-14 relative z-10">
      <div className="min-h-screen overflow-hidden">
        <div className="max-w-4xl mx-auto">
          <PageHeader>Frequently Asked Questions</PageHeader>

          <ContentParagraph className="text-base py-2">
            For any queries related to sponsorship, please reach out to us at{" "}
            <a
              href="mailto:partners@gdgcloudkol.org"
              className="text-blue-50 underline hover:text-blue-50/80"
            >
              partners@gdgcloudkol.org
            </a>
            . Any question related to participation can be asked at{" "}
            <a
              href="mailto:gdgcloudkol@gmail.com"
              className="text-blue-50 underline hover:text-blue-50/80"
            >
              gdgcloudkol@gmail.com
            </a>
          </ContentParagraph>

          <HrWithImage
            src="/images/elements/green_block_full.png"
            alt="FAQ Illustration"
            width={300}
            height={300}
          />

          <div className="my-12 space-y-10">
            {faqData.map((category, index) => (
              <CardContainer
                key={index}
                headerTitle={
                  <span className="text-xl font-bold text-white dark:text-white">
                    {category.title}
                  </span>
                }
                maxWidth="max-w-4xl"
              >
                <Accordion
                  items={category.items.map((faq) => ({
                    id: faq.id,
                    title: faq.question,
                    content: (
                      <p
                        className="text-foreground dark:text-gray-20"
                        dangerouslySetInnerHTML={{ __html: faq.answer }}
                      />
                    ),
                  }))}
                  openItems={openAccordions}
                  onToggle={toggleAccordion}
                />
              </CardContainer>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Faq;
