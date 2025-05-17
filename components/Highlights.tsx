import React from "react";
import highlightsDataJson from "@/public/content/highlights.json";
import type { HighlightsData } from "@/types";

const highlightsData = highlightsDataJson as HighlightsData;

const Highlights: React.FC = () => {
  return (
    <div className="relative w-full py-10">
      <img
        src="/images/elements/blocks_green_left.svg"
        alt="Blocks Green Left"
        className="absolute left-0 top-0 w-20 h-20 z-20 pointer-events-none select-none"
      />
      <section className="bg-transparent px-4 flex flex-col items-center relative pt-0 md:pt-6">
        <div className="w-full max-w-5xl mb-8">
          <div className="flex flex-row items-start justify-between py-16">
            <div>
              <h2 className="text-3xl font-medium mb-4 text-left text-[var(--foreground)]">
                {highlightsData.title}
              </h2>
              <span className="inline-block border-2 border-[var(--blue50)] text-[var(--blue50)] rounded-full px-5 py-1 text-xl font-semibold mb-4 md:hidden">
                {highlightsData.year}
              </span>
              <p className="text-[var(--gray)] dark:text-[var(--gray20)] max-w-3xl text-xl font-normal text-justify">
                {highlightsData.description}
              </p>
            </div>
            <div className="ml-8 mt-1">
              <span className="hidden md:inline-block border-2 border-[var(--blue50)] text-[var(--blue50)] rounded-full px-5 py-1 text-xl font-semibold">
                {highlightsData.year}
              </span>
            </div>
          </div>
          {/* Stats Section */}
          <div className="grid grid-cols-2 gap-x-12 gap-y-8 md:flex md:flex-row md:gap-12 md:justify-start">
            {highlightsData.stats.map((stat, idx) => (
              <div key={idx} className="flex flex-col items-start">
                <span className="text-3xl font-normal text-[var(--foreground)]">
                  {stat.value}
                </span>
                <span className="text-[var(--gray)] dark:text-[var(--gray20)] text-xl font-extralight">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
        {/* Video Section */}
        <div className="w-full max-w-5xl mb-4 relative">
          <div className="w-full bg-[var(--black)] border-4 border-[var(--black)] overflow-hidden aspect-video">
            <iframe
              src={highlightsData.video.url}
              title={highlightsData.video.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="w-full h-full"
            />
          </div>
          <div
            className="absolute left-1/2 -bottom-6 transform -translate-x-1/2 bg-white px-6 py-2 text-base z-10 rotate-[-2deg] text-black hidden md:block"
            style={{
              boxShadow: "4px -8px 0 2px var(--black), 0 0 0 4px var(--black)",
            }}
          >
            {highlightsData.video.hashtag}
          </div>
        </div>
        {/* Grid Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-md md:max-w-5xl mt-12">
          {highlightsData.grid.map((img, idx) => (
            <div key={idx} className="relative">
              <div className="w-full aspect-square md:aspect-[3/2] bg-[var(--gray20)] dark:bg-[var(--gray60)] flex items-center justify-center overflow-hidden">
                <img
                  src={img.src}
                  alt={img.alt}
                  className="object-cover w-full h-full"
                />
              </div>
              <span
                className="absolute left-1/3 md:left-1/4 -translate-x-1/2 bottom-0 translate-y-1/2 bg-[var(--white)] px-4 md:px-6 py-2 text-base z-10 rotate-[-2deg] text-[var(--black)] ml-2 md:ml-0"
                style={{
                  boxShadow:
                    "4px -8px 0 2px var(--black), 0 0 0 3px var(--black)",
                  borderStyle: "solid",
                }}
              >
                {img.caption}
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Highlights;