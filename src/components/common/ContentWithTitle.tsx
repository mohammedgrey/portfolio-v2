import Text from "@/components/common/Text";
import { type FC } from "react";

export type ContentWithTitleProps = Readonly<{
  title: string;
  children?: React.ReactNode;
}>;
const ContentWithTitle: FC<ContentWithTitleProps> = ({ title, children }) => {
  return (
    <div className="gap-2 flex flex-col">
      <Text variant="description" size="sm">
        {title}
      </Text>
      <div className="text-sm flex gap-2 flex-wrap">{children}</div>
    </div>
  );
};

export default ContentWithTitle;
