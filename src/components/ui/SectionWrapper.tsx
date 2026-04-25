import React from "react";

interface SectionWrapperProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  bgClass?: string;
}

export default function SectionWrapper({
  children,
  className = "",
  id,
  bgClass = "bg-transparent",
}: SectionWrapperProps) {
  return (
    <section id={id} className={`w-full py-24 px-4 sm:px-6 lg:px-8 ${bgClass} ${className}`}>
      <div className="max-w-[1280px] mx-auto">
        {children}
      </div>
    </section>
  );
}
