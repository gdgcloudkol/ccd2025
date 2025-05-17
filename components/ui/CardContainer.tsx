import React from "react";

interface HeaderIcon {
  src: string;
  alt: string;
}

interface CardContainerProps {
  children: React.ReactNode;
  headerTitle?: string | React.ReactNode;
  headerIcons?: HeaderIcon[];
  className?: string;
  maxWidth?: string;
}

const CardContainer: React.FC<CardContainerProps> = ({
  children,
  headerTitle,
  headerIcons = [
    { src: "/images/elements/star.svg", alt: "star" },
    { src: "/images/elements/smile.svg", alt: "smile" },
    { src: "/images/elements/circleStar.svg", alt: "circleStar" },
    { src: "/images/elements/starOuter.svg", alt: "starOuter" },
  ],
  className = "",
  maxWidth = "max-w-5xl",
}) => {
  return (
    <div
      className={`flex items-center justify-center p-4 relative ${className}`}
    >
      <div
        className={`w-full ${maxWidth} overflow-hidden border border-border bg-cfs-gradient  rounded-3xl p-[1px]`}
      >
        {/* Header with gradient */}
        <div className="relative h-16 flex items-center px-6">
          <div className="px-2 py-1 pb-5 rounded">
            {typeof headerTitle === "string" ? (
              <img src="/images/elements/2025.svg" alt="ccd year" />
            ) : (
              headerTitle
            )}
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

        <div className="bg-background rounded-3xl -mt-4">
          {/* Content wrapper */}
          <div className="p-4 pt-10">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default CardContainer;
