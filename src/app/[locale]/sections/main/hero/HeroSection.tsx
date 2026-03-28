import AppSection from "@/components/common/AppSection";
import { getAppTranslations } from "@/i18n";
import { type FC } from "react";
import AiInput from "./AiInput";

const HeroSection: FC = async () => {
  const t = await getAppTranslations("HomePage");

  return (
    <AppSection
      id="hero"
      className="flex justify-center min-h-[500px] items-center"
    >
      <div className="flex w-2xl max-w-full flex-col gap-12">
        <div className="flex flex-col gap-4">
          <AppSection.Title>{t("hero.title")}</AppSection.Title>
          <AppSection.Description className="text-lg text-center">
            {t("hero.description")}
          </AppSection.Description>
        </div>
        <div className="h-10">
          <AiInput />
        </div>
      </div>
    </AppSection>
  );
};

export default HeroSection;
