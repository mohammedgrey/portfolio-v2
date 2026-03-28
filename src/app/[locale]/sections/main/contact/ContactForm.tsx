"use client";

import AppSection from "@/components/common/AppSection";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { personalInfo } from "@/data/personalInfo";
import { useAppTranslations } from "@/i18n";
import emailjs from "@emailjs/browser";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Send } from "lucide-react";
import { useTheme } from "next-themes";
import { useRef, useState, type FC } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useContactFormSchema, type ContactFormData } from "./schema";

const RECAPTCHA_TIMEOUT_MS = 15000;
const EMAILJS_TIMEOUT_MS = 20000;

const withTimeout = async <T,>(
  promise: Promise<T>,
  timeoutMs: number,
  timeoutMessage: string,
): Promise<T> => {
  return new Promise<T>((resolve, reject) => {
    const timeoutId = setTimeout(() => {
      reject(new Error(timeoutMessage));
    }, timeoutMs);

    promise
      .then((value) => {
        clearTimeout(timeoutId);
        resolve(value);
      })
      .catch((error) => {
        clearTimeout(timeoutId);
        reject(error);
      });
  });
};

const ContactForm: FC = () => {
  const t = useAppTranslations("ContactPage");
  const schema = useContactFormSchema();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { resolvedTheme } = useTheme();
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const recaptchaTheme = resolvedTheme === "dark" ? "dark" : "light";

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    try {
      const recaptchaInstance = recaptchaRef.current;
      if (!recaptchaInstance) {
        throw new Error("reCAPTCHA widget is not ready");
      }

      const recaptchaToken = await withTimeout(
        recaptchaInstance.executeAsync(),
        RECAPTCHA_TIMEOUT_MS,
        "reCAPTCHA token generation timed out",
      );
      recaptchaInstance.reset();

      if (!recaptchaToken) {
        toast.error(t("form.validation.recaptchaRequired"));
        return;
      }

      // Send email using EmailJS
      await withTimeout(
        emailjs.send(
          process.env.NEXT_PUBLIC_EMAIL_JS_SERVICE_ID!,
          process.env.NEXT_PUBLIC_EMAIL_JS_TEMPLATE_ID!,
          {
            to_email: personalInfo.email,
            from_name: data.name,
            from_email: data.email,
            subject: data.subject,
            message: data.body,
            "g-recaptcha-response": recaptchaToken,
          },
          process.env.NEXT_PUBLIC_EMAIL_JS_PUBLIC_KEY!,
        ),
        EMAILJS_TIMEOUT_MS,
        "Email provider request timed out",
      );

      toast.success(t("form.success"));
      reset();
      recaptchaRef.current?.reset();
    } catch (error) {
      console.error("Contact form submission failed", error);
      toast.error(t("form.error"));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <AppSection.Subtitle className="mb-2">
          {t("emailDirectly")}
        </AppSection.Subtitle>
        <AppSection.Description>
          {t("emailDirectlyDesc")}
        </AppSection.Description>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Name Field */}
        <div className="space-y-2">
          <Label htmlFor="name">
            {t("form.name")} <span className="text-destructive">*</span>
          </Label>
          <Input
            id="name"
            placeholder={t("form.namePlaceholder")}
            {...register("name")}
            className={errors.name ? "border-destructive" : ""}
          />
          {errors.name && (
            <p className="text-sm text-destructive">{errors.name.message}</p>
          )}
        </div>

        {/* Email Field */}
        <div className="space-y-2">
          <Label htmlFor="email">
            {t("form.email")} <span className="text-destructive">*</span>
          </Label>
          <Input
            id="email"
            type="email"
            placeholder={t("form.emailPlaceholder")}
            {...register("email")}
            className={errors.email ? "border-destructive" : ""}
          />
          {errors.email && (
            <p className="text-sm text-destructive">{errors.email.message}</p>
          )}
        </div>

        {/* Subject Field */}
        <div className="space-y-2">
          <Label htmlFor="subject">{t("form.subject")}</Label>
          <Input
            id="subject"
            placeholder={t("form.subjectPlaceholder")}
            {...register("subject")}
            className={errors.subject ? "border-destructive" : ""}
          />
          {errors.subject && (
            <p className="text-sm text-destructive">{errors.subject.message}</p>
          )}
        </div>

        {/* Body Field */}
        <div className="space-y-2">
          <Label htmlFor="body">
            {t("form.body")} <span className="text-destructive">*</span>
          </Label>
          <Textarea
            id="body"
            placeholder={t("form.bodyPlaceholder")}
            rows={6}
            {...register("body")}
            className={errors.body ? "border-destructive" : ""}
          />
          {errors.body && (
            <p className="text-sm text-destructive">{errors.body.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {t("form.sending")}
            </>
          ) : (
            <>
              <Send className="mr-2 h-4 w-4" />
              {t("form.submit")}
            </>
          )}
        </Button>

        {/* Invisible reCAPTCHA (modern UX, triggered on submit) */}
        <div className="flex justify-end">
          <div
            className={
              "overflow-hidden flex justify-end w-[70px] rtl:-scale-x-100 rtl:justify-start rounded-md"
            }
          >
            <ReCAPTCHA
              key={recaptchaTheme}
              ref={recaptchaRef}
              sitekey={process.env.NEXT_PUBLIC_EMAIL_RECAPTCHA_SITE_KEY || ""}
              size="invisible"
              badge="inline"
              theme={recaptchaTheme}
              className=""
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
