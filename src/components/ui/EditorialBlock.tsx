import React from "react";
import Image from "next/image";
import { MapPin, Info, Calendar } from "lucide-react";
import Heading from "@/components/ui/Heading";
import Text from "@/components/ui/Text";
import Badge from "@/components/ui/Badge";

interface EditorialBlockProps {
  title: string;
  description: string;
  imageSrc: string;
  location: string;
  status: string;
  date: string;
  reverse?: boolean;
}

export default function EditorialBlock({
  title,
  description,
  imageSrc,
  location,
  status,
  date,
  reverse = false,
}: EditorialBlockProps) {
  return (
    <div className="grid grid-cols-1 items-center gap-12 py-16 lg:grid-cols-2 lg:gap-20">
      <div
        className={`group relative h-[460px] w-full overflow-hidden rounded-2xl border border-brand-coffee/10 bg-brand-cream shadow-soft transition-all duration-500 hover:shadow-editorial md:h-[560px] lg:h-[640px] ${
          reverse ? "lg:order-2" : "lg:order-1"
        }`}
      >
        <Image
          src={imageSrc}
          alt={title}
          fill
          className="object-cover grayscale opacity-90 contrast-[1.08] sepia-[0.08] transition-all duration-700 group-hover:grayscale-0 group-hover:opacity-100"
        />

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-70" />
      </div>

      <div className={`space-y-8 ${reverse ? "lg:order-1" : "lg:order-2"}`}>
        <div className="space-y-5">
          <Badge variant="origin">Feltfortelling</Badge>

          <Heading variant="h1" className="max-w-xl text-brand-coffee">
            {title}
          </Heading>

          <Text
            variant="body"
            className="max-w-lg text-lg text-brand-coffee/70 md:text-xl"
          >
            {description}
          </Text>
        </div>

        <div className="grid grid-cols-1 gap-5 border-t border-brand-coffee/10 pt-8 sm:grid-cols-3">
          {[
            { icon: MapPin, label: "Sted", value: location },
            { icon: Info, label: "Status", value: status },
            { icon: Calendar, label: "Dato", value: date },
          ].map(({ icon: Icon, label, value }) => (
            <div key={label} className="space-y-2">
              <div className="flex items-center gap-2 text-brand-coffee/50">
                <Icon size={14} className="text-brand-terracotta" />
                <span className="text-[10px] font-bold uppercase tracking-widest">
                  {label}
                </span>
              </div>
              <p className="text-sm font-medium text-brand-coffee/90">
                {value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
