"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeToggle from "../ui/ThemeToggle";
import Logo from "./Logo";
import { ArrowRight, LogOut, User } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import PrivateNav from "./PrivateNav";
import { UserData } from "@/types/login";
import LoadLink from "../blocks/LoadLink";
import FeatureRuleContent from "@/public/content/feature.rule.json";
import Button from "../ui/Button";
const ApplyLink = () => {
  return <LoadLink
    href="/apply"
    className="bg-primary text-primary-foreground p-3 px-6 rounded-full font-bold flex items-center whitespace-nowrap"
  >
    Apply for Tickets
    <ArrowRight className="w-4 h-4 ml-2" />
  </LoadLink>
}
const UserSection = () => {
  const [mounted, setMounted] = useState(false);
  const session = useSession()

  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted)
    return <ApplyLink />

  return session?.data?.user ? <PrivateNav user={session.data.user as unknown as UserData} /> : <LoadLink
    href="/login"
    className="bg-primary text-secondary p-3 px-6 rounded-full font-light flex items-center justify-between"
  >
    Login
    <span className="ml-2 bg-secondary text-primary rounded-full h-6 w-6 flex items-center justify-center text-xs">
      <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-log-in-icon lucide-log-in"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" /><polyline points="10 17 15 12 10 7" /><line x1="15" x2="3" y1="12" y2="12" /></svg>
    </span>
  </LoadLink>
}

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const currentPath = pathname;
  const session = useSession()

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-background p-3 fixed top-4 left-0 right-0 z-[999] w-11/12 xl:w-10/12 mx-auto rounded-full border border-border">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center gap-8">
            <div className="flex items-center xl:border-r pr-8 border-border">
              <Logo />
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {[
                { to: "/", label: "Home" },
                { to: "/speakers", label: "Speakers" },
                { to: "/schedule", label: "Schedule" },
                { to: "/team", label: "Team" },
              ].map(({ to, label }) => (
                <div key={to} className="flex flex-col items-center">
                  <Link
                    href={to}
                    className={`text-muted-foreground font-light hover:text-primary dark:font-bold transition-colors px-2`}
                  >
                    {label}
                  </Link>
                  {currentPath === to && (
                    <span className="absolute min-w-20 bottom-0 h-1.5 bg-google-blue rounded-t-full rounded-b-none"></span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Desktop Login Button and Theme Toggle */}
          <div className="hidden md:flex items-center space-x-4">
            <ThemeToggle />
            {FeatureRuleContent.navbar.navShowProfile ? <UserSection /> : <Link
              href="/apply"
              className="bg-primary text-primary-foreground p-3 px-6 rounded-full font-bold flex items-center whitespace-nowrap"
            >
              Apply for Tickets
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>}

          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="bg-primary text-primary-foreground p-3 rounded-full focus:outline-none transition-transform duration-300 hover:scale-105"
            >
              {isMenuOpen ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden absolute left-0 right-0 mt-2 bg-background rounded-2xl shadow-lg border border-border transform transition-all duration-300 ease-in-out ${isMenuOpen
              ? "opacity-100 translate-y-0 visible"
              : "opacity-0 -translate-y-2 invisible"
            }`}
        >
          <div className="p-6 space-y-6">
            <div className="flex flex-col space-y-4">
              <LoadLink
                href="/"
                className="text-foreground font-light hover:text-primary transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </LoadLink>
              <LoadLink
                href="/speakers"
                className="text-foreground hover:text-primary transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Speakers
              </LoadLink>

              <LoadLink
                href="/schedule"
                className="text-foreground hover:text-primary transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Schedule
              </LoadLink>
              <LoadLink
                href="/speakers"
                className="text-foreground hover:text-primary transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Speakers
              </LoadLink>
              <LoadLink
                href="/team"
                className="text-foreground hover:text-primary transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Team
              </LoadLink>
              {FeatureRuleContent.navbar.navShowProfile ? (
                <div onClick={() => setIsMenuOpen(false)}>
                  <UserSection />
                </div>
              ) : (
                <LoadLink
                  href="/apply"
                  className="bg-primary text-primary-foreground px-6 py-3 rounded-full font-bold  text-center mt-4 hover:opacity-90 transition-opacity flex items-center justify-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Apply for Tickets
                  <ArrowRight className="w-4 h-4 ml-2" />
                </LoadLink>
              )}
              <div className="border-t border-border mt-4 pt-4">
                <div className="flex items-center justify-between text-foreground py-2">
                  <span className="font-light">Theme</span>
                  <ThemeToggle />
                </div>
                {
                  session && session.data?.user && 
                  <Button variant="primary" className="!px-0 flex items-center justify-between text-foreground py-2 w-full z-[999]" onClick={signOut}>
                    <span className="font-light">Logout</span>
                    <LogOut className="size-5 ml-auto -translate-x-2" />
                  </Button>
                }

              </div>

            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
