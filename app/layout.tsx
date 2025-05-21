import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import "./globals.css";
import { ThemeProvider } from "next-themes";
import { LoadingContextProvider } from "./loading-provider";
import Header from "@/components/layout/Header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen`}
      >
        <LoadingContextProvider>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
        </LoadingContextProvider>
      </body>
    </html>
  );
}
