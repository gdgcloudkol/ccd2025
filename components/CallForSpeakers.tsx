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

interface ApiSpeaker {
  id: string;
  fullName: string;
  tagLine: string;
  bio: string;
  profilePicture: string;
  links?: {
    title: string;
    url: string;
  }[];
  questionAnswers?: {
    answer: string;
  }[];
  sessions?: any[];
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
      <p className="text-xs text-[var(--color-muted-foreground)] line-clamp-2">
        {role}
        {company ? `, ${company}` : ""}
      </p>
    </div>
  </div>
);

export default function CallForSpeakers() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [speakersPerView, setSpeakersPerView] = useState(3);
  const [apiSpeakers, setApiSpeakers] = useState<SpeakerProps[]>([]);
  const [allSpeakers, setAllSpeakers] = useState<SpeakerProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Header icons
  const headerIcons = [
    { src: "/images/elements/star.svg", alt: "star" },
    { src: "/images/elements/smile.svg", alt: "smile" },
    { src: "/images/elements/circleStar.svg", alt: "circleStar" },
    { src: "/images/elements/starOuter.svg", alt: "starOuter" },
  ];

  // Speaker data from JSON (extended event speakers)
  const extendedSpeakers = CONTENT.pastSpeakers;

  // Fetch speakers from API and combine with local speakers
  useEffect(() => {
    const fetchSpeakers = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(
          "https://sessionize.com/api/v2/ilkj4hf0/view/Speakers"
        );
        if (!res.ok) {
          throw new Error(`Failed to fetch speakers: ${res.status}`);
        }

        const data: ApiSpeaker[] = await res.json();
        // console.log("Raw API speakers data:", data);

        const formattedSpeakers: SpeakerProps[] = data.map((speaker) => {
          let role = speaker.tagLine || "";
          let company = "";

          if (role) {
            const roleParts = role.split("@");
            if (roleParts.length > 1) {
              role = roleParts[0].trim();
              company = roleParts[1].trim();
            } else {
              const atIndex = role.indexOf(" at ");
              if (atIndex > -1) {
                company = role.substring(atIndex + 4);
                role = role.substring(0, atIndex);
              }
            }
          }

          return {
            name: speaker.fullName,
            role: role,
            company: company,
            image: speaker.profilePicture || "/images/speakers/placeholder.svg",
          };
        });

        setApiSpeakers(formattedSpeakers);
        
        //  API speakers with extended event speakers
        const combinedSpeakers = [...formattedSpeakers, ...extendedSpeakers];
        // console.log("Combined speakers:", combinedSpeakers);
        setAllSpeakers(combinedSpeakers);
        
        setError(null);
      } catch (err) {
        console.error("Error fetching speakers:", err);
        setError("Failed to load speakers from API. Using extended event speakers only.");
        setAllSpeakers(extendedSpeakers);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSpeakers();
  }, []);

  // Speakers per view on initial render and resizing
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
        ? Math.max(0, allSpeakers.length - speakersPerView)
        : Math.max(0, prev - speakersPerView)
    );
  };

  const handleNext = () => {
    setCurrentIndex((prev) =>
      prev + speakersPerView >= allSpeakers.length ? 0 : prev + speakersPerView
    );
  };

  const visibleSpeakers = allSpeakers.slice(
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
                    href={'#'}
                    className="inline-flex items-center gap-2 bg-google-red text-[var(--color-background)] px-6 py-3 rounded-full font-medium"
                  >
                    <img
                      src="/images/elements/gemini.svg"
                      className="mr-1 w-4 h-4 dark:invert"
                      alt="gemini"
                    />
                    CFS Closed
                    <img
                      src="/images/elements/gemini.svg"
                      className="ml-1 w-4 h-4 dark:invert"
                      alt="gemini"
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
                  {isLoading
                    ? "Loading Speakers..."
                    : error
                    ? "Event Speakers"
                    : "Our Past Speakers"}
                  <hr className="mt-1 w-32 mx-auto border-[var(--color-border)]" />
                </h2>
              </div>

              <div className="relative">
                {/* Arrows */}
                <button
                  className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 bg-[var(--color-chart-1)] dark:bg-[var(--color-chart-2)] rounded-full flex items-center justify-center text-[var(--color-background)]"
                  aria-label="Previous speakers"
                  onClick={handlePrev}
                  disabled={isLoading}
                >
                  <img
                    src="/images/elements/leftArrow.svg"
                    className="w-3 h-3"
                    alt="left arrow"
                  />
                </button>

                {/* Carousel */}
                <div className="px-12 transition-all duration-300">
                  {isLoading ? (
                    <div className="h-20 flex items-center justify-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[var(--color-chart-1)]"></div>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
                      {visibleSpeakers.map((speaker, index) => (
                        <Speaker
                          key={`${currentIndex}-${index}`}
                          name={speaker.name}
                          role={speaker.role}
                          company={speaker.company}
                          image={speaker.image}
                        />
                      ))}
                    </div>
                  )}
                </div>

                <button
                  className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 bg-[var(--color-chart-1)] dark:bg-[var(--color-chart-2)] rounded-full flex items-center justify-center text-[var(--color-background)]"
                  aria-label="Next speakers"
                  onClick={handleNext}
                  disabled={isLoading}
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