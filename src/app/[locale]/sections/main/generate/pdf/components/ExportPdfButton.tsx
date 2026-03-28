import { Button } from "@/components/ui/button";
import { useAppTranslations } from "@/i18n";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { type FC, useMemo } from "react";
import { CookiesProvider } from "react-cookie";
import { ResumeConfigState } from "../../ResumeConfig";
import PdfDocument from "../PdfDocument";

export type ExportPdfButtonProps = Readonly<{
  config?: ResumeConfigState;
}>;

const ExportPdfButton: FC<ExportPdfButtonProps> = ({ config }) => {
  const t = useAppTranslations("HomePage");

  const document = useMemo(
    () => (
      <CookiesProvider>
        <PdfDocument config={config} />
      </CookiesProvider>
    ),
    [config],
  );

  // Create a key based on config to force remount when config changes
  const configKey = useMemo(() => JSON.stringify(config), [config]);

  return (
    <PDFDownloadLink key={configKey} document={document} fileName="resume.pdf">
      {({ loading }) => (
        <Button className="w-full" disabled={loading}>
          {t("generate.action")}
        </Button>
      )}
    </PDFDownloadLink>
  );
};

export default ExportPdfButton;
