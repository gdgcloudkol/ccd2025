import React from "react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 py-16 relative overflow-hidden">
      {/* Cloud elements */}
      <img
        src="/images/elements/blue-cloud.png"
        alt="Cloud"
        className="absolute top-20 left-10 h-16 w-auto opacity-20"
      />
      <img
        src="/images/elements/blue-cloud.png"
        alt="Cloud"
        className="absolute bottom-20 right-10 h-20 w-auto opacity-20"
      />

      {/* Main content */}
      <div className="text-center relative z-10">
        <h1 className="text-8xl md:text-9xl font-extralight mb-4 text-[--black] dark:text-[--white]">
          404
        </h1>
        <h2 className="text-3xl md:text-4xl font-light mb-6 text-[--black] dark:text-[--white]">
          Something Exciting is Coming!
        </h2>
        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-12">
          While you're here, we're working on something amazing in the cloud!
          This page is just taking a quick detour before we launch our next big
          feature.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center bg-google-blue hover:bg-blue-700 text-[--white] font-medium py-3 px-8 rounded-lg transition-colors duration-200"
          >
            Return Home
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center border border-google-blue text-google-blue hover:bg-google-blue hover:text-[--white] font-medium py-3 px-8 rounded-lg transition-colors duration-200"
          >
            Stay Updated
          </Link>
        </div>
      </div>

      {/* Gradient background */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white dark:from-[#1a1a1a] to-transparent" />
    </div>
  );
}
