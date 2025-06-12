"use client";

import { useState } from "react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/UserAvatar";
import Button from "@/components/ui/Button";
import { Input } from "@/components/ui/input";
import CardContainer from "@/components/ui/CardContainer";
import Points from "./Points";
import LeaderBoard from "./LeaderBoard";
import { Session } from "next-auth";
import {
  Select,
  SelectLabel,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { extractGithubUsername } from "@/lib/utils";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { UserProfile } from "@/types/login";
import { SubmitHandler } from "react-hook-form";
import { useSession } from "next-auth/react";

type FormValues = {
  firstName: string;
  lastName: string;
  email?: string;
  company?: string;
  role?: string;
  pronoun?: string;
  phone?: string;
  college?: string;
  course?: string;
  graduation_year?: number;
  student?: boolean;
  twitter?: string;
  linkedin?: string;
  github?: string;
};

export default function ProfileCard({
  user,
  session,
}: {
  user: UserProfile;
  session: Session;
}) {
  const [activeTab, setActiveTab] = useState("My Profile");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const { update } = useSession();
  const formSchema = z.object({
    firstName: z.string().min(1, { message: "First name is required" }),
    lastName: z.string().min(1, { message: "Last name is required" }),
    email: z
      .string()
      .email({ message: "Invalid email address" })
      .default(session.user.email || ""),
    company: z.string().optional(),
    role: z.string().min(1, { message: "Role is required" }).optional(),
    pronoun: z.string().optional(),
    phone: z.string().optional(),
    college: z.string().optional(),
    course: z.string().optional(),
    graduation_year: z.number().optional(),
    student: z.boolean().default(false),
    twitter: z
      .string()
      .trim()
      .refine(
        (val) =>
          val === "" ||
          /^https?:\/\/(www\.)?(twitter\.com|x\.com)\/[A-Za-z0-9_]+\/?$/.test(
            val
          ),
        { message: "Invalid Twitter URL" }
      )
      .optional(),

    linkedin: z
      .string()
      .trim()
      .refine(
        (val) =>
          val === "" || /^https?:\/\/(www\.)?linkedin\.com\/.+$/.test(val),
        { message: "Invalid LinkedIn URL" }
      )
      .optional(),

    github: z
      .string()
      .trim()
      .refine(
        (val) => val === "" || /^https?:\/\/(www\.)?github\.com\/.+$/.test(val),
        { message: "Invalid GitHub URL" }
      )
      .optional(),
  });

  const form = useForm<FormValues, unknown, FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: user?.first_name || "",
      lastName: user?.last_name || "",
      email: session.user.email || "",
      company: user.company || "",
      role: user?.role || "",
      pronoun: user?.pronoun || "",
      phone: user?.phone || "",
      college: user?.college || "",
      course: user?.course || "",
      graduation_year: user?.graduation_year || undefined,
      student: user?.student ?? false,
      twitter: user?.socials?.twitter || "",
      linkedin: user?.socials?.linkedin || "",
      github: user?.socials?.github || "",
    },
  });

  const onError = (errors: any) => {
    console.error("Validation Errors:", errors);
  };
  const onSubmit: SubmitHandler<FormValues> = async (values) => {
    setIsSubmitting(true);

    const data = {
      first_name: values.firstName || "",
      last_name: values.lastName || "",
      email: values.email || "",
      company: values.company,
      role: values.role || "",
      pronoun: values.pronoun || "",
      phone: values.phone || "",
      college: values.college || "",
      course: values.course || "",
      graduation_year: values.graduation_year || undefined,
      student: values.student ?? false,
      socials: {
        twitter: values.twitter || "",
        linkedin: values.linkedin || "",
        github: values.github || "",
      },
    };

    try {
      const response = await fetch("/api/users", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Something went wrong");
      }
      toast("Profile updated successfully!");
      await update();
      router.refresh();
    } catch (error) {
      form.setError("root", {
        message:
          error instanceof Error ? error.message : "Something went wrong",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen p-2 sm:p-4 w-full mx-auto">
      <CardContainer
        headerTitle={
          <span className="text-white font-medium text-lg">My Profile</span>
        }
        maxWidth="max-w-5xl"
      >
        <div className="p-2 sm:p-4">
          {/* Profile header */}
          <div className="mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-0">
            <div className="flex items-center gap-4">
              <div className="relative">
                <Avatar className="h-16 w-16 sm:h-20 sm:w-20">
                  <AvatarImage
                    src={
                      user.socials?.github &&
                      `https://github.com/${extractGithubUsername(
                        user.socials?.github
                      )}.png`
                    }
                    alt={
                      (user.socials?.github &&
                        extractGithubUsername(user.socials?.github)) ||
                      "avatar"
                    }
                  />
                  <AvatarFallback>
                    {user?.first_name[0] || "A"}
                    {user?.last_name[0] || "W"}
                  </AvatarFallback>
                </Avatar>
                <img
                  src="/images/profile/smile.png"
                  alt="Smile"
                  className="absolute -bottom-0 -right-1 h-5 w-5 sm:h-6 sm:w-6 rounded-full border-2 border-white dark:border-black"
                />
              </div>
              <div>
                <h2 className="text-lg sm:text-xl font-semibold text-foreground">
                  {user?.first_name} {user.last_name}
                </h2>
                <div className="flex items-center gap-2">
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    {form.watch("student") ? "Student" : "Professional"}
                  </p>
                  <div className="h-1 w-1 rounded-full bg-muted-foreground"></div>
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    {form.watch("student")
                      ? form.watch("college")
                      : form.watch("company")}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4 flex-wrap-reverse">
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">
                  Professional
                </span>
                <Switch
                  checked={form.watch("student")}
                  onCheckedChange={(checked: boolean) => {
                    // Store current values before changing anything
                    const currentCompany = form.getValues("company");
                    const currentCollege = form.getValues("college");
                    form.setValue("student", checked, {
                      shouldDirty: true,
                      shouldTouch: true,
                      shouldValidate: true,
                    });

                    if (checked) {
                      // Switching to student mode
                      form.setValue("company", "", { shouldDirty: true });
                      form.setValue("role", "", { shouldDirty: true });

                      // If we have a value from the user object and current field is empty, restore it
                      if (user.college && !currentCollege) {
                        form.setValue("college", user.college, {
                          shouldDirty: true,
                        });
                      }
                    } else {
                      // Switching to professional mode
                      form.setValue("college", "", { shouldDirty: true });
                      form.setValue("course", "", { shouldDirty: true });
                      form.setValue("graduation_year", undefined, {
                        shouldDirty: true,
                      });

                      // If we have a value from the user object and current field is empty, restore it
                      if (user.company && !currentCompany) {
                        form.setValue("company", user.company, {
                          shouldDirty: true,
                        });
                      }
                    }
                  }}
                />
                <span className="text-sm text-muted-foreground">Student</span>
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
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit, onError)}
                className="space-y-4 sm:space-y-6"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem className="space-y-2">
                        <FormLabel className="text-xs sm:text-sm text-muted-foreground">
                          First Name
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="gdgcloudkol"
                            className="border-input focus:border-[#076eff] text-sm"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-xs text-red-500" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem className="space-y-2">
                        <FormLabel className="text-xs sm:text-sm text-muted-foreground">
                          Last Name
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Doe"
                            className="border-input focus:border-[#076eff] text-sm"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-xs text-red-500" />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <FormField
                    control={form.control}
                    name="pronoun"
                    render={({ field }) => (
                      <FormItem className="space-y-2">
                        <FormLabel className="text-xs sm:text-sm text-muted-foreground">
                          Pronouns
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select your pronoun" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectGroup>
                              {[
                                {
                                  value: "NA",
                                  display_name: "Prefer not to say",
                                },
                                { value: "she", display_name: "She/Her" },
                                { value: "he", display_name: "He/Him" },
                                { value: "they", display_name: "They/Them" },
                                { value: "other", display_name: "Other" },
                              ].map((e) => (
                                <SelectItem key={e.value} value={e.value}>
                                  {e.display_name}
                                </SelectItem>
                              ))}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                        <FormMessage className="text-xs text-red-500" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem className="space-y-2">
                        <FormLabel className="text-xs sm:text-sm text-muted-foreground">
                          Phone Number
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="+91 98765 43210"
                            className="border-input focus:border-[#076eff] text-sm"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-xs text-red-500" />
                      </FormItem>
                    )}
                  />
                </div>

                {form.watch("student") ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <FormField
                      control={form.control}
                      name="college"
                      render={({ field }) => (
                        <FormItem className="space-y-2">
                          <FormLabel className="text-xs sm:text-sm text-muted-foreground">
                            College
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Your College"
                              className="border-input focus:border-[#076eff] text-sm"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage className="text-xs text-red-500" />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="graduation_year"
                      render={({ field }) => (
                        <FormItem className="space-y-2">
                          <FormLabel className="text-xs sm:text-sm text-muted-foreground">
                            Graduation Year
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="2024"
                              className="border-input focus:border-[#076eff] text-sm"
                              {...field}
                              onChange={(e) =>
                                field.onChange(parseInt(e.target.value))
                              }
                            />
                          </FormControl>
                          <FormMessage className="text-xs text-red-500" />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={"course"}
                      render={({ field }) => (
                        <FormItem className="space-y-2">
                          <FormLabel className="text-xs sm:text-sm text-muted-foreground">
                            Course
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder={"Your Course"}
                              className="border-input focus:border-[#076eff] text-sm"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage className="text-xs text-red-500" />
                        </FormItem>
                      )}
                    />
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <FormField
                      control={form.control}
                      name="company"
                      render={({ field }) => (
                        <FormItem className="space-y-2">
                          <FormLabel className="text-xs sm:text-sm text-muted-foreground">
                            Company
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Your Company"
                              className="border-input focus:border-[#076eff] text-sm"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage className="text-xs text-red-500" />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={"role"}
                      render={({ field }) => (
                        <FormItem className="space-y-2">
                          <FormLabel className="text-xs sm:text-sm text-muted-foreground">
                            Role
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder={"Your Role"}
                              className="border-input focus:border-[#076eff] text-sm"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage className="text-xs text-red-500" />
                        </FormItem>
                      )}
                    />
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
                  <FormField
                    control={form.control}
                    name="linkedin"
                    render={({ field }) => (
                      <FormItem className="space-y-2">
                        <FormLabel className="text-xs sm:text-sm text-muted-foreground">
                          LinkedIn
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="linkedin.com/in/username"
                            className="border-input focus:border-[#076eff] text-sm"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-xs text-red-500" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="github"
                    render={({ field }) => (
                      <FormItem className="space-y-2">
                        <FormLabel className="text-xs sm:text-sm text-muted-foreground">
                          GitHub
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="github.com/username"
                            className="border-input focus:border-[#076eff] text-sm"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-xs text-red-500" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="twitter"
                    render={({ field }) => (
                      <FormItem className="space-y-2">
                        <FormLabel className="text-xs sm:text-sm text-muted-foreground">
                          Twitter
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="twitter.com/username"
                            className="border-input focus:border-[#076eff] text-sm"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-xs text-red-500" />
                      </FormItem>
                    )}
                  />
                </div>
                {form.formState.errors.root && (
                  <p className="text-sm text-red-500">
                    {form.formState.errors.root.message}
                  </p>
                )}

                {/* Save button */}
                <div className="mt-6 sm:mt-8">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-primary hover:bg-primary/90 text-white dark:text-black px-6 sm:px-8 text-sm sm:text-base flex items-center gap-2"
                    onClick={() => {
                      console.log({
                        college: form.getValues("college"),
                        company: form.getValues("company"),
                        course: form.getValues("course"),
                        email: form.getValues("email"),
                        firstName: form.getValues("firstName"),
                        lastName: form.getValues("lastName"),
                        github: form.getValues("github"),
                        graduation_year: form.getValues("graduation_year"),
                        linkedin: form.getValues("linkedin"),

                        phone: form.getValues("phone"),
                        pronoun: form.getValues("pronoun"),
                        role: form.getValues("role"),
                        student: form.getValues("student"),
                        twitter: form.getValues("twitter"),
                      });
                    }}
                  >
                    <img
                      src="/images/cfs/gemini.svg"
                      alt=""
                      className="size-4 dark:invert"
                    />
                    {isSubmitting ? "Saving..." : "Save"}
                    <img
                      src="/images/cfs/gemini.svg"
                      alt=""
                      className="size-4 dark:invert"
                    />
                  </Button>
                </div>
              </form>
            </Form>
          )}

          {activeTab === "Points" && <Points />}

          {activeTab === "Leaderboard" && <LeaderBoard />}
        </div>
      </CardContainer>
    </div>
  );
}
