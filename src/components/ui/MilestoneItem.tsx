import React from "react";
import { CheckCircle2, CircleDashed, Circle } from "lucide-react";
import StatusBadge, { StatusType } from "./StatusBadge";

interface MilestoneItemProps {
  title: string;
  status: StatusType;
}

export default function MilestoneItem({ title, status }: MilestoneItemProps) {
  const getIcon = () => {
    switch (status) {
      case "Completed":
        return <CheckCircle2 className="text-brand-olive shrink-0" size={20} />;
      case "In Progress":
        return <CircleDashed className="text-brand-terracotta shrink-0 animate-spin-slow" size={20} />;
      case "Upcoming":
        return <Circle className="text-brand-coffee/20 shrink-0" size={20} />;
    }
  };

  return (
    <div className="flex items-center justify-between p-4 bg-white/50 rounded-xl border border-brand-coffee/5 hover:bg-white transition-colors group">
      <div className="flex items-center gap-4">
        {getIcon()}
        <span className={`font-medium ${status === "Upcoming" ? "text-brand-coffee/40" : "text-brand-coffee"}`}>
          {title}
        </span>
      </div>
      <StatusBadge status={status} className="hidden sm:inline-flex" />
    </div>
  );
}
