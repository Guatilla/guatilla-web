import React from "react";
import StatusBadge, { StatusType } from "./StatusBadge";

interface ProgressCardProps {
  title: string;
  description: string;
  status: StatusType;
  icon?: React.ReactNode;
}

export default function ProgressCard({ title, description, status, icon }: ProgressCardProps) {
  return (
    <div className="bg-white p-8 rounded-2xl shadow-sm border border-brand-coffee/5 flex flex-col h-full transition-all duration-300 hover:shadow-md">
      <div className="flex justify-between items-start mb-6">
        <div className="text-brand-terracotta bg-brand-linen p-3 rounded-xl">
          {icon}
        </div>
        <StatusBadge status={status} />
      </div>
      <div className="space-y-3 flex-grow">
        <h3 className="text-xl font-heading font-bold text-brand-coffee">{title}</h3>
        <p className="text-brand-coffee/70 font-light leading-relaxed text-sm">{description}</p>
      </div>
    </div>
  );
}
