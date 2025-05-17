import React from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ children, className = "" }) => {
  return (
    <div
      className={`bg-card text-card-foreground rounded-lg shadow-md overflow-hidden ${className}`}
    >
      {children}
    </div>
  );
};

export const CardHeader: React.FC<CardProps> = ({
  children,
  className = "",
}) => {
  return (
    <div className={`px-6 py-4 border-b border-border ${className}`}>
      {children}
    </div>
  );
};

export const CardBody: React.FC<CardProps> = ({ children, className = "" }) => {
  return <div className={`px-6 py-4 ${className}`}>{children}</div>;
};

export const CardFooter: React.FC<CardProps> = ({
  children,
  className = "",
}) => {
  return (
    <div className={`px-6 py-4 border-t border-border ${className}`}>
      {children}
    </div>
  );
};

export default Card;
