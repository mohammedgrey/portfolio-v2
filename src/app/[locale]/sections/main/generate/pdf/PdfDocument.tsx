"use client";

import arMessages from "@/i18n/messages/ar.json";
import enMessages from "@/i18n/messages/en.json";
import { Document, Font } from "@react-pdf/renderer";
import { NextIntlClientProvider } from "next-intl";
import { FC } from "react";
import { useCookies } from "react-cookie";
import PdfContent from "./PdfContent";

export const PdfDocument: FC = () => {
  const [cookies] = useCookies(["NEXT_LOCALE"]);
  const locale = (cookies["NEXT_LOCALE"] || "en") as string;
  const isEnglish = locale?.includes("en") || false;

  return (
    <NextIntlClientProvider
      locale={locale}
      messages={isEnglish ? enMessages : arMessages}
    >
      <Document>
        <PdfContent />
      </Document>
    </NextIntlClientProvider>
  );
};

Font.register({
  family: "PDFFont",
  fonts: [
    {
      src: "/fonts/PdfFontRegular.ttf",
      fontWeight: 400, // normal
    },
    {
      src: "/fonts/PdfFontBold.ttf",
      fontWeight: 700, // bold
    },
  ],
});

export default PdfDocument;
