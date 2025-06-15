"use client";

import { useState, useEffect } from "react";
import Button from "@/components/ui/Button";
import Card, { CardHeader, CardBody } from "@/components/ui/Card";
import { toast } from "sonner";
import { Download, QrCode, Image as ImageIcon } from "lucide-react";
import QRCode from "qrcode";

interface TicketTemplate {
  id: string;
  name: string;
  imageUrl: string;
  description: string;
}

const ticketTemplates: TicketTemplate[] = [
  {
    id: "template1",
    name: "Red Violet Classic",
    imageUrl: "/images/tickets/template1.svg",
    description: "Elegant red and violet design with white accents"
  },
  {
    id: "template2", 
    name: "Black Modern",
    imageUrl: "/images/tickets/template2.svg",
    description: "Modern black design perfect for concerts and events"
  },
  {
    id: "template3",
    name: "Beige Minimalist",
    imageUrl: "/images/tickets/template3.svg",
    description: "Minimalist beige design with black accents"
  }
];

// Simulate API call to get authenticator
const simulateAuthenticatorAPI = async (): Promise<string> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  return "111111";
};

export default function Tickets() {
  const [selectedTemplate, setSelectedTemplate] = useState<TicketTemplate | null>(null);
  const [qrCodeUrl, setQrCodeUrl] = useState<string>("");
  const [qrCodeDataURL, setQrCodeDataURL] = useState<string>("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [hasGeneratedQR, setHasGeneratedQR] = useState(false);

  // Generate QR code only once when component mounts
  useEffect(() => {
    if (!hasGeneratedQR) {
      generateQRCode();
    }
  }, []);

  // Generate QR code for user authentication (only once)
  const generateQRCode = async () => {
    if (hasGeneratedQR) {
      return; // Don't regenerate if already generated
    }

    setIsGenerating(true);
    try {
      // Simulate API call to get authenticator
      const authCode = await simulateAuthenticatorAPI();
      
      // Generate QR code with the authenticator
      const qrText = `CCD2025_${authCode}`;
      
      // Generate QR code as data URL using the library
      const dataURL = await QRCode.toDataURL(qrText, {
        width: 150,
        margin: 2,
        color: {
          dark: '#000000',
          light: '#FFFFFF'
        }
      });
      
      setQrCodeDataURL(dataURL);
      setQrCodeUrl(qrText); // Store the text for reference
      setHasGeneratedQR(true);
      toast.success("QR code generated successfully!");
    } catch (error) {
      toast.error("Failed to generate QR code");
      console.error("QR generation error:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  // Download the ticket with QR code
  const downloadTicket = async () => {
    if (!selectedTemplate || !qrCodeDataURL) {
      toast.error("Please select a template and ensure QR code is generated");
      return;
    }

    setIsDownloading(true);
    try {
      // Create a canvas to combine template and QR code
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      if (!ctx) {
        throw new Error("Canvas context not available");
      }

      // Set canvas size (adjust as needed)
      canvas.width = 800;
      canvas.height = 400;

      // Load template image
      const templateImg = new Image();
      
      templateImg.onload = () => {
        // Draw template background
        ctx.drawImage(templateImg, 0, 0, canvas.width, canvas.height);
        
        // Load and draw QR code
        const qrImg = new Image();
        
        qrImg.onload = () => {
          // Position QR code on the right side with margin
          const qrSize = 120;
          const margin = 20;
          const qrX = canvas.width - qrSize - margin;
          const qrY = (canvas.height - qrSize) / 2;
          
          // Draw QR code
          ctx.drawImage(qrImg, qrX, qrY, qrSize, qrSize);
          
          // Export the final canvas
          try {
            const dataURL = canvas.toDataURL("image/png", 0.9);
            const link = document.createElement("a");
            link.download = `ccd2025-ticket-${selectedTemplate.id}.png`;
            link.href = dataURL;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            toast.success("Ticket downloaded successfully!");
          } catch (error) {
            console.error("Download error:", error);
            toast.error("Failed to download ticket");
          }
        };
        
        qrImg.onerror = () => {
          toast.error("Failed to load QR code");
        };
        
        qrImg.src = qrCodeDataURL;
      };
      
      templateImg.onerror = () => {
        toast.error("Failed to load template image");
      };
      
      templateImg.src = selectedTemplate.imageUrl;
      
    } catch (error) {
      toast.error("Failed to download ticket");
      console.error("Download error:", error);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header description */}
      <div className="mb-4 sm:mb-6">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
          <div className="flex-1">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-2">
              Your Event Ticket
            </h1>
            <p className="text-xs sm:text-sm md:text-base text-muted-foreground max-w-2xl">
              Select a design and generate your personalized ticket with QR code authentication
            </p>
          </div>
          <div className="flex-shrink-0 flex justify-center md:justify-end">
            <img
              src="/images/elements/2025-black.svg"
              alt="CCD 2025"
              className="h-6 w-6 sm:h-8 sm:w-8 md:h-10 md:w-10 dark:invert"
            />
          </div>
        </div>
      </div>

      <hr className="mb-4 sm:mb-6" />

      {/* Template Selection */}
      <div className="mb-6 sm:mb-8">
        <h4 className="text-base sm:text-lg font-bold mb-3 sm:mb-4">Choose Your Ticket Design</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {ticketTemplates.map((template) => (
            <div 
              key={template.id}
              className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
                selectedTemplate?.id === template.id 
                  ? 'ring-2 ring-[#076eff] border-[#076eff]' 
                  : 'hover:border-gray-300'
              }`}
              onClick={() => {
                setSelectedTemplate(template);
              }}
            >
              <Card className="h-full">
                <CardHeader className="pb-2 sm:pb-3">
                  <h4 className="text-xs sm:text-sm font-medium">{template.name}</h4>
                </CardHeader>
                <CardBody className="pt-0">
                  <div className="relative aspect-[2/1] rounded-lg overflow-hidden mb-2 sm:mb-3">
                    <img
                      src={template.imageUrl}
                      alt={template.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src = '/images/placeholder-ticket.svg';
                      }}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">{template.description}</p>
                </CardBody>
              </Card>
            </div>
          ))}
        </div>
      </div>

      {/* Ticket Preview */}
      {selectedTemplate && (
        <div className="mb-6 sm:mb-8">
          <h4 className="text-base sm:text-lg font-bold mb-3 sm:mb-4">Preview Ticket</h4>
          <div className="border border-border rounded-lg bg-background p-3 sm:p-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 mb-3 sm:mb-4">
              <div className="flex items-center gap-2">
                <img
                  src="/images/elements/legal.svg"
                  alt="Ticket preview"
                  className="w-5 h-5 sm:w-6 sm:h-6"
                />
                <span className="font-bold text-foreground text-sm sm:text-base">
                  {selectedTemplate.name}
                </span>
              </div>
              <Button
                onClick={downloadTicket}
                disabled={!qrCodeDataURL || isDownloading}
                size="sm"
                className="bg-black hover:bg-gray-800 text-white dark:bg-white dark:hover:bg-gray-200 dark:text-black font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-xs sm:text-sm px-3 sm:px-4 py-2"
              >
                <img
                  src="/images/elements/gemini.svg"
                  alt="gemini"
                  className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 dark:invert"
                />
                {isDownloading ? "Downloading..." : "Download"}
                <img
                  src="/images/elements/gemini.svg"
                  alt="gemini"
                  className="w-3 h-3 sm:w-4 sm:h-4 ml-1 sm:ml-2 dark:invert"
                />
              </Button>
            </div>

            <div className="flex justify-center">
              <div className="relative group w-full max-w-4xl">
                {/* Ticket Preview */}
                <div className="relative aspect-[2/1] rounded-xl overflow-hidden shadow-lg border border-border transition-transform duration-300 group-hover:scale-[1.02]">
                  <img
                    src={selectedTemplate.imageUrl}
                    alt={selectedTemplate.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = '/images/placeholder-ticket.svg';
                    }}
                  />
                  
                  {/* QR Code Overlay */}
                  {qrCodeDataURL && (
                    <div className="absolute top-2 right-2 sm:top-4 sm:right-4 bg-white rounded-lg p-1 sm:p-2 shadow-md">
                      <img 
                        src={qrCodeDataURL} 
                        alt="QR Code" 
                        className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24"
                      />
                    </div>
                  )}
                  
                  {/* Loading Overlay */}
                  {isGenerating && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <div className="bg-white rounded-lg p-3 sm:p-4 flex items-center gap-2">
                        <div className="animate-spin rounded-full h-3 w-3 sm:h-4 sm:w-4 border-b-2 border-[#076eff]"></div>
                        <span className="text-xs sm:text-sm">Generating QR Code...</span>
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Ticket Info */}
                <div className="mt-3 sm:mt-4 text-center">
                  <h4 className="font-semibold text-sm sm:text-lg">{selectedTemplate.name}</h4>
                  <p className="text-xs sm:text-sm text-muted-foreground">{selectedTemplate.description}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Instructions */}
      <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3 sm:p-4">
        <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2 text-sm sm:text-base">How it works:</h4>
        <ul className="text-xs sm:text-sm text-blue-800 dark:text-blue-200 space-y-1">
          <li>• Select your preferred ticket design from the available templates</li>
          <li>• QR code is automatically generated once and reused for all templates</li>
          <li>• Preview your ticket with the QR code overlay</li>
          <li>• Download your personalized ticket with the QR code</li>
          <li>• Present this ticket at the event for entry verification</li>
        </ul>
      </div>
    </div>
  );
} 