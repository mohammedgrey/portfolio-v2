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

const AppSectionSubtitle: FC<{
  className?: string;
  children?: React.ReactNode;
}> = ({ className, children }) => {
  return <h3 className={cn("text-2xl font-bold", className)}>{children}</h3>;
};

const AppSectionDescription: FC<{
  className?: string;
  children?: React.ReactNode;
}> = ({ className, children }) => {
  return <p className={cn("text-muted-foreground", className)}>{children}</p>;
};

AppSection.Title = AppSectionTitle;
AppSection.Subtitle = AppSectionSubtitle;
AppSection.Description = AppSectionDescription;

export default AppSection;
