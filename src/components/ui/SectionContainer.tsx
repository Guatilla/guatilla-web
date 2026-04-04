import React from "react";

interface SectionContainerProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  bgClass?: string;
}

export default function SectionContainer({
  children,
  className = "",
  id,
  bgClass = "bg-transparent",
}: SectionContainerProps) {
  return (
    <section id={id} className={`w-full py-24 md:py-32 ${bgClass} ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {children}
      </div>
    </section>
  );
}
