import React from "react";
import CardContainer from "./ui/CardContainer";
import sponsorsData from "../public/content/sponsors.json";

const Sponsors: React.FC = () => {
  const {
    title,
    description,
    titleSponsors,
    silverSponsors,
    communityPartners,
    pastSponsors,
    illustration,
  } = sponsorsData;

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
                  Co Powered By
                </span>
              }
              maxWidth="max-w-4xl"
            >
              <div className="grid grid-cols-1">
                {titleSponsors.map((sponsor, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center justify-center h-32 sm:h-28 p-2"
                  >
                    <div className="relative rounded-lg overflow-hidden w-full h-full">
                      <div className="absolute inset-0 bg-gradient-to-r from-[#ea4336] via-[#4285f4] to-[#34a853] rounded-lg"></div>
                      <div className="absolute inset-[1px] bg-white  rounded-lg p-3 flex items-center justify-center">
                        <img
                          src={sponsor.logo}
                          alt="Co Powered By logo"
                          className="h-auto w-auto max-h-24 sm:max-h-20 object-contain hover:opacity-80 transition-opacity"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContainer>
          </div>
        )}
        {/* Silver Sponsors */}
        {silverSponsors && silverSponsors.length > 0 && (
          <div className="mb-8 sm:mb-12 lg:mb-16">
            <CardContainer
              headerTitle={
                <span className="text-[14px] sm:text-lg lg:text-xl font-bold text-white dark:text-white">
                  Silver Sponsor
                </span>
              }
              maxWidth="max-w-4xl"
            >
              <div className="grid grid-cols-1">
                {silverSponsors.map((sponsor, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center justify-center h-32 sm:h-28 p-2"
                  >
                    <a
                      href={sponsor.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full h-full"
                    >
                      <div className="relative rounded-lg overflow-hidden w-full h-full">
                        <div className="absolute inset-0 bg-gradient-to-r from-[#ea4336] via-[#4285f4] to-[#34a853] rounded-lg"></div>
                        <div className="absolute inset-[1px] bg-white rounded-lg p-2 flex items-center justify-center">
                          <img
                            src={sponsor.logo}
                            alt={`${sponsor.name || "Silver Sponsor"} logo`}
                            className="h-auto w-auto max-h-24 sm:max-h-20 object-contain hover:opacity-80 transition-opacity"
                          />
                        </div>
                      </div>
                    </a>
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
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {communityPartners.map((partner, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center justify-center h-40 sm:h-32 p-3"
                >
                  {partner.logo ? (
                    // If logo is available, will be displayed with gradient border
                    <a
                      href={partner.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex flex-col items-center w-full h-full"
                    >
                      <div className="relative rounded-lg overflow-hidden w-full h-full">
                        <div className="absolute inset-0 bg-gradient-to-r from-[#ea4336] via-[#4285f4] to-[#34a853] rounded-lg"></div>
                        <div className="absolute inset-[1px] bg-white rounded-lg p-2.5 flex items-center justify-center">
                          <img
                            src={partner.logo}
                            alt={`${partner.name || "Community Partner"} logo`}
                            className="h-auto w-auto max-h-28 sm:max-h-24 object-contain hover:opacity-80 transition-opacity"
                          />
                        </div>
                      </div>
                    </a>
                  ) : (
                    // If no logo, created placeholder with GDGoC image and partner name with gradient border
                    <a
                      href={partner.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex flex-col items-center w-full h-full"
                    >
                      <div className="relative rounded-lg overflow-hidden w-full h-full">
                        <div className="absolute inset-0 bg-gradient-to-r from-[#ea4336] via-[#4285f4] to-[#34a853] rounded-lg"></div>
                        <div className="absolute inset-[1px] bg-white rounded-lg p-2.5 flex flex-col items-center justify-center text-center">
                          <img
                            src="/images/elements/GDGoC.png"
                            alt="GDG On Campus"
                            className="h-10 sm:h-12 object-contain mb-1"
                          />
                          <div className="flex items-center justify-center">
                            <span className="text-[7px] text-google-blue font-medium">
                              On Campus
                            </span>
                            <div className="flex items-center justify-center ml-1">
                              <div className="w-1 h-1 rounded-full bg-google-blue mx-1"></div>
                              <span className="text-[7px] text-gray-800 dark:text-gray-500 font-medium line-clamp-1">
                                {partner.name}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </a>
                  )}
                </div>
              ))}
            </div>
          </CardContainer>
        </div>

        {/* Past Sponsors */}
        {pastSponsors && pastSponsors.length < 0 && (
          <div className="mb-8 sm:mb-12 lg:mb-16">
            <CardContainer
              headerTitle={
                <span className="text-[14px] sm:text-lg lg:text-xl font-bold text-white dark:text-white">
                  Past Sponsors
                </span>
              }
              maxWidth="max-w-4xl"
            >
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 sm:gap-4 lg:gap-6">
                {pastSponsors.map((sponsor, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center justify-center h-32 sm:h-28 p-2"
                  >
                    <div className="relative rounded-lg overflow-hidden w-full h-full">
                      <div className="absolute inset-0 bg-gradient-to-r from-[#ea4336] via-[#4285f4] to-[#34a853] rounded-lg"></div>
                      <div className="absolute inset-[1px] bg-white rounded-lg p-3 flex items-center justify-center">
                        <img
                          src={sponsor.logo}
                          alt="Past Sponsor logo"
                          className="h-auto w-auto max-h-24 sm:max-h-20 object-contain hover:opacity-80 transition-opacity"
                        />
                      </div>
                    </div>
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
