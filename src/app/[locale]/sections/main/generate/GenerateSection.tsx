"use client";

import AppSection from "@/components/common/AppSection";
import { WhenHydrated } from "@/components/wrappers/WhenHydrated";
import { useAppTranslations } from "@/i18n";
import { PDFViewer } from "@react-pdf/renderer";
import { Circle } from "lucide-react";
import { type FC, useState } from "react";
import { CookiesProvider } from "react-cookie";
import ExportPdfButton from "./pdf/components/ExportPdfButton";
import PdfDocument from "./pdf/PdfDocument";
import ResumeConfig, { ResumeConfigState } from "./ResumeConfig";

const GenerateSection: FC = () => {
  const t = useAppTranslations("HomePage");
  const [config, setConfig] = useState<ResumeConfigState>({
    showSkills: true,
    showExperience: true,
    showEducation: true,
    showInterests: true,
  });

  return (
    <WhenHydrated>
      <AppSection id="generate" className="py-12">
        <div className="text-center mb-10">
          <AppSection.Title className="mb-4">
            {t("generate.title")}
          </AppSection.Title>
          <AppSection.Description className="text-lg max-w-2xl mx-auto">
            {t("generate.description")}
          </AppSection.Description>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 max-w-7xl mx-auto">
          {/* Left: Configuration Panel */}
          <div className="lg:col-span-4">
            <div className="sticky top-4 space-y-4">
              <ResumeConfig onConfigChange={setConfig} />
              <ExportPdfButton config={config} />
            </div>
          </div>

          {/* Right: Live Preview */}
          <div className="lg:col-span-8 relative">
            <div className="absolute top-2 left-2 z-10 bg-background/80 backdrop-blur-sm px-3 py-1 rounded-md border shadow-sm flex items-center gap-1.5">
              <Circle className="h-2.5 w-2.5 text-primary fill-primary animate-pulse" />
              <h3 className="text-xs font-medium text-muted-foreground">
                {t("generate.livePreview")}
              </h3>
            </div>
            <PDFViewer
              key={JSON.stringify(config)}
              className="rounded-md w-full border shadow-sm"
              height={700}
              showToolbar={false}
              width="100%"
            >
              <CookiesProvider>
                <PdfDocument config={config} />
              </CookiesProvider>
            </PDFViewer>
          </div>
        </div>
      </AppSection>
    </WhenHydrated>
  );
};

export default GenerateSection;
