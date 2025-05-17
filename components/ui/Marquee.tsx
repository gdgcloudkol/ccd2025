import React, { ComponentPropsWithoutRef } from "react";

// Improved utility function to replace cn from utils
function classNames(
  ...classes: (
    | string
    | boolean
    | undefined
    | null
    | { [key: string]: boolean }
    | object
  )[]
): string {
  return classes
    .filter(Boolean)
    .map((entry) => {
      if (entry === null || entry === undefined) {
        return "";
      }
      if (typeof entry === "object") {
        return Object.entries(entry)
          .filter(([_, value]) => Boolean(value))
          .map(([key]) => key)
          .join(" ");
      }
      return String(entry);
    })
    .join(" ");
}

interface MarqueeProps extends ComponentPropsWithoutRef<"div"> {
  /**
   * Optional CSS class name to apply custom styles
   */
  className?: string;

  /**
   * Whether to reverse the animation direction
   * @default false
   */
  reverse?: boolean;

  /**
   * Whether to pause the animation on hover
   * @default false
   */
  pauseOnHover?: boolean;

  /**
   * Content to be displayed in the marquee
   */
  children: React.ReactNode;

  /**
   * Whether to animate vertically instead of horizontally
   * @default false
   */
  vertical?: boolean;

  /**
   * Number of times to repeat the content
   * @default 4
   */
  repeat?: number;
}

const Marquee: React.FC<MarqueeProps> = ({
  className,
  reverse = false,
  pauseOnHover = false,
  children,
  vertical = false,
  repeat = 4,
  ...props
}) => {
  return (
    <div
      {...props}
      className={classNames(
        "group flex overflow-hidden p-2 [--duration:40s] [--gap:1rem] [gap:var(--gap)] text-foreground",
        {
          "flex-row": !vertical,
          "flex-col": vertical,
        },
        className
      )}
    >
      {Array(repeat)
        .fill(0)
        .map((_, i) => (
          <div
            key={i}
            className={classNames(
              "flex shrink-0 justify-around [gap:var(--gap)] text-foreground",
              {
                "animate-marquee-rtl flex-row": !vertical && !reverse,
                "animate-marquee-ltr flex-row": !vertical && reverse,
                "animate-marquee-vertical flex-col": vertical,
                "group-hover:[animation-play-state:paused]": pauseOnHover,
              }
            )}
          >
            {children}
          </div>
        ))}
    </div>
  );
};

export default Marquee;
