"use client";

import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import Button from "@/components/ui/Button";

type FrameType = "attendee" | "team" | "speaker";

const YourFrame = () => {
  const squareCanvasRef = useRef<HTMLCanvasElement>(null);
  const circleCanvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [image, setImage] = useState<HTMLImageElement | null>(null);
  const [frameType, setFrameType] = useState<FrameType>("attendee");
  const [isLoading, setIsLoading] = useState(false);

  const searchParams = useSearchParams();

  const frameTypeConfig = useMemo(
    () => ({
      attendee: {
        title: "Attendee",
        color: "#4285f4",
        bgClass: "bg-google-blue",
        textClass: "text-google-blue",
        borderClass: "border-google-blue",
      },
      team: {
        title: "Team Member",
        color: "#34a853",
        bgClass: "bg-google-green",
        textClass: "text-google-green",
        borderClass: "border-google-green",
      },
      speaker: {
        title: "Speaker",
        color: "#ea4336",
        bgClass: "bg-google-red",
        textClass: "text-google-red",
        borderClass: "border-google-red",
      },
    }),
    []
  );

  useEffect(() => {
    if (searchParams.get("speaker") !== null) {
      setFrameType("speaker");
    } else if (searchParams.get("team") !== null) {
      setFrameType("team");
    } else {
      setFrameType("attendee");
    }
  }, [searchParams]);

  const uploadImage = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const handleImageUpload = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      if (!file.type.startsWith("image/")) {
        alert("Please select a valid image file");
        return;
      }

      setIsLoading(true);
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          setImage(img);
          setIsLoading(false);
        };
        img.onerror = () => {
          alert("Failed to load image");
          setIsLoading(false);
        };
        img.src = event.target?.result as string;
      };
      reader.readAsDataURL(file);
    },
    []
  );

  const drawSquareFrame = useCallback(
    (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
      canvas.width = 500;
      canvas.height = 500;

      if (!image) {
        const gradient = ctx.createLinearGradient(
          0,
          0,
          canvas.width,
          canvas.height
        );
        gradient.addColorStop(0, "#4285F41A");
        gradient.addColorStop(1, "#34A8531A");
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        return;
      }

      // Create a clipping path for the square frame area
      // This ensures the image only appears within the frame boundaries
      ctx.save();
      
      // Define the clipping area - adjust these values based on your SVG frame
      // You may need to adjust these margins to match your actual frame design
      const margin = 5; // Reduced margin for better fit
      const clipX = margin;
      const clipY = margin;
      const clipWidth = canvas.width - (margin * 2);
      const clipHeight = canvas.height - (margin * 2);
      
      ctx.beginPath();
      ctx.rect(clipX, clipY, clipWidth, clipHeight);
      ctx.clip();

      const hRatio = clipWidth / image.width;
      const vRatio = clipHeight / image.height;
      const ratio = Math.max(hRatio, vRatio);
      const x = clipX + (clipWidth - image.width * ratio) / 2;
      const y = clipY + (clipHeight - image.height * ratio) / 2;
      
      ctx.drawImage(
        image,
        0,
        0,
        image.width,
        image.height,
        x,
        y,
        image.width * ratio,
        image.height * ratio
      );
      
      ctx.restore();
    },
    [image]
  );

  const drawCircleFrame = useCallback(
    (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
      canvas.width = 500;
      canvas.height = 500;

      if (!image) {
        const gradient = ctx.createLinearGradient(
          0,
          0,
          canvas.width,
          canvas.height
        );
        gradient.addColorStop(0, "#4285F41A");
        gradient.addColorStop(1, "#34A8531A");
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        return;
      }

      ctx.save();
      ctx.beginPath();
      ctx.arc(
        canvas.width / 2,
        canvas.height / 2,
        canvas.width / 2,
        0,
        Math.PI * 2
      );
      ctx.closePath();
      ctx.clip();

      const hRatio = canvas.width / image.width;
      const vRatio = canvas.height / image.height;
      const ratio = Math.max(hRatio, vRatio);
      const x = (canvas.width - image.width * ratio) / 2;
      const y = (canvas.height - image.height * ratio) / 2;
      ctx.drawImage(
        image,
        0,
        0,
        image.width,
        image.height,
        x,
        y,
        image.width * ratio,
        image.height * ratio
      );
      ctx.restore();
    },
    [image]
  );

  const drawFrames = useCallback(() => {
    // Draw square Frame
    const squareCanvas = squareCanvasRef.current;
    if (squareCanvas) {
      const ctx = squareCanvas.getContext("2d");
      if (ctx) {
        ctx.clearRect(0, 0, squareCanvas.width, squareCanvas.height);

        const banner = new Image();
        banner.src = `/images/frames/${frameType}-square.svg`;
        banner.crossOrigin = "anonymous";

        const drawSquareFrameWithBanner = () => {
          drawSquareFrame(ctx, squareCanvas);
          if (banner.complete && banner.naturalWidth > 0) {
            const height = (banner.height / banner.width) * squareCanvas.width;
            const y = squareCanvas.height - height;
            ctx.drawImage(
              banner,
              0,
              0,
              banner.width,
              banner.height,
              0,
              y,
              squareCanvas.width,
              height
            );
          }
        };

        banner.onload = drawSquareFrameWithBanner;
        banner.onerror = () => drawSquareFrame(ctx, squareCanvas);
        if (banner.complete) drawSquareFrameWithBanner();
      }
    }

    // Draw circle Frame
    const circleCanvas = circleCanvasRef.current;
    if (circleCanvas) {
      const ctx = circleCanvas.getContext("2d");
      if (ctx) {
        ctx.clearRect(0, 0, circleCanvas.width, circleCanvas.height);

        const banner = new Image();
        banner.src = `/images/frames/${frameType}-circle.svg`;
        banner.crossOrigin = "anonymous";

        const drawCircleFrameWithBanner = () => {
          drawCircleFrame(ctx, circleCanvas);
          if (banner.complete && banner.naturalWidth > 0) {
            ctx.save();
            ctx.globalCompositeOperation = "source-over";
            const height = (banner.height / banner.width) * circleCanvas.width;
            const y = circleCanvas.height - height;
            ctx.drawImage(
              banner,
              0,
              0,
              banner.width,
              banner.height,
              0,
              y,
              circleCanvas.width,
              height
            );
            ctx.restore();
          }
        };

        banner.onload = drawCircleFrameWithBanner;
        banner.onerror = () => drawCircleFrame(ctx, circleCanvas);
        if (banner.complete) drawCircleFrameWithBanner();
      }
    }
  }, [frameType, drawSquareFrame, drawCircleFrame]);

  useEffect(() => {
    drawFrames();
  }, [drawFrames]);

  const downloadFrame = useCallback(
    (type: "square" | "circle") => {
      const canvas =
        type === "square" ? squareCanvasRef.current : circleCanvasRef.current;
      if (!canvas) return;

      const link = document.createElement("a");
      link.download = `ccd2025-${frameType}-${type}-Frame.png`;
      link.href = canvas.toDataURL("image/png", 0.9);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    },
    [frameType]
  );


  // Add these drag and drop handlers to your component
  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDragEnter = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    const files = e.dataTransfer.files;
    if (files && files[0]) {
      const file = files[0];

      if (!file.type.startsWith("image/")) {
        alert("Please select a valid image file");
        return;
      }

      setIsLoading(true);
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          setImage(img);
          setIsLoading(false);
        };
        img.onerror = () => {
          alert("Failed to load image");
          setIsLoading(false);
        };
        img.src = event.target?.result as string;
      };
      reader.readAsDataURL(file);
    }
  }, []);

  return (
    <div className="min-h-screen w-full mx-auto relative">
      <div className="flex items-center justify-center relative">
        <div className="w-full max-w-7xl">
          <div className="bg-background rounded-3xl">
            <div className="p-2 md:p-4 pt-10">
              {/* Header description */}
              <div className="mb-6">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  <div className="flex-1">
                    <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                      GCCD'25 Kolkata Frame
                    </h1>
                    <p className="text-sm md:text-base text-muted-foreground max-w-2xl">
                      Upload your profile picture and generate a social media
                      Frame for Cloud Community Day 2025
                    </p>
                  </div>
                  <div className="flex-shrink-0 flex justify-center md:justify-end">
                    <img
                      src="/images/elements/2025-black.svg"
                      alt="CCD 2025"
                      className="h-8 md:h-10 dark:invert"
                    />
                  </div>
                </div>
              </div>

              <hr className="mb-6" />

              {/* Upload Section */}
              <div className="mb-8">
                <h4 className="text-lg font-bold mb-4">Upload Image</h4>
                <div
                  className="border-2 border-dashed border-[#c2c2c2] rounded-lg p-12 text-center cursor-pointer hover:border-[#9aa0a6] transition-colors"
                  onClick={uploadImage}
                  onDragOver={handleDragOver}
                  onDragEnter={handleDragEnter}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                >
                  <div className="flex flex-col items-center gap-4">
                    <img
                      src="/images/elements/Upload-cloud.svg"
                      className="w-8 h-8"
                      alt="Upload"
                    />
                    <div>
                      <p className="text-[#676c72] font-medium">
                        {isLoading
                          ? "Processing..."
                          : "Drag and Drop - Choose Image"}
                      </p>
                      <p className="text-[#676c72] text-sm mt-1">
                          For best results use a 1:1 ratio picture
                      </p>
                    </div>
                  </div>
                </div>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </div>

              <div className="mb-6">
                <h4 className="text-lg font-bold mb-4">Preview Frame</h4>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Square Frame Preview */}
                <div className="border border-border rounded-lg bg-background p-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <img
                        src={`/images/elements/legal.svg`}
                        alt={`${frameType} square Frame`}
                        className="w-6 h-6"
                      />
                      <span className="font-bold text-foreground">
                        Square Frame
                      </span>
                    </div>
                    <Button
                      onClick={() => downloadFrame("square")}
                      disabled={!image}
                      size="sm"
                      className="bg-black hover:bg-gray-800 text-white dark:bg-white dark:hover:bg-gray-200 dark:text-black font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <img
                        src="/images/elements/gemini.svg"
                        alt="gemini"
                        className="w-4 h-4 mr-2 dark:invert"
                      />
                      Download
                      <img
                        src="/images/elements/gemini.svg"
                        alt="gemini"
                        className="w-4 h-4 ml-2 dark:invert"
                      />
                    </Button>
                  </div>

                  <div className="flex justify-center">
                    <div className="relative group">
                      <canvas
                        ref={squareCanvasRef}
                        className="w-full rounded-xl shadow-lg border border-border transition-transform duration-300 group-hover:scale-[1.02]"
                      />
                    </div>
                  </div>
                </div>

                {/* Circle Frame Preview */}
                <div className="border border-border rounded-lg bg-background p-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <img
                        src={`/images/elements/about.svg`}
                        alt={`${frameType} circle Frame`}
                        className="w-6 h-6"
                      />
                      <span className="font-bold text-foreground">
                        Circular Frame
                      </span>
                    </div>
                    <Button
                      onClick={() => downloadFrame("circle")}
                      disabled={!image}
                      size="sm"
                      className="bg-black hover:bg-gray-800 text-white dark:bg-white dark:hover:bg-gray-200 dark:text-black font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <img
                        src="/images/elements/gemini.svg"
                        alt="gemini"
                        className="w-4 h-4 mr-2 dark:invert"
                      />
                      Download
                      <img
                        src="/images/elements/gemini.svg"
                        alt="gemini"
                        className="w-4 h-4 ml-2 dark:invert"
                      />
                    </Button>
                  </div>

                  <div className="flex justify-center">
                    <div className="relative group">
                      <canvas
                        ref={circleCanvasRef}
                        className="w-full rounded-full shadow-lg border border-border transition-transform duration-300 group-hover:scale-[1.02]"
                      />      
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default YourFrame;