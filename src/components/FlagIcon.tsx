import type { Locale } from "@/i18n/config";

export default function FlagIcon({
  locale,
  className = "",
}: {
  locale: Locale;
  className?: string;
}) {
  if (locale === "no") {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 16" className={className} role="img">
        <rect width="24" height="16" fill="#BA0C2F" />
        <path d="M0 8h24M8 0v16" stroke="#fff" strokeWidth="4" />
        <path d="M0 8h24M8 0v16" stroke="#00205B" strokeWidth="2" />
      </svg>
    );
  }

  if (locale === "en") {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 16" className={className} role="img">
        <rect width="24" height="16" fill="#012169" />
        <path d="M0 0 24 16M24 0 0 16" stroke="#fff" strokeWidth="4" />
        <path d="M0 0 24 16M24 0 0 16" stroke="#C8102E" strokeWidth="1.8" />
        <path d="M12 0v16M0 8h24" stroke="#fff" strokeWidth="5" />
        <path d="M12 0v16M0 8h24" stroke="#C8102E" strokeWidth="2.8" />
      </svg>
    );
  }

  return (
    <svg aria-hidden="true" viewBox="0 0 24 16" className={className} role="img">
      <rect width="24" height="16" fill="#AA151B" />
      <rect y="4" width="24" height="8" fill="#F1BF00" />
      <rect x="6" y="6" width="1.2" height="4" rx="0.3" fill="#AA151B" />
    </svg>
  );
}
