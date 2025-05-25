import AuthContent from "@/public/content/auth.json";
import { ReactNode } from "react";
import Layout from "../layout/Layout";

interface AuthLayoutProps {
  children: ReactNode;
  showBanner?: boolean;
  bannerTitle?: string;
  bannerDescription?: string;
  bannerImg?: string;
}

export default function AuthLayout({
  children,
  showBanner = true,
  bannerTitle = AuthContent.bannerTitle,
  bannerDescription = AuthContent.bannerDescription,
  bannerImg = AuthContent.bannerImg,
}: AuthLayoutProps) {
  return (
    <Layout>
      <section className="min-h-[calc(100vh-4rem)] w-full bg-gradient-to-b from-background to-secondary/20 container mx-auto px-4 md:px-12 py-14 relative z-10 pt-[10%]">
        <div className="w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-8 py-10 px-4 ">
          {showBanner && (
            <div className="hidden md:flex banner flex-col col-span-2 text-card-foreground p-8 rounded-xl space-y-6 justify-start">
              <h1
                className="text-4xl font-bold text-left bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent"
                dangerouslySetInnerHTML={{ __html: AuthContent.loginFormTitle }}
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
                <span className="text-white text-lg font-semibold">Login</span>
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
                      className="w-5 h-5 rounded-full flex items-center justify-center"
                    >
                      <img src={icon.src} alt={icon.alt} />
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-white dark:bg-black rounded-3xl p-8">
                {children}
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
