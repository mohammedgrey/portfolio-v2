import { useAppTranslations } from "@/i18n";
import { Page, Text } from "@react-pdf/renderer";
import { type FC } from "react";
import usePdfStyles from "./hooks/usePdfStyles";

const PdfContent: FC = () => {
  const t = useAppTranslations("HomePage");
  const { styles } = usePdfStyles();
  return (
    <Page size="A4" style={styles.page}>
      <Text style={styles.text}>{t("generate.title")}</Text>;
    </Page>
  );
};

export default PdfContent;
