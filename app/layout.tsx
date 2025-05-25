import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { LoadingContextProvider } from "./loading-provider";

import { NextAuthProvider } from "./session-provider";
import { Toaster } from "@/components/ui/sonner"
const googleSans = localFont({
  src: [
    {
      path: "../public/fonts/GoogleSans-Regular.ttf",
      weight: "400",
    },
    {
      path: "../public/fonts/GoogleSans-Medium.ttf",
      weight: "600",
    },
    {
      path: "../public/fonts/GoogleSans-Bold.ttf",
      weight: "700",
    },
  ],
  variable: "--font-google",
});
export const metadata: Metadata = {
  title: "Cloud Community Day 2025",
  description:
    "Cloud Community Day 2025 - The flagship annual gathering of cloud professionals",
  keywords:
    "Cloud, Community, Day, 2025, Conference, Technology, CCD, GCCD, CCD 2025, GDG, Google Developer Groups, GDGCK, GDG Cloud, GDG India, GDG Cloud Kolkata",
  authors: [{ name: "GDG Cloud Kolkata" }],
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="UTF-8" />
      </head>
      <body
        className={`${googleSans.className}  antialiased min-h-screen`}
      >
        <LoadingContextProvider>
          <NextAuthProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              {children}
              <Toaster />
            </ThemeProvider>
          </NextAuthProvider>
        </LoadingContextProvider>
      </body>
    </html>
  );
}
