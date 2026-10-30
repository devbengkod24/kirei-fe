export type CardProps = React.HTMLAttributes<HTMLElement> & {
  as?: "div" | "section" | "article";
};

export function Card({ as: Tag = "div", className = "", children, ...props }: CardProps) {
  return (
    <Tag className={`rounded-md border border-border bg-surface ${className}`} {...props}>
      {children}
    </Tag>
  );
}
