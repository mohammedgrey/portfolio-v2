import { Button } from "@/components/ui/button";
import { useAppTranslations } from "@/i18n";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { type FC } from "react";
import { CookiesProvider } from "react-cookie";
import PdfDocument from "../PdfDocument";

export type ExportPdfButtonProps = Readonly<object>;
const ExportPdfButton: FC<ExportPdfButtonProps> = () => {
  const t = useAppTranslations("HomePage");
  return (
    <PDFDownloadLink
      document={
        <CookiesProvider>
          <PdfDocument />
        </CookiesProvider>
      }
      fileName="document.pdf"
    >
      {({ loading }) => (
        <Button className="w-full" loading={loading}>
          {t("generate.action")}
        </Button>
      )}
    </PDFDownloadLink>
  );
};

export default ExportPdfButton;
