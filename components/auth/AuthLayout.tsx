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
    <section className="min-h-[calc(100vh-4rem)] w-full bg-gradient-to-b from-background to-secondary/20 container mx-auto px-4 md:px-12 py-14 relative z-10">
      <div className="w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-8 py-10 px-4">
        {showBanner && (
          <div className="hidden md:flex banner flex-col col-span-2 bg-card text-card-foreground p-8 rounded-xl shadow-lg space-y-6 border border-border">
            <h1
              className="text-4xl font-bold text-center bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent"
              dangerouslySetInnerHTML={{ __html: bannerTitle }}
            />
            <p className="text-center text-muted-foreground text-lg">
              {bannerDescription}
            </p>
            <div className="relative flex-1 min-h-[300px]">
              <img
                src={bannerImg}
                className="object-contain aspect-auto mx-auto w-full h-auto absolute inset-0"
                alt="Auth page banner"
              />
            </div>
          </div>
        )}
        <div className={`${showBanner ? 'col-span-3' : 'col-span-full max-w-2xl mx-auto'}`}>
          <div className="bg-card text-card-foreground p-8 rounded-xl shadow-lg border border-border">
            {children}
          </div>
        </div>
      </div>
    </section>
    </Layout>
  );
} 