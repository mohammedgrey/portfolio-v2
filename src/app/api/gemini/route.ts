import { GoogleGenAI } from "@google/genai";
import { zodToJsonSchema } from "zod-to-json-schema";
import { GeminiResponseSchema } from "./response-schema";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { context, question } = body;

    if (!context || !question) {
      return new Response(
        JSON.stringify({ error: "Missing context or question" }),
        { status: 400 }
      );
    }

    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const jsonSchema = zodToJsonSchema(GeminiResponseSchema as any);

    const prompt = `
      Context:
      ${context}

      Question:
      ${question}
    `;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseJsonSchema: jsonSchema,
      },
    });

    const json = JSON.parse(response.text || "{}");
    return new Response(JSON.stringify(json), { status: 200 });
  } catch (err) {
    return new Response(
      JSON.stringify({ error: (err as Error)?.message || "Unknown error" }),
      { status: 500 }
    );
  }
}
