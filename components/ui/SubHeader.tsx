import type React from "react";

interface SubHeaderProps {
  children: React.ReactNode;
  className?: string;
}

export function SubHeader({ children, className = "" }: SubHeaderProps) {
  return (
    <h2
      className={`text-2xl font-bold text-[--foreground] mb-4 py-2 ${className}`}
    >
      {children}
    </h2>
  );
}
