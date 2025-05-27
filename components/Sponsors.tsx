import React from "react";
import CardContainer from "./ui/CardContainer";
import sponsorsData from "../public/content/sponsors.json";

const Sponsors: React.FC = () => {
  const { title, description, titleSponsors, communityPartners, pastSponsors, illustration } = sponsorsData;

  return (
    <section className="py-8 sm:py-12 lg:py-16 px-3 sm:px-6 lg:px-8 relative">
      <img
        src={illustration.src}
        alt={illustration.alt}
        className="absolute left-0 top-0 z-20 pointer-events-none select-none w-16 sm:w-20 lg:w-auto"
        width={illustration.width}
        height={illustration.height}
      />
      <div className="max-w-7xl mx-auto">
        {/* Sponsors Header */}
        <div className="text-center mb-6 sm:mb-8">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-black dark:text-white mb-3 sm:mb-4">
            {title}
          </h2>
          <p className="text-sm sm:text-base text-[#676C72] dark:text-[#d2d7dc] max-w-3xl mx-auto mb-4 sm:mb-6 px-2">
            {description}
          </p>

          {/* Contact Button */}
          <a
            href="mailto:gdgcloudkol@gmail.com"
            className="inline-flex items-center bg-[var(--black)] text-[var(--white)] dark:bg-[var(--white)] dark:text-[var(--black)] px-4 sm:px-6 py-2 sm:py-3 rounded-full font-medium text-sm sm:text-base md:text-lg mt-2"
          >
            <img
              src="/images/elements/gemini.svg"
              className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3 dark:invert block"
              alt="gemini"
            />
            gdgcloudkol@gmail.com
            <img
              src="/images/elements/gemini.svg"
              className="w-4 h-4 sm:w-5 sm:h-5 ml-2 sm:ml-3 dark:invert block"
              alt="gemini"
            />
          </a>
        </div>

        {/* Title Sponsors */}
        {titleSponsors && titleSponsors.length > 0 && (
          <div className="mb-8 sm:mb-12 lg:mb-16">
            <CardContainer
              headerTitle={
                <span className="text-[14px] sm:text-lg lg:text-xl font-bold text-white dark:text-white">
                  Title Sponsor
                </span>
              }
              maxWidth="max-w-4xl"
            >
              <div className="grid grid-cols-1">
                {titleSponsors.map((sponsor, index) => (
                  <div key={index} className="flex flex-col items-center p-2 sm:p-4">
                    <img
                      src={sponsor.logo}
                      alt="Title Sponsor logo"
                      className="h-12 sm:h-16 md:h-20 object-contain w-auto mb-2 sm:mb-3 hover:opacity-80 transition-opacity"
                    />
                  </div>
                ))}
              </div>
            </CardContainer>
          </div>
        )}

        {/* Community Partners */}
        <div className="mb-8 sm:mb-12 lg:mb-16">
          <CardContainer
            headerTitle={
              <span className="text-[14px] sm:text-lg lg:text-xl font-bold text-white dark:text-white">
                Community Partners
              </span>
            }
            maxWidth="max-w-4xl"
          >
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 sm:gap-4 lg:gap-6">
              {communityPartners.map((partner, index) => (
                <div key={index} className="flex flex-col items-center p-2 sm:p-4">
                  <img
                    src={partner.logo}
                    alt="Community Partner logo"
                    className="h-12 sm:h-16 md:h-24 object-contain w-auto mb-2 sm:mb-3 hover:opacity-80 transition-opacity"
                  />
                </div>
              ))}
            </div>
          </CardContainer>
        </div>

        {/* Past Sponsors */}
        {pastSponsors && pastSponsors.length > 0 && (
          <div className="mb-8 sm:mb-12 lg:mb-16">
            <CardContainer
              headerTitle={
                <span className="text-base sm:text-lg lg:text-xl font-bold text-white dark:text-white">
                  Past Sponsors
                </span>
              }
              maxWidth="max-w-4xl"
            >
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 sm:gap-4 lg:gap-6">
                {pastSponsors.map((sponsor, index) => (
                  <div key={index} className="flex flex-col items-center p-2 sm:p-4">
                    <img
                      src={sponsor.logo}
                      alt="Past Sponsor logo"
                      className="h-10 sm:h-14 md:h-20 object-contain w-auto mb-2 sm:mb-3 hover:opacity-80 transition-opacity"
                    />
                  </div>
                ))}
              </div>
            </CardContainer>
          </div>
        )}
      </div>
    </section>
  );
};

export default Sponsors;