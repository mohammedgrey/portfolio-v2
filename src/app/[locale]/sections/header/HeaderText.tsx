"use client";

import { useAppTranslations } from "@/i18n";
import { type FC } from "react";

export type HeaderTextProps = Readonly<object>;
const HeaderText: FC<HeaderTextProps> = () => {
  const t = useAppTranslations("HeaderText");

  return (
    <div className="flex flex-col gap-1">
      <h1 className="font-bold text-3xl">{t("name")}</h1>
      <p className="text-muted-foreground text-sm flex gap-1 font-medium items-center">
        {t("title")}
      </p>
    </div>
  );
};

export default HeaderText;
