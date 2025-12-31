import { z } from "zod";

export enum GeminiResponseType {
  SIMPLE_ANSWER = "simple_answer",
  ANSWER_WITH_ACTION = "answer_with_action",
}

export enum GeminiActionType {
  OPEN_URL = "open_url",
  PROVIDE_CONTACT_INFO = "provide_contact_info",
}

const actionPayloads = {
  open_url: z.object({
    urlLink: z.string(),
    urlText: z.string(),
  }),
  provide_contact_info: z.object({
    type: z
      .enum(["email", "phone", "whatsapp", "telegram", "linkedin", "github"])
      .optional(),
  }),
};

export const GeminiResponseSchema = z.discriminatedUnion("type", [
  z.object({
    type: z.literal(GeminiResponseType.SIMPLE_ANSWER),
    answer: z.string(),
  }),
  z.discriminatedUnion("action", [
    z.object({
      answer: z.string(),
      type: z.literal(GeminiResponseType.ANSWER_WITH_ACTION),
      action: z.literal(GeminiActionType.OPEN_URL),
      payload: actionPayloads.open_url,
    }),
    z.object({
      answer: z.string(),
      type: z.literal(GeminiResponseType.ANSWER_WITH_ACTION),
      action: z.literal(GeminiActionType.PROVIDE_CONTACT_INFO),
      payload: actionPayloads.provide_contact_info,
    }),
  ]),
]);

export type GeminiResponse = z.infer<typeof GeminiResponseSchema>;
