import { sendGAEvent } from "@next/third-parties/google";

export enum AnalyticsEvent {
  ContactFormSubmitSuccess = "contact_form_submit_success",
  ContactFormSubmitError = "contact_form_submit_error",
  ResumePdfGenerate = "resume_pdf_generate",
  ResumeConfigChange = "resume_config_change",
  ProjectOpen = "project_open",
}

type EventParams = Record<string, string | number | boolean | undefined>;

export const trackEvent = (name: AnalyticsEvent, params?: EventParams) => {
  if (!process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_CODE) return;
  sendGAEvent("event", name, params ?? {});
};
