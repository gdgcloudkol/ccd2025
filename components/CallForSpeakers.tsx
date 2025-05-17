"use client";

import { useEffect, useState, type FC } from "react";
import Link from "next/link";
import CONTENT from "../public/content/home.json";

// Speaker types
interface SpeakerProps {
  name: string;
  role: string;
  company: string;
  image: string;
}

// Speaker component
const Speaker: FC<SpeakerProps> = ({ name, role, company, image }) => (
  <div className="flex flex-col items-center sm:flex-row p-2 w-full max-h-[120px]">
    <div className="flex-shrink-0 mb-3 sm:mb-0 sm:mr-3">
      <div className="h-16 w-16 rounded-full border-4 border-t-[var(--color-chart-1)] border-l-[var(--color-chart-2)] border-r-[var(--color-chart-3)] border-b-[var(--color-chart-4)] mx-auto sm:mx-0">
        <img
          src={image}
          alt={name}
          width={64}
          height={64}
          className="object-cover rounded-full"
        />
      </div>
    </div>
    <div className="flex-1 text-center sm:text-left">
      <h3 className="font-medium text-sm text-[var(--color-foreground)]">
        {name}
      </h3>
      <p className="text-xs text-[var(--color-muted-foreground)] max-sm:line-clamp-2">
        {role}
        {company ? `, ${company}` : ""}
      </p>
    </div>
  </div>
);

export default function CallForSpeakers() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [speakersPerView, setSpeakersPerView] = useState(3);

  // Header icons
  const headerIcons = [
    { src: "/images/elements/star.svg", alt: "star" },
    { src: "/images/elements/smile.svg", alt: "smile" },
    { src: "/images/elements/circleStar.svg", alt: "circleStar" },
    { src: "/images/elements/starOuter.svg", alt: "starOuter" },
  ];

  // Speaker data
  const speakers = CONTENT.pastSpeakers;

  // Set speakers per view on initial render and resize
  useEffect(() => {
    if (typeof window === "undefined") return;

    const updateView = () => {
      const width = window.innerWidth;
      if (width < 640) setSpeakersPerView(1); // mobile
      else if (width < 1024) setSpeakersPerView(2); // tablet
      else setSpeakersPerView(3); // desktop
    };

    updateView();
    window.addEventListener("resize", updateView);
    return () => window.removeEventListener("resize", updateView);
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prev) =>
      prev === 0
        ? Math.max(0, speakers.length - speakersPerView)
        : Math.max(0, prev - speakersPerView)
    );
  };

  const handleNext = () => {
    setCurrentIndex((prev) =>
      prev + speakersPerView >= speakers.length ? 0 : prev + speakersPerView
    );
  };

  const visibleSpeakers = speakers.slice(
    currentIndex,
    currentIndex + speakersPerView
  );

  return (
    <div className="flex items-center justify-center p-4 relative">
      <div className="w-full max-w-5xl overflow-hidden border border-[var(--color-border)] bg-cfs-gradient rounded-3xl p-[1px]">
        {/* Header with gradient */}
        <div className="relative h-16 flex items-center px-6">
          <div className="px-2 py-1 pb-5 rounded">
            <img src="/images/elements/2025.svg" alt="ccd year" />
          </div>
          <div className="absolute right-6 flex items-center space-x-2 pb-5">
            {headerIcons.map((icon, index) => (
              <div
                key={index}
                className="w-5 h-5 rounded-full flex items-center justify-center"
              >
                <img src={icon.src} alt={icon.alt} />
              </div>
            ))}
          </div>
        </div>

    <div className="bg-white dark:bg-black rounded-3xl -mt-4">
          {/* Content wrapper */}
          <div className="p-4 pt-10">
            <div className="flex flex-col md:flex-row gap-8">
              {/* Left content */}
              <div className="flex-1 flex justify-center">
                <div className="flex flex-col items-center md:items-start p-8">
                  <h1 className="text-2xl md:text-4xl font-bold mb-4 text-[var(--color-foreground)]">
                    Call for Speakers
                  </h1>
                  <p className="text-[var(--color-muted-foreground)] mb-6 max-w-xl text-base text-justify">
                    {CONTENT.cfsText}
                  </p>
                  <Link
                    href={CONTENT.cfsLink}
                    className="inline-flex items-center gap-2 bg-[var(--color-foreground)] text-[var(--color-background)] px-6 py-3 rounded-full font-medium"
                  >
                    <img
                      src="/images/elements/gemini.svg"
                      className="mr-1 dark:hidden block w-4 h-4"
                      alt={"gemini"}
                    />
                    <img
                      src="/images/elements/gemini_dark.svg"
                      className="mr-1 hidden dark:block w-4 h-4"
                      alt={"gemini"}
                    />
                    Apply Now
                    <img
                      src="/images/elements/gemini.svg"
                      className="ml-1 dark:hidden block w-4 h-4"
                      alt={"gemini"}
                    />
                    <img
                      src="/images/elements/gemini_dark.svg"
                      className="ml-1 hidden dark:block w-4 h-4"
                      alt={"gemini"}
                    />
                  </Link>
                </div>
              </div>

              {/* Right image */}
              <div className="flex-1 flex justify-center">
                <img
                  src="/images/cfs/cfs.png"
                  alt="Hosts at Cloud Community Day"
                  className="w-full max-w-[400px] h-auto min-h-[240px] object-cover block dark:hidden"
                />
                <img
                  src="/images/cfs/cfs_dark.png"
                  alt="Hosts at Cloud Community Day"
                  className="w-full max-w-[400px] h-auto min-h-[240px] object-cover hidden dark:block"
                />
              </div>
            </div>
            <hr className="border-[var(--color-border)]" />

            {/* Speakers carousel */}
            <div className="mt-8 pb-6">
              <div className="text-center mb-4">
                <h2 className="text-xl font-medium inline-block text-[var(--color-foreground)]">
                  Past Speakers 2024
                  <hr className="mt-1 w-32 mx-auto border-[var(--color-border)]" />
                </h2>
              </div>

              <div className="relative">
                {/* Arrows */}
                <button
                  className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 bg-[var(--color-chart-1)] dark:bg-[var(--color-chart-2)] rounded-full flex items-center justify-center text-[var(--color-background)]"
                  aria-label="Previous speakers"
                  onClick={handlePrev}
                >
                  <img
                    src="/images/elements/leftArrow.svg"
                    className="w-3 h-3"
                    alt="left arrow"
                  />
                </button>

                {/* Carousel */}
                <div className="px-12 transition-all duration-300">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
                    {visibleSpeakers.map((speaker, index) => (
                      <Speaker
                        key={currentIndex + index}
                        name={speaker.name}
                        role={speaker.role}
                        company={speaker.company}
                        image={speaker.image}
                      />
                    ))}
                  </div>
                </div>

                <button
                  className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 bg-[var(--color-chart-1)] dark:bg-[var(--color-chart-2)] rounded-full flex items-center justify-center text-[var(--color-background)]"
                  aria-label="Next speakers"
                  onClick={handleNext}
                >
                  <img
                    src="/images/elements/rightArrow.svg"
                    className="w-3 h-3"
                    alt="right arrow"
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
