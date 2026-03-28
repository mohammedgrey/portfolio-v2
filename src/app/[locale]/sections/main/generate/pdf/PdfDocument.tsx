"use client";

import arMessages from "@/i18n/messages/ar.json";
import enMessages from "@/i18n/messages/en.json";
import { Document, Font } from "@react-pdf/renderer";
import { NextIntlClientProvider } from "next-intl";
import { FC } from "react";
import { useCookies } from "react-cookie";
import { ResumeConfigState } from "../ResumeConfig";
import PdfContent from "./PdfContent";

interface PdfDocumentProps {
  config?: ResumeConfigState;
}

const PdfDocument: FC<PdfDocumentProps> = ({ config }) => {
  const [cookies] = useCookies(["NEXT_LOCALE"]);
  const locale = (cookies["NEXT_LOCALE"] || "en") as string;
  const isEnglish = locale?.includes("en") || false;

  return (
    <NextIntlClientProvider
      locale={locale}
      messages={isEnglish ? enMessages : arMessages}
    >
      <Document style={{ borderRadius: 8 }}>
        <PdfContent config={config} />
      </Document>
    </NextIntlClientProvider>
  );
};

Font.register({
  family: "Raleway",
  fonts: [
    {
      src: "/fonts/Raleway-400.woff",
      fontWeight: 400,
    },
    {
      src: "/fonts/Raleway-500.woff",
      fontWeight: 500,
    },
    {
      src: "/fonts/Raleway-600.woff",
      fontWeight: 600,
    },
    {
      src: "/fonts/Raleway-700.woff",
      fontWeight: 700,
    },
  ],
});

export default PdfDocument;
