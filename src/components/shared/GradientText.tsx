interface GradientTextProps {
  children: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "h4" | "span" | "p";
  from?: string;
  to?: string;
}

export function GradientText({
  children,
  className = "",
  as: Tag = "span",
  from = "#0EA5E9",
  to = "#38BDF8",
}: GradientTextProps) {
  return (
    <Tag
      className={`bg-gradient-to-r from-[${from}] to-[${to}] bg-clip-text text-transparent ${className}`}
      style={{
        backgroundImage: `linear-gradient(to right, ${from}, ${to})`,
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
      }}
    >
      {children}
    </Tag>
  );
}
