import type { ReactNode } from "react";

interface TeamSectionProps {
  title: string;
  description: string;
  children: ReactNode;
  cardColor: string;
  roleTitle: string;
}

export function TeamSection({
  title,
  description,
  children,
}: TeamSectionProps) {
  return (
    <section className="mb-16">
      <h2 className="text-3xl font-bold text-[--foreground] mb-2">{title}</h2>
      <p className="text-[--muted-foreground] mb-6 text-xl">{description}</p>
      {children}
    </section>
  );
}
