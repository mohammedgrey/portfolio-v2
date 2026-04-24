import { NestedTranslationKey } from "@/i18n/types";
import { ProjectTypeEnum } from "@/types/enums";

export const generateDomains = (
  t: (key: NestedTranslationKey<"Domains">) => string,
) => {
  return {
    ecommerce: {
      label: t("ecommerce"),
      value: ProjectTypeEnum.ECommerce,
    },
    healthtech: {
      label: t("healthtech"),
      value: ProjectTypeEnum.HealthTech,
    },
    edtech: {
      label: t("edtech"),
      value: ProjectTypeEnum.EdTech,
    },
    hospitality: {
      label: t("hospitality"),
      value: ProjectTypeEnum.Hospitality,
    },
    entertainment: {
      label: t("entertainment"),
      value: ProjectTypeEnum.Entertainment,
    },
    aiMl: {
      label: t("aiMl"),
      value: ProjectTypeEnum.AiMl,
    },
    engineering: {
      label: t("engineering"),
      value: ProjectTypeEnum.Engineering,
    },
  } as const;
};
