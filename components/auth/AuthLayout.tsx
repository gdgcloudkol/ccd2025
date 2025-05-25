"use client"
import AuthContent from "@/public/content/auth.json";
import { ReactNode } from "react";
import Layout from "../layout/Layout";
import { usePathname } from "next/navigation";

interface AuthLayoutProps {
  children: ReactNode;
  showBanner?: boolean;
  bannerTitle?: string;
  bannerDescription?: string;
  bannerImg?: string;
  headerContent?: ReactNode;
}

export default function AuthLayout({
  children,
  showBanner = true,
  bannerTitle = AuthContent.bannerTitle,
  bannerDescription = AuthContent.bannerDescription,
  bannerImg = AuthContent.bannerImg,
  headerContent = <></>,
}: AuthLayoutProps) {

  let title="Welcome to GDG Cloud Kolkata"
  let description= "You can reach out to us at anytime via  <a style=\"color:#4285f4\" href=\"mailto:gdgcloudkol@gmail.com\">gdgcloudkol@gmail.com</a>"
  const pathname= usePathname()

  if(pathname=="/login")
    {
      title=AuthContent.loginFormTitle
      description= AuthContent.loginFormDescription
    }
 else if(pathname=="/signup")
  {
    title=AuthContent.signupFormTitle
    description= AuthContent.signupFormDescription
  }
  else if (pathname.includes("forgot")||pathname.includes("reset-password"))
    {
      title=AuthContent.resetFormTitle
      description= AuthContent.signupFormDescription
    }


  return (
    <Layout>
      <section className="min-h-[calc(100vh-4rem)] w-full container mx-auto px-4 md:px-12 py-14 relative z-10 pt-[10%] mt-10 lg:mt-0">
        <div className="w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-8 py-10 px-4 ">
          {showBanner && (
            <div className="hidden md:flex banner flex-col col-span-2 text-card-foreground p-8 rounded-xl space-y-6 justify-start">
              <h1
                className="text-4xl font-bold text-left bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent"
                dangerouslySetInnerHTML={{ __html: title }}
              />
              <p
                className="text-left text-muted-foreground text-lg"
                dangerouslySetInnerHTML={{
                  __html: AuthContent.loginFormDescription,
                }}
              />
            </div>
          )}
          <div
            className={
              showBanner ? "col-span-3" : "col-span-full max-w-2xl mx-auto"
            }
          >
            <div className="overflow-hidden border border-[var(--color-border)] bg-cfs-gradient rounded-3xl p-[1px] max-w-xl">
              <div className="rounded-t-3xl w-full h-12 bg-gradient-to-r from-[#ea4335] via-[#4285f4] to-[#34a853] flex items-center px-6 relative">
                <span className="text-white text-sm font-semibold">
                  {headerContent}
                </span>
                <div className="absolute right-6 flex items-center space-x-1">
                  {[
                    { src: "/images/elements/star.svg", alt: "star" },
                    { src: "/images/elements/smile.svg", alt: "smile" },
                    {
                      src: "/images/elements/circleStar.svg",
                      alt: "circleStar",
                    },
                    { src: "/images/elements/starOuter.svg", alt: "starOuter" },
                  ].map((icon, index) => (
                    <div
                      key={index}
                      className="size-4 rounded-full flex items-center justify-center"
                    >
                      <img src={icon.src} alt={icon.alt} />
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-white dark:bg-black rounded-3xl p-8 ">
                {children}
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
