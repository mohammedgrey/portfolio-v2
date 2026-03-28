import { type FC } from "react";

export type InMessageReferenceProps = Readonly<{
  title: string;
  children: React.ReactNode;
}>;
const InMessageReference: FC<InMessageReferenceProps> = ({
  title,
  children,
}) => {
  return (
    <div className="flex flex-col gap-2">
      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
        {title}
      </p>
      <div className="flex flex-wrap gap-2">{children}</div>
    </div>
  );
};

export default InMessageReference;
