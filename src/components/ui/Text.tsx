type TextVariant = "body" | "muted" | "small";

const variants = {
  body: "text-base leading-relaxed",
  muted: "text-brand-coffee/70",
  small: "text-sm",
};

export default function Text({
  children,
  variant = "body",
  className = "",
}: {
  children: React.ReactNode;
  variant?: TextVariant;
  className?: string;
}) {
  return (
    <p className={`${variants[variant]} ${className}`}>
      {children}
    </p>
  );
}