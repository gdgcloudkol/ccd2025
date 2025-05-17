import TextLoop from "@/components/ui/TextLoop";
import CONTENT from "../public/content/home.json";

const HeroSection2 = () => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center w-full relative">
      <div className="w-full md:w-[60%] p-4 ml-auto">
        <div className="w-full md:pr-4">
          <h2 className="text-2xl md:text-5xl font-bold mb-3 max-sm:w-32 text-[--foreground] flex flex-col xl:flex-row xl:items-center">
            <span>Hello to,</span>
            <TextLoop
              className="inline-block xl:ml-2 text-[var(--red50)]"
              interval={3}
              transition={{ duration: 0.5 }}
            >
              {CONTENT.hero2Marquee.map((phrase) => {
                return <span key={phrase}>{phrase}</span>;
              })}
            </TextLoop>
          </h2>
          <p className="text-base md:text-xl text-[--gray] dark:text-[--gray20] text-justify">
            {CONTENT.hero2Text}
          </p>
        </div>
      </div>
      <div className="hidden w-fit md:flex justify-end">
        <img
          src="/images/hero/hero2.png"
          alt="GDG Logo"
          className="h-auto w-[400px] object-contain"
        />
      </div>
    </div>
  );
};

export default HeroSection2;
