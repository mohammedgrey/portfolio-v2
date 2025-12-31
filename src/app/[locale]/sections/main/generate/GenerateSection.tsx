"use client";

import AppSection from "@/components/common/AppSection";
import { WhenHydrated } from "@/components/wrappers/WhenHydrated";
import { PDFViewer } from "@react-pdf/renderer";
import { type FC } from "react";
import { CookiesProvider } from "react-cookie";
import PdfDocument from "./pdf/PdfDocument";
import ExportPdfButton from "./pdf/components/ExportPdfButton";

const GenerateSection: FC = () => {
  return (
    <WhenHydrated>
      <AppSection id="generate">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="w-full">
            <ExportPdfButton />
          </div>

          <PDFViewer showToolbar={false} width={"100%"}>
            <CookiesProvider>
              <PdfDocument />
            </CookiesProvider>
          </PDFViewer>
        </div>
      </AppSection>
    </WhenHydrated>
  );
};

export default GenerateSection;
