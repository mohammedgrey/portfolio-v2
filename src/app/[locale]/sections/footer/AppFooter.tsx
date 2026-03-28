import { getAppTranslations } from "@/i18n";
import { type FC } from "react";

const AppFooter: FC = async () => {
  const t = await getAppTranslations("Common");

  return (
    <footer className="p-4">
      <p className="text-center text-sm">
        {t("footerRightsReserved", { year: new Date().getFullYear() })}
      </p>
    </footer>
  );
};

export default AppFooter;
