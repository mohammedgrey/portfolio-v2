import Text from "@/components/common/Text";
import { useAppTranslations } from "@/i18n";
import { type FC } from "react";

export type AppFallbackProps = Readonly<{
  icon?: React.ReactNode;
  title?: React.ReactNode;
  description?: React.ReactNode;
  Footer?: React.ReactNode;
}>;
const AppFallback: FC<AppFallbackProps> = ({
  icon,
  title,
  description,
  Footer = null,
}) => {
  const t = useAppTranslations("Common");
  return (
    <div className="flex-col px-4 py-8 items-center flex gap-4">
      {icon || null}
      <div className="text-center max-w-lg mx-auto flex flex-col gap-1">
        <Text weight="semibold">{title || t("noDataFound")}</Text>
        <Text variant="description">
          {description || t("noDataFoundDescription")}
        </Text>
      </div>
      {Footer}
    </div>
  );
};

export default AppFallback;
