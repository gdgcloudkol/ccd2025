import CONTENT from "../public/content/home.json";
import GridBackgroud from "./ui/GridBackgroud";

const AboutFrame = () => {
  return (
    <section className="relative md:min-h-screen overflow-hidden z-10 text-[var(--foreground)]">
      <div className="md:px-32 px-4 py-16 max-w-6xl">
        <span className="md:text-[27px] text-[21px] text-justify text-[var(--foreground)]">
          {CONTENT.aboutText}
        </span>

        <div className="flex md:gap-16 gap-8 mt-8">
          {CONTENT.aboutStats.map((item) => (
            <div className="flex flex-col" key={item.name}>
              <span className="md:text-4xl text-[27px] w-1/3 text-[var(--foreground)]">
                {item.value.toLocaleString()}+
              </span>
              <span className="text-base text-[var(--muted-foreground)]">
                {item.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute md:right-16 md:-mt-28 -right-4 -mt-8">
        <img
          src="/images/about/star-blue.png"
          alt="About Frame"
          className="md:h-48 w-auto h-14 px-4"
        />
      </div>
      <div className="flex justify-center">
        <img
          src="/images/about/frame.png"
          alt="About Frame"
          className="md:h-[32rem] w-auto h-[12rem] px-4"
        />
      </div>

      <GridBackgroud className="grid-bg md:h-[25rem] h-[20rem] md:-mt-80 -mt-56 -z-10" />
    </section>
  );
};

export default AboutFrame;
