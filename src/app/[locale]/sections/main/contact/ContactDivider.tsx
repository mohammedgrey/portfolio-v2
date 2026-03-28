"use client";

import { useAppTranslations } from "@/i18n";
import { type FC } from "react";

const ContactDivider: FC = () => {
  const t = useAppTranslations("ContactPage");

  return (
    <div className="order-2 lg:order-0 lg:absolute lg:left-1/2 lg:-translate-x-1/2 lg:top-0 lg:bottom-0 flex items-center justify-center">
      <div className="flex flex-row lg:flex-col items-center w-full lg:w-auto lg:h-full">
        <div className="flex-1 h-px lg:h-auto lg:w-px bg-border" />
        <div className="w-12 h-12 rounded-full bg-background border border-border flex items-center justify-center shrink-0 mx-4 lg:mx-0">
          <span className="text-sm font-medium text-muted-foreground">
            {t("or")}
          </span>
        </div>
        <div className="flex-1 h-px lg:h-auto lg:w-px bg-border" />
      </div>
    </div>
  );
};

export default ContactDivider;
