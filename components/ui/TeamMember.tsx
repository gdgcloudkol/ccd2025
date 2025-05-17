interface TeamMemberProps {
  person: {
    id: number;
    title: string;
    content: string;
    linkedin: string;
    twitter: string;
    image: string;
  };
  designation: string;
  cardColor: string;
  leadId: number[];
}

export function TeamMember(props: TeamMemberProps) {
  const leadId = props.leadId;
  const { id, title, content, image, twitter, linkedin } = props.person;
  const { cardColor, designation } = props;

  const availableSocials = [
    {
      platform: "linkedin",
      icon: "/images/socials/linkedin.svg",
      url: linkedin,
    },
    {
      platform: "twitter",
      icon: "/images/socials/x.svg",
      url: twitter,
    },
  ];

  return (
    <div
      className={`border-2 border-[#000] dark:border-[#fff] rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-shadow relative h-full flex flex-col 
      ${
        leadId.includes(id)
          ? "border-4 border-t-[var(--destructive)] border-b-[var(--blue50)] border-l-[var(--yellow50)] border-r-[var(--green50)]"
          : ""
      }
      `}
    >
      {/* Curvy Role Header */}
      <div
        className={`${cardColor} px-4 py-6 flex justify-between items-center rounded-t-lg relative`}
      >
        <span className="font-bold text-2xl text-[var(--primary-foreground)] mb-4">
          {leadId.includes(id) ? "Lead" : ""} {designation}
        </span>
        <img
          src="/images/elements/smile.svg"
          alt=""
          className="w-5 h-5 dark:invert mb-4"
        />
      </div>

      {/* Curvy Member Image */}
      <div className="bg-[var(--secondary)] dark:bg-[var(--muted)] lg:h-96 relative z-50 -mt-6 rounded-t-3xl overflow-hidden border-2 border-[#000] dark:border-[#fff]">
        <img
          src={image || "/placeholder.svg"}
          alt={title}
          className="object-cover h-full w-auto max-sm:object-contain"
        />
      </div>

      {/* Curvy Member Info */}
      <div className="p-4 bg-[var(--card)] dark:bg-[var(--muted)] rounded-t-3xl -mt-20 relative z-50 border-t-2 border-[#000] dark:border-[#fff] flex-grow flex flex-col">
        <h3 className="font-bold text-xl text-[var(--card-foreground)] dark:text-[var(--card-foreground)] line-clamp-1">
          {title}
        </h3>
        <p className="text-xl text-[var(--muted-foreground)] dark:text-[var(--muted-foreground)] mb-2 line-clamp-2 min-h-[2rem]">
          {content}
        </p>

        {/* Social Links */}
        <div className="mt-auto pt-3 flex gap-3">
          {availableSocials.map((link) => (
            <a
              key={link.platform}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-7 h-7 rounded-full bg-[var(--secondary)] dark:bg-[var(--primary)] hover:bg-[var(--muted)] dark:hover:bg-[var(--muted)] transition-colors border border-[#000] dark:border-[#fff]"
            >
              <img
                src={link.icon}
                alt={link.platform}
                className="w-4 h-4 dark:invert"
              />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TeamMember;