import React from "react";

export type StatusType = 
  | "Completed" | "In Progress" | "Upcoming" 
  | "Completado" | "En desarrollo" | "En preparación" | "Próximamente" | "Terminado" | "En curso"
  | "Fullført" | "Pågående" | "Under forberedelse" | "Under utvikling" | "Kommer snart";

interface StatusBadgeProps {
  status: StatusType;
  className?: string;
}

export default function StatusBadge({ status, className = "" }: StatusBadgeProps) {
  const getStyles = () => {
    switch (status) {
      case "Completed":
      case "Completado":
      case "Terminado":
      case "Fullført":
        return "bg-brand-olive/10 text-brand-olive border-brand-olive/20";
      case "In Progress":
      case "En desarrollo":
      case "En preparación":
      case "En curso":
      case "Pågående":
      case "Under utvikling":
      case "Under forberedelse":
        return "bg-brand-terracotta/10 text-brand-terracotta border-brand-terracotta/20";
      case "Upcoming":
      case "Próximamente":
      case "Kommer snart":
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
