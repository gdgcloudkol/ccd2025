"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Button from "@/components/ui/Button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/Textarea";
import CardContainer from "@/components/ui/CardContainer";
import Points from "./Points";
import LeaderBoard from "./LeaderBoard";

export default function ProfileCard() {
  const [activeTab, setActiveTab] = useState("My Profile");

  return (
    <div className="min-h-screen p-2 sm:p-4">
      <CardContainer
        headerTitle={
          <span className="text-white font-medium text-lg">My Profile</span>
        }
        maxWidth="max-w-2xl"
      >
        <div className="p-2 sm:p-4">
          {/* Profile header */}
          <div className="mb-8 flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-0">
            <div className="flex items-center gap-4">
              <div className="relative">
                <Avatar className="h-16 w-16 sm:h-20 sm:w-20">
                  <AvatarImage
                    src="/placeholder.svg?height=80&width=80"
                    alt="Profile"
                  />
                  <AvatarFallback>SR</AvatarFallback>
                </Avatar>
                <img
                  src="/images/profile/smile.png"
                  alt="Smile"
                  className="absolute -bottom-0 -right-1 h-5 w-5 sm:h-6 sm:w-6 rounded-full border-2 border-white dark:border-black"
                />
              </div>
              <div>
                <h2 className="text-lg sm:text-xl font-semibold text-foreground">
                  Smruti Ranjan Nayak
                </h2>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  Computer & Network Security
                </p>
              </div>
            </div>
            <div className="bg-[#076eff] hover:bg-[#076eff]/90 text-white px-4 sm:px-6 flex items-center gap-2 text-sm sm:text-base p-2 rounded-4xl">
              <img
                src="/images/cfs/circleStar.svg"
                alt="attendee badge"
                className="h-3 w-3 sm:h-4 sm:w-4"
              />
              <span>Attendee</span>
            </div>
          </div>

          {/* Navigation tabs */}
          <div className="mb-8 flex flex-wrap gap-2 sm:gap-6">
            {["My Profile", "Points", "Leaderboard"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3 py-1 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-colors ${
                  activeTab === tab
                    ? "bg-[#076eff] text-white dark:bg-[#076eff] dark:text-white"
                    : "text-[#676c72] hover:text-[#000000] dark:text-[#e5e7eb] dark:hover:text-white"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {activeTab === "My Profile" && (
            <>
              {/* Form fields */}
              <div className="space-y-4 sm:space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div className="space-y-2">
                    <Label
                      htmlFor="fullName"
                      className="text-xs sm:text-sm text-muted-foreground"
                    >
                      Full Name
                    </Label>
                    <Input
                      id="fullName"
                      placeholder="John Doe"
                      className="border-input focus:border-[#076eff] text-sm"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label
                      htmlFor="username"
                      className="text-xs sm:text-sm text-muted-foreground"
                    >
                      Username
                    </Label>
                    <Input
                      id="username"
                      placeholder="@username"
                      className="border-input focus:border-[#076eff] text-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div className="space-y-2">
                    <Label
                      htmlFor="email"
                      className="text-xs sm:text-sm text-muted-foreground"
                    >
                      Email Address
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your.email@example.com"
                      className="border-input focus:border-[#076eff] text-sm"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label
                      htmlFor="phone"
                      className="text-xs sm:text-sm text-muted-foreground"
                    >
                      Phone Number
                    </Label>
                    <Input
                      id="phone"
                      placeholder="+91 98765 43210"
                      className="border-input focus:border-[#076eff] text-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
                  <div className="space-y-2">
                    <Label
                      htmlFor="linkedin"
                      className="text-xs sm:text-sm text-muted-foreground"
                    >
                      LinkedIn
                    </Label>
                    <Input
                      id="linkedin"
                      placeholder="linkedin.com/in/username"
                      className="border-input focus:border-[#076eff] text-sm"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label
                      htmlFor="github"
                      className="text-xs sm:text-sm text-muted-foreground"
                    >
                      GitHub
                    </Label>
                    <Input
                      id="github"
                      placeholder="github.com/username"
                      className="border-input focus:border-[#076eff] text-sm"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label
                      htmlFor="twitter"
                      className="text-xs sm:text-sm text-muted-foreground"
                    >
                      Twitter
                    </Label>
                    <Input
                      id="twitter"
                      placeholder="twitter.com/username"
                      className="border-input focus:border-[#076eff] text-sm"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="about"
                    className="text-xs sm:text-sm text-muted-foreground"
                  >
                    About
                  </Label>
                  <Textarea
                    id="about"
                    placeholder="Tell us about yourself, your skills, and interests..."
                    className="min-h-[100px] sm:min-h-[120px] border-input focus:border-[#076eff] resize-none text-sm"
                  />
                </div>
              </div>

              {/* Save button */}
              <div className="mt-6 sm:mt-8">
                <Button className="bg-primary hover:bg-primary/90 text-white px-6 sm:px-8 text-sm sm:text-base flex items-center gap-2">
                  <img 
                    src="/images/cfs/gemini.svg"
                    alt=""
                    className="h-4 w-4"
                  />
                  Save
                  <img 
                    src="/images/cfs/gemini.svg"
                    alt=""
                    className="h-4 w-4"
                  />
                </Button>
              </div>
            </>
          )}

          {activeTab === "Points" && <Points />}

          {activeTab === "Leaderboard" && <LeaderBoard/>}
        </div>
      </CardContainer>
    </div>
  );
}