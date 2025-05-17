import React from "react";

interface ContentParagraphProps {
  children?: React.ReactNode;
  className?: string;
  html?: string;
}

export function ContentParagraph({
  children,
  className = "",
  html,
}: ContentParagraphProps) {
  if (html) {
    return (
      <p
        className={`mb-6 text-[--muted-foreground] dark:text-[--muted] leading-relaxed whitespace-pre-line ${className} [&_a]:text-[--muted-foreground] [&_a]:underline [&_a]:font-medium hover:[&_a]:text-[--muted] dark:[&_a]:text-[--muted] dark:hover:[&_a]:text-[--muted-foreground]`}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    );
  }

  return (
    <p
      className={`mb-6 text-[--muted-foreground] dark:text-[--muted] leading-relaxed whitespace-pre-line ${className}`}
    >
      {children}
    </p>
  );
}
