import { cn } from "@/lib/utils";

interface ISectionPropsTypes {
  title: string;
  description: string;
  color: string;
}

export default function AlternateHeader({
  title,
  description,
  color,
}: ISectionPropsTypes) {
  const TextColorMap: { [key: string]: string } = {
    blue: "text-blue-600",
    red: "text-red-600",
    yellow: "text-yellow-600",
    green: "text-green-600",
  };
  const colorClass = TextColorMap[color] || "";
  return (
    <div className='flex flex-col items-center justify-center max-w-4xl mx-auto text-center gap-2 px-4'>
      <h2
        className={cn("text-3xl md:text-4xl lg:text-5xl font-bold", colorClass)}
      >
        {title}
      </h2>
      <h6
        className='font-normal w-full'
        dangerouslySetInnerHTML={{ __html: description }}
      ></h6>
    </div>
  );
} 