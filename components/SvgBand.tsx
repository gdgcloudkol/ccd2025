import React from "react";
import Marquee from "./ui/Marquee";

const bandItems = [
  { type: "text", content: "#Learn" },
  { type: "separator", src: "/images/elements/circleStar.svg" },
  { type: "text", content: "#Cloud" },
  { type: "separator", src: "/images/elements/starOuter.svg" },
  { type: "text", content: "#Connect" },
  { type: "separator", src: "/images/elements/smile.svg" },
  { type: "text", content: "#CCD2025" },
  { type: "separator", src: "/images/elements/gemini.svg" },
  { type: "text", content: "#Google" },
  { type: "separator", src: "/images/elements/star.svg" },
  { type: "text", content: "#Grow" },
  { type: "separator", src: "/images/elements/circleStar.svg" },
  { type: "text", content: "#Kolkata" },
  { type: "separator", src: "/images/elements/gemini.svg" },
];

interface SvgBandProps {
  className?: string;
  pauseOnHover?: boolean;
  reverse?: boolean;
}

const SvgBand: React.FC<SvgBandProps> = ({
  className = "",
  pauseOnHover = true,
  reverse = false,
}) => {
  return (
    <div className={`relative w-full overflow-hidden py-1 ${className}`}>
      <Marquee className="py-4" pauseOnHover={pauseOnHover} reverse={reverse}>
        {bandItems.map((item, index) => (
          <div key={index} className="mx-2 flex items-center justify-center">
            {item.type === "text" ? (
              <span className="text-white text-[22px] hover:scale-110 transition-all duration-300">
                {item.content}
              </span>
            ) : (
              <img
                src={item.src}
                alt={`Separator ${index}`}
                className="h-5 w-auto mx-1"
              />
            )}
          </div>
        ))}
      </Marquee>
    </div>
  );
};

export default SvgBand;
