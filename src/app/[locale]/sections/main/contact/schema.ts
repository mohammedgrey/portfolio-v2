import { useAppTranslations } from "@/i18n";
import { z } from "zod";

export const useContactFormSchema = () => {
  const t = useAppTranslations("ContactPage");

  return z.object({
    name: z
      .string()
      .min(1, { message: t("form.validation.nameRequired") })
      .min(2, { message: t("form.validation.nameMin") })
      .max(100, { message: t("form.validation.nameMax") }),
    email: z
      .string()
      .min(1, { message: t("form.validation.emailRequired") })
      .email({ message: t("form.validation.emailInvalid") }),
    subject: z
      .string()
      .trim()
      .max(200, { message: t("form.validation.subjectMax") })
      .refine((value) => value.length === 0 || value.length >= 3, {
        message: t("form.validation.subjectMin"),
      }),
    body: z
      .string()
      .min(1, { message: t("form.validation.bodyRequired") })
      .min(10, { message: t("form.validation.bodyMin") })
      .max(1000, { message: t("form.validation.bodyMax") }),
  });
};

export type ContactFormData = z.infer<ReturnType<typeof useContactFormSchema>>;
