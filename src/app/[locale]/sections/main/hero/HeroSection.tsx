import AppSection from "@/components/common/AppSection";
import { getAppTranslations } from "@/i18n";
import { type FC } from "react";
import AiInput from "./AiInput";

const HeroSection: FC = async () => {
  const t = await getAppTranslations("HomePage");

  return (
    <AppSection id="hero" className="flex justify-center items-center">
      <div className="flex w-2xl max-w-full flex-col gap-4">
        <div className="flex flex-col gap-2">
          <AppSection.Title>{t("hero.title")}</AppSection.Title>
          <p className="text-lg text-muted-foreground text-center">
            {t("hero.description")}
          </p>
        </div>
        <div className="h-10">
          <AiInput />
        </div>
      </div>
    </AppSection>
  );
};

export default HeroSection;
