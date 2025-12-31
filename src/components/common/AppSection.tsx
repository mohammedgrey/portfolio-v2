import { cn } from "@/lib/utils";
import { HTMLAttributes, type FC } from "react";

export type AppSectionProps = Readonly<HTMLAttributes<HTMLElement>>;
const AppSection = ({ className, id, children, ...props }: AppSectionProps) => {
  return (
    <section {...props} className={cn("p-4", className)} id={id}>
      {children}
    </section>
  );
};

const AppSectionTitle: FC<{
  className?: string;
  children?: React.ReactNode;
}> = ({ className, children }) => {
  return (
    <h2 className={cn("text-3xl font-bold text-center", className)}>
      {children}
    </h2>
  );
};

AppSection.Title = AppSectionTitle;

export default AppSection;
