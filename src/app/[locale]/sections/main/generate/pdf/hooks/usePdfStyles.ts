import { StyleSheet } from "@react-pdf/renderer";

const usePdfStyles = () => {
  const isArabic = false; // TODO: determine locale dynamically

  const isRtl = isArabic;

  const colors = {
    primary: "#008755",
    secondary: "#9b955e",

    text: {
      title: "#404040",
      body: "#7a7a7a",
      caption: "#6c7180",
    },
    border: "#EBF1FA",
    card: "#f0f0f0",
    surface: "#f7f7f7",
    success: "#1fb08d",
    error: "#ef5a5a",
    warning: "#F9A825",
  };

  const fontSizes = {
    extraLarge: 14,
    large: 12,
    medium: 10,
    small: 9,
    extraSmall: 8,
    superSmall: 7,
  };

  const fontWeights = {
    normal: 400,
    bold: 700,
  };

  const styles = StyleSheet.create({
    page: {
      fontFamily: "PDFFont",
      fontSize: fontSizes.medium,
      padding: 24,
      textAlign: isRtl ? "right" : "left",
      backgroundColor: "#fff",
      flexDirection: "column",
      gap: 24,
    },
    text: {
      textAlign: isRtl ? "right" : "left",
      fontWeight: fontWeights.normal,
      color: colors.text.body,
    },
    row: {
      flexDirection: isRtl ? "row-reverse" : "row",
      justifyContent: isRtl ? "flex-end" : "flex-start",
      textAlign: isRtl ? "right" : "left",
      gap: 2,
      width: "100%",
    },
    column: {
      flexDirection: "column",
      alignItems: isRtl ? "flex-end" : "flex-start",
      gap: 2,
      width: "100%",
    },
    tableCol: {
      flex: 1,
      paddingVertical: 8,
    },
    tableHeader: {
      backgroundColor: colors.primary,
      paddingHorizontal: 12,
      paddingVertical: 4,
    },
    tableCell: {
      color: colors.text.body,
    },
    footer: {
      position: "absolute",
      bottom: 8,
      left: 16,
      right: 16,
    },
  });

  return {
    styles,
    colors,
    isRtl,
    fontSizes,
    fontWeights,
  };
};
export default usePdfStyles;

export type UsePdfStylesReturn = ReturnType<typeof usePdfStyles>;
