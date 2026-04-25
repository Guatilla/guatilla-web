import React from "react";

export type StatusType = "Completed" | "In Progress" | "Upcoming";

interface StatusBadgeProps {
  status: StatusType;
  className?: string;
}

export default function StatusBadge({ status, className = "" }: StatusBadgeProps) {
  const getStyles = () => {
    switch (status) {
      case "Completed":
        return "bg-brand-olive/10 text-brand-olive border-brand-olive/20";
      case "In Progress":
        return "bg-brand-terracotta/10 text-brand-terracotta border-brand-terracotta/20";
      case "Upcoming":
        return "bg-brand-coffee/10 text-brand-coffee/60 border-brand-coffee/10";
      default:
        return "bg-gray-100 text-gray-600 border-gray-200";
    }
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider border ${getStyles()} ${className}`}>
      {status}
    </span>
  );
}
