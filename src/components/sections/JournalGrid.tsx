import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { journalEntries } from "@/data/journal";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import EditorialImageCard from "@/components/ui/EditorialImageCard";

interface JournalGridProps {
  limit?: number;
  showCTA?: boolean;
}

export default function JournalGrid({
  limit,
  showCTA = true,
}: JournalGridProps) {
  const entries = limit ? journalEntries.slice(0, limit) : journalEntries;

  return (
    <div className="space-y-16">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {entries.map((entry) => (
          <Link
            key={entry.slug}
            href={`/journal/${entry.slug}`}
            className="group block"
          >
            <EditorialImageCard
              image={entry.image}
              alt={entry.title}
              title={entry.title}
              description={entry.excerpt}
              theme="cream"
            >
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <Badge variant="origin">{entry.category}</Badge>
                  <span className="text-xs font-medium uppercase tracking-[0.18em] text-brand-coffee/50">
                    {entry.date}
                  </span>
                </div>

                <ArrowRight
                  size={16}
                  className="text-brand-terracotta transition-transform group-hover:translate-x-1"
                />
              </div>
            </EditorialImageCard>
          </Link>
        ))}
      </div>

      {showCTA && (
        <div className="pt-8 text-center">
          <Button href="/journal" variant="secondary" size="sm" withArrow>
            Se alle journaler
          </Button>
        </div>
      )}
    </div>
  );
}
