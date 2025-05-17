import React from "react";

interface HrWithImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  hrClassName?: string;
  imageClassName?: string;
}

const HrWithImage: React.FC<HrWithImageProps> = ({
  src,
  alt,
  width,
  height,
  className = "",
  hrClassName = "",
  imageClassName = "",
}) => {
  return (
    <div
      className={`flex flex-col md:flex-row items-center md:items-center justify-between my-8 ${className}`}
    >
      <div className="w-full flex items-center">
        <hr
          className={`w-full border-[1.2px] border-[--border] ${hrClassName}`}
        />
      </div>
      <div className="relative flex justify-end md:pr-0">
        <img
          src={src}
          alt={alt}
          width={width}
          height={height}
          style={{ maxWidth: "100%", height: "auto" }}
          loading="eager"
          className={imageClassName}
        />
      </div>
    </div>
  );
};

export default HrWithImage;
