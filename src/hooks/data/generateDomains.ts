import { NestedTranslationKey } from "@/i18n/types";
import { ProjectTypeEnum } from "@/types/enums";

export const generateDomains = (
  t: (key: NestedTranslationKey<"Domains">) => string,
) => {
  return {
    education: {
      label: t("education"),
      value: ProjectTypeEnum.Education,
    },
    messaging: {
      label: t("messaging"),
      value: ProjectTypeEnum.Messaging,
    },
    delivery: {
      label: t("delivery"),
      value: ProjectTypeEnum.Delivery,
    },
    enterprise: {
      label: t("enterprise"),
      value: ProjectTypeEnum.Enterprise,
    },
    hospitality: {
      label: t("hospitality"),
      value: ProjectTypeEnum.Hospitality,
    },
    ecommerce: {
      label: t("ecommerce"),
      value: ProjectTypeEnum.Ecommerce,
    },
    logistics: {
      label: t("logistics"),
      value: ProjectTypeEnum.Logistics,
    },
    search: {
      label: t("search"),
      value: ProjectTypeEnum.Search,
    },
    entertainment: {
      label: t("entertainment"),
      value: ProjectTypeEnum.Entertainment,
    },
    gaming: {
      label: t("gaming"),
      value: ProjectTypeEnum.Gaming,
    },
    aiMl: {
      label: t("aiMl"),
      value: ProjectTypeEnum.AiMl,
    },
    hardware: {
      label: t("hardware"),
      value: ProjectTypeEnum.Hardware,
    },
    networking: {
      label: t("networking"),
      value: ProjectTypeEnum.Networking,
    },
  } as const;
};
