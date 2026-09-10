import React from "react";
import Heading from "../ui/Heading";
import Text from "../ui/Text";

interface SectionHeaderProps {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: "left" | "center";
  className?: string;
}

export default function SectionHeader({
  eyebrow,
  title,
  description,
  align = "center",
  className = "",
}: SectionHeaderProps) {
  const isCenter = align === "center";

  return (
    <div className={`${isCenter ? "mx-auto text-center" : ""} max-w-3xl ${className}`}>
      {eyebrow && (
        <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.32em] text-brand-terracotta">
          {eyebrow}
        </p>
      )}

      <Heading variant="h1" className="text-brand-coffee">
        {title}
      </Heading>

      {description && (
        <Text
          variant="body"
          className={`mt-5 text-brand-coffee/65 ${isCenter ? "mx-auto max-w-2xl" : "max-w-2xl"}`}
        >
          {description}
        </Text>
      )}
    </div>
  );
}