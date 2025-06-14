"use client";

import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import Button from "@/components/ui/Button";
import {
  Download,
  Upload,
  ImageIcon,
  Sparkles,
} from "lucide-react";
import CardContainer from "@/components/ui/CardContainer";

type FrameType = "attendee" | "team" | "speaker";
type ShapeType = "original" | "square";

const MakeAFrame = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [image, setImage] = useState<HTMLImageElement | null>(null);
  const [shape, setShape] = useState<ShapeType>("original");
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

  const drawImage = useCallback(
    (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
      if (!image) {
        canvas.width = 500;
        canvas.height = 500;
        const gradient = ctx.createLinearGradient(
          0,
          0,
          canvas.width,
          canvas.height
        );
        gradient.addColorStop(0, "#4285f4");
        gradient.addColorStop(1, "#3367d6");
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        return;
      }

      switch (shape) {
        case "original":
          canvas.width = image.width;
          canvas.height = image.height;
          ctx.drawImage(image, 0, 0);
          break;
        case "square":
          canvas.width = 500;
          canvas.height = 500;
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
          break;
      }
    },
    [image, shape]
  );

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const banner = new Image();
    banner.src = `/images/frames/${frameType}.png`;
    banner.crossOrigin = "anonymous";

    const drawFrame = () => {
      drawImage(ctx, canvas);

      if (banner.complete && banner.naturalWidth > 0) {
        const height = (banner.height / banner.width) * canvas.width;
        const y = canvas.height - height;
        ctx.drawImage(
          banner,
          0,
          0,
          banner.width,
          banner.height,
          0,
          y,
          canvas.width,
          height
        );
      }
    };

    banner.onload = drawFrame;
    banner.onerror = () => drawImage(ctx, canvas);

    if (banner.complete) drawFrame();
  }, [frameType, drawImage]);

  useEffect(() => {
    draw();
  }, [draw]);

  const downloadImage = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const link = document.createElement("a");
    link.download = `ccd2025-${frameType}-badge.png`;
    link.href = canvas.toDataURL("image/png", 0.9);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, [frameType]);

  const changeShape = useCallback((newShape: ShapeType) => {
    setShape(newShape);
  }, []);

  const currentConfig = frameTypeConfig[frameType];

  return (
    <div className="min-h-screen w-full mx-auto relative">
      <div className="flex items-center justify-center relative">
        <div className="w-full max-w-6xl overflow-hidden bg-gradient-to-r from-[#ea4336] via-[#4285f4] to-[#34a853] rounded-3xl p-[1px]">
          {/* Main content area */}
          <div className="bg-background rounded-3xl">
            <div className="p-2 md:p-4 pt-10">
              {/* Header description */}
              <div className="mb-6 text-center">
                <div className="flex items-center justify-center gap-2 mb-3">
                  <img
                    src="/images/elements/2025-black.svg"
                    alt="ccd year"
                    className="h-8 dark:invert"
                  />
                </div>
                <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
                  Upload your profile picture and generate a social media badge
                  for Cloud Community Day 2025
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Controls Panel */}
                <div className="space-y-6">
                  {/* Upload Section */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 mb-3">
                      <ImageIcon
                        className={`w-4 h-4 ${currentConfig.textClass}`}
                      />
                      <h4 className="font-medium text-foreground">
                        Upload Image
                      </h4>
                    </div>

                    <Button
                      onClick={uploadImage}
                      disabled={isLoading}
                      variant="outline"
                      className={`w-full h-12 ${currentConfig.borderClass} hover:${currentConfig.bgClass} hover:text-white transition-all duration-200`}
                    >
                      {isLoading ? (
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                          Processing...
                        </div>
                      ) : (
                        <>
                          <Upload className="w-4 h-4 mr-2" />
                          Choose Image
                        </>
                      )}
                    </Button>

                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />

                    <p className="text-xs text-muted-foreground text-center">
                      Support: JPG, PNG, WebP (Max 10MB)
                    </p>
                  </div>

                  {/* Shape Selection */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 mb-3">
                      <Sparkles className="w-4 h-4 text-google-yellow" />
                      <h4 className="font-medium text-foreground">
                        Image Shape
                      </h4>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      {(["original", "square"] as const).map((shapeOption) => (
                        <button
                          key={shapeOption}
                          onClick={() => changeShape(shapeOption)}
                          className={`group relative p-4 rounded-lg border-2 transition-all duration-200 text-center overflow-hidden ${
                            shape === shapeOption
                              ? `${currentConfig.borderClass} ${currentConfig.textClass} bg-muted/50 shadow-lg`
                              : "border-muted hover:border-muted-foreground text-muted-foreground hover:shadow-md"
                          }`}
                        >
                          {/* Google Colors Gradient Background for Selected State */}
                          {shape === shapeOption && (
                            <div className="absolute inset-0 bg-gradient-to-r from-[#ea4336] via-[#4285f4] to-[#34a853] opacity-10 rounded-lg"></div>
                          )}

                          {/* Shape Icon with Google Colors */}
                          <div className="relative z-10">
                            <div className="w-8 h-8 mx-auto mb-3 relative">
                              {/* Gradient Border Effect */}
                              <div className="absolute inset-0 bg-gradient-to-r from-[#ea4336] via-[#4285f4] to-[#34a853] rounded-lg p-[1px]">
                                <div
                                  className={`bg-background h-full w-full flex items-center justify-center ${
                                    shapeOption === "square"
                                      ? "rounded-lg"
                                      : "rounded-full"
                                  }`}
                                >
                                  {/* Inner shape with Google color based on selection */}
                                  <div
                                    className={`w-4 h-4 transition-all duration-200 ${
                                      shapeOption === "square"
                                        ? "rounded bg-gradient-to-br from-google-blue to-google-green"
                                        : "rounded-full bg-gradient-to-br from-google-red to-google-yellow"
                                    } ${
                                      shape === shapeOption
                                        ? "scale-110 shadow-sm"
                                        : "group-hover:scale-105"
                                    }`}
                                  />
                                </div>
                              </div>
                            </div>

                            <span
                              className={`text-sm font-medium capitalize transition-colors duration-200 ${
                                shape === shapeOption
                                  ? currentConfig.textClass
                                  : "text-muted-foreground group-hover:text-foreground"
                              }`}
                            >
                              {shapeOption}
                            </span>
                          </div>

                          {/* Selection Indicator */}
                          {shape === shapeOption && (
                            <div
                              className={`absolute -top-1 -right-1 w-4 h-4 rounded-full ${currentConfig.bgClass} border-2 border-white shadow-sm flex items-center justify-center`}
                            >
                              <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                            </div>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Download Button */}
                  <Button
                    onClick={downloadImage}
                    className={`w-full h-12 ${currentConfig.bgClass} hover:opacity-90 text-white font-medium transition-all duration-200`}
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download Badge
                  </Button>
                </div>

                {/* Preview Panel */}
                <CardContainer
                  headerTitle={
                    <div className="flex items-center gap-2">
                      <span className="text-white font-medium text-lg">
                         Preview
                      </span>
                    </div>
                  }
                  className="p-0 m-0"
                >
                  {/* Preview container */}
                  <div className="relative bg-muted/30 rounded-2xl flex items-center justify-center">
                    {image ? (
                      <div className="relative group">
                        <canvas
                          ref={canvasRef}
                          className="max-w-full rounded-xl shadow-2xl border-2 border-white transition-transform duration-300 group-hover:scale-[1.02]"
                        />
                        {/* Frame type badge */}
                        <div
                          className={`absolute -bottom-3 -right-3 px-3 py-1 rounded-full text-sm font-medium text-white shadow-xl ${currentConfig.bgClass} border-2 border-white`}
                        >
                          {currentConfig.title}
                        </div>
                        {/* CCD 2025 badge */}
                        <div className="absolute -bottom-3 -left-3 px-2 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-google-blue to-google-green text-white shadow-lg border-2 border-white">
                          CCD 2025
                        </div>
                      </div>
                    ) : (
                      <div className="text-center max-w-md">
                        <div className="text-center max-w-md">
                          <div
                            className="relative mb-8 cursor-pointer group transition-all duration-200 hover:scale-105"
                            onClick={uploadImage}
                          >
                            {/* Upload placeholder with decorative border */}
                            <div className="w-24 h-24 mx-auto mb-6 relative">
                              <div className="absolute inset-0 bg-gradient-to-r from-[#ea4336] via-[#4285f4] to-[#34a853] rounded-2xl p-[2px] group-hover:shadow-lg transition-shadow duration-200">
                                <div className="bg-background rounded-2xl h-full w-full flex items-center justify-center group-hover:bg-muted/50 transition-colors duration-200">
                                  <ImageIcon className="w-12 h-12 text-muted-foreground group-hover:text-foreground transition-colors duration-200" />
                                </div>
                              </div>
                            </div>
                            {/* Dashed border overlay */}
                            <div className="absolute inset-0 border-2 border-dashed border-muted-foreground/30 rounded-2xl group-hover:border-muted-foreground/50 transition-colors duration-200"></div>
                          </div>

                          <h4 className="text-xl font-semibold text-foreground mb-2">
                            Upload Your Photo
                          </h4>
                          <p className="text-muted-foreground mb-4">
                            Your personalized{" "}
                            <span
                              className={`font-medium ${currentConfig.textClass}`}
                            >
                              {currentConfig.title}
                            </span>{" "}
                            badge will appear here
                          </p>
                          <p className="text-xs text-muted-foreground/70 mb-4">
                            💡 Click on the icon above to select an image
                          </p>

                          {/* Feature highlights */}
                          <div className="flex items-center justify-center gap-4 mt-6">
                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                              <div className="w-2 h-2 rounded-full bg-google-blue"></div>
                              <span>High Quality</span>
                            </div>
                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                              <div className="w-2 h-2 rounded-full bg-google-green"></div>
                              <span>Social Ready</span>
                            </div>
                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                              <div className="w-2 h-2 rounded-full bg-google-red"></div>
                              <span>CCD 2025</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContainer>
              </div>

              {/* Footer */}
              <div className="mt-8 text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <img
                    src="/images/elements/smile.svg"
                    alt="smile"
                    className="w-5 h-5"
                  />
                  <span className="text-lg">🎉</span>
                  <img
                    src="/images/elements/star.svg"
                    alt="star"
                    className="w-4 h-4"
                  />
                </div>
                <a
                  href="https://ccd2025.gdgcloudkol.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-google-blue hover:opacity-80 font-medium transition-opacity duration-200"
                >
                  Cloud Community Day Kolkata 2025
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MakeAFrame;
