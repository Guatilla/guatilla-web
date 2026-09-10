type HeadingVariant = "display" | "h1" | "h2" | "h3";

const variants = {
  display: "text-5xl md:text-6xl lg:text-7xl leading-[1.05]",
  h1: "text-4xl md:text-5xl",
  h2: "text-3xl md:text-4xl",
  h3: "text-xl md:text-2xl",
};

export default function Heading({
  children,
  variant = "h2",
  className = "",
}: {
  children: React.ReactNode;
  variant?: HeadingVariant;
  className?: string;
}) {
  return (
    <h2 className={`font-heading font-bold tracking-tight ${variants[variant]} ${className}`}>
      {children}
    </h2>
  );
}