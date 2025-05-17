"use client";

import React from "react";
import Header from "./Header";
import Footer from "./Footer";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col relative bg-[--background]">
      <div
        className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-5"
        style={{ backgroundImage: 'url("/map-bg.png")' }}
      />
      <Header />
      <main className="flex-grow relative z-1">{children}</main>
      <Footer />
    </div>
  );
}
