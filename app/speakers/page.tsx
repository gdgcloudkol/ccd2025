import CallForSpeakers from "@/components/CallForSpeakers";
import Layout from "@/components/layout/Layout";
import HrWithImage from "@/components/ui/HrWithImage";
import { ContentParagraph } from "@/components/ui/PageContentParagraph";
import { PageHeader } from "@/components/ui/PageHeader";

import speakersData from "../../public/content/speakers.json";
import SpeakerCompaniesSection from "@/components/SpeakerCompanies";
export default function Speakers() {


    interface SpeakerData {
        title: string;
        description: string;
        illustration: {
            src: string;
            alt: string;
            width: number;
            height: number;
        };
    }
    const speakerData = speakersData as SpeakerData;

    return <Layout>
        <div className="container mx-auto px-4 md:px-12 py-14 relative z-10">
            <div className="min-h-screen overflow-hidden">
                <div className="">
                    <PageHeader>{speakerData.title}</PageHeader>

                    <ContentParagraph className="text-base py-2">
                        {speakerData.description}
                    </ContentParagraph>

                    <HrWithImage
                        src={speakerData.illustration.src}
                        alt={speakerData.illustration.alt}
                        width={speakerData.illustration.width}
                        height={speakerData.illustration.height}
                    />

                    <SpeakerCompaniesSection variant="marquee"/>
                    {/* <CallForSpeakers /> */}
                </div>
            </div>
        </div>
    </Layout>
}