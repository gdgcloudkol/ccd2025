"use client";

import React, { useEffect, useState } from "react";

interface Speaker {
  id: string;
  fullName: string;
  tagLine: string;
  bio: string;
  profilePicture: string;
  links?: { title: string; url: string; linkType: string }[];
}

const socialIcon = (type: string) => {
  if (type === "LinkedIn") return "/images/socials/linkedin.svg";
  if (type === "Twitter" || type === "X") return "/images/socials/x.svg";
  return null;
};

const SpeakersSection: React.FC = () => {
  const [speakers, setSpeakers] = useState<Speaker[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [dialogSpeaker, setDialogSpeaker] = useState<Speaker | null>(null);

  useEffect(() => {
    const fetchSpeakers = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(
          "https://sessionize.com/api/v2/pkltj8cb/view/Speakers"
        );
        if (!res.ok) throw new Error("Failed to fetch speakers");
        const data = await res.json();
        setSpeakers(
          data.map((s: any) => ({
            id: s.id,
            fullName: s.fullName,
            tagLine: s.tagLine,
            bio: s.bio,
            profilePicture: s.profilePicture,
            links: s.links,
          }))
        );
      } catch (e: any) {
        setError(e.message || "Failed to load speakers");
      } finally {
        setLoading(false);
      }
    };
    fetchSpeakers();
  }, []);

  return (
    <section className="py-8 sm:py-12 lg:py-16 px-3 sm:px-6 lg:px-8">
      {/* Hidden Guest Speaker Section */}
      <div hidden>
        <div className="mb-10">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 text-black dark:text-white">
            Guest Speaker
          </h2>
          <div className="flex justify-start">
            <div className="max-w-md w-full">
              <div className="flex flex-col md:flex-row items-center p-6 bg-white rounded-xl shadow-sm">
                <div
                  className="w-32 h-32 bg-gray-200 rounded-lg mr-6 mb-4 md:mb-0 bg-center bg-cover"
                  style={{
                    backgroundImage: "url(/images/speakers/sample-guest.jpg)",
                  }}
                />
                <div>
                  <h3 className="text-lg font-semibold mb-1">Guest Name</h3>
                  <p className="text-sm text-gray-500 mb-2">
                    Guest Designation
                  </p>
                  <p className="text-sm text-gray-500">Guest</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Speakers Section */}
      <div className="mb-6 text-start">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 text-black dark:text-white">
          Our Amazing Speakers
        </h2>
        <p className="text-base text-gray-500 max-w-2xl">
          Discover our amazing speakers for the final day of GCCD Kolkata 2025
        </p>
      </div>
      {loading ? (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-gray-300"></div>
        </div>
      ) : error ? (
        <div className="text-center text-red-500 py-8">{error}</div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
          {speakers.map((speaker) => (
            <div
              key={speaker.id}
              className="rounded-xl border border-black/80 bg-white flex flex-col p-0 overflow-hidden min-h-[180px]"
              style={{ boxShadow: "0 0 0 1.5px #000" }}
            >
              <div className="flex items-center justify-between bg-[#101828] px-4 py-2">
                <span className="text-white text-base font-medium">
                  Speaker
                </span>
                <img
                  src="/images/elements/resources-speaker.svg"
                  alt=""
                  className="w-5 h-5 dark:invert"
                />
              </div>
              <div className="flex flex-row items-center gap-4 px-4 py-4">
                <div
                  className="w-40 h-40 rounded-lg bg-gray-200 flex-shrink-0 bg-center bg-cover border-2 border-black/80"
                  style={{ backgroundImage: `url(${speaker.profilePicture})` }}
                />
                <div className="flex-1 flex flex-col justify-between min-w-0 h-full">
                  <div>
                    <div className="text-lg font-semibold text-black mb-1 truncate">
                      {speaker.fullName}
                    </div>
                    <div className="text-sm text-gray-700 mb-1 truncate">
                      {speaker.tagLine}
                    </div>
                    <div className="text-sm text-gray-500 mb-2 flex items-center">
                      <div
                        className="line-clamp-1"
                        style={{ maxWidth: "100%" }}
                      >
                        {speaker.bio}
                      </div>
                      {speaker.bio && (
                        <button
                          className="ml-2 text-blue-600 text-xs underline whitespace-nowrap"
                          onClick={() => setDialogSpeaker(speaker)}
                        >
                          Read more
                        </button>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-row items-center gap-2 mt-1 mb-4">
                    {speaker.links &&
                      speaker.links.map((link) =>
                        link.linkType === "LinkedIn" ||
                        link.linkType === "Twitter" ||
                        link.linkType === "X" ? (
                          <a
                            key={link.url}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center"
                          >
                            <img
                              src={socialIcon(link.linkType) || ""}
                              alt={link.linkType}
                              className="w-5 h-5"
                            />
                          </a>
                        ) : null
                      )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {dialogSpeaker && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-xl shadow-lg max-w-lg w-full p-6 relative">
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-black text-xl"
              onClick={() => setDialogSpeaker(null)}
              aria-label="Close"
            >
              &times;
            </button>
            <div className="flex flex-col items-center">
              <div
                className="w-32 h-32 rounded-lg bg-gray-200 bg-center bg-cover border-2 border-black/80 mb-4"
                style={{
                  backgroundImage: `url(${dialogSpeaker.profilePicture})`,
                }}
              />
              <div className="text-xl font-bold mb-1 text-center">
                {dialogSpeaker.fullName}
              </div>
              <div className="text-base text-gray-700 mb-2 text-center">
                {dialogSpeaker.tagLine}
              </div>
              <div className="text-gray-600 text-center whitespace-pre-line">
                {dialogSpeaker.bio}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default SpeakersSection;
