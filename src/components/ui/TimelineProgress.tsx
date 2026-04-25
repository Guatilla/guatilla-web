import React from "react";
import StatusBadge, { StatusType } from "./StatusBadge";

interface TimelineProgressItem {
  title: string;
  description: string;
  status: StatusType;
}

interface TimelineProgressProps {
  items: TimelineProgressItem[];
}

export default function TimelineProgress({ items }: TimelineProgressProps) {
  return (
    <div className="relative space-y-8 before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-brand-terracotta before:via-brand-olive before:to-brand-coffee/10">
      {items.map((item, index) => (
        <div key={index} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
          {/* Dot */}
          <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
             <div className={`w-3 h-3 rounded-full ${
               (item.status === "Completed" || item.status === "Fullført") ? "bg-brand-olive" : 
               (item.status === "In Progress" || item.status === "Pågående" || item.status === "Under utvikling" || item.status === "Under forberedelse") ? "bg-brand-terracotta animate-pulse" : 
               "bg-brand-coffee/20"
             }`} />
          </div>
          {/* Card */}
          <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white p-6 rounded-2xl shadow-sm border border-brand-coffee/5 transition-all duration-300 hover:shadow-md">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
              <h4 className="font-heading font-bold text-lg text-brand-coffee">{item.title}</h4>
              <StatusBadge status={item.status} />
            </div>
            <p className="text-sm text-brand-coffee/70 font-light leading-relaxed">{item.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
