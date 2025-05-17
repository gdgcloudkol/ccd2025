"use client";

import React from "react";
import Image from "next/image";

interface SocialLink {
  platform: string;
  url: string;
  username: string;
  icon: string;
}

interface SocialLinksProps {
  links: SocialLink[];
}

const SocialLinks: React.FC<SocialLinksProps> = ({ links }) => {
  return (
    <div className="w-full md:w-10/12 mx-auto grid grid-cols-2 lg:grid-cols-4 justify-center gap-4 mt-6 mb-10 px-4 lg:px-0">
      {links.map((link) => (
        <a
          key={link.platform}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className="relative flex items-center rounded-full px-4 sm:px-6 py-2 text-[--foreground] hover:shadow-md transition-all text-base sm:text-lg min-w-[140px] sm:min-w-[220px] justify-center gap-2"
        >
          <div className="absolute inset-0 rounded-full p-[0.5px] bg-gradient-to-r from-[--google-red] via-[--google-blue] via-[--google-yellow] to-[--google-green]">
            <div className="h-full w-full rounded-full bg-[--background]"></div>
          </div>
          <div className="relative flex items-center gap-1 sm:gap-2 font-light text-[--muted-foreground]">
            <Image
              src={link.icon}
              alt={link.platform}
              width={16}
              height={16}
              className="h-3 sm:h-4 w-auto dark:invert"
            />
            <span className="text-sm sm:text-base">{link.username}</span>
          </div>
        </a>
      ))}
    </div>
  );
};

export default SocialLinks;
