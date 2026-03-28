import { Text, View } from "@react-pdf/renderer";
import { type FC, type ReactNode } from "react";
import type { UsePdfStylesReturn } from "../hooks/usePdfStyles";

interface PdfSectionProps {
  title: string;
  children: ReactNode;
  styleUtils: UsePdfStylesReturn;
}

const PdfSection: FC<PdfSectionProps> = ({ title, children, styleUtils }) => {
  const { styles, colors, fontSizes, fontWeights } = styleUtils;

  return (
    <View style={{ ...styles.column, gap: 10 }}>
      {/* Section Title */}
      <View
        style={{
          borderBottom: `1px solid ${colors.border}`,
          paddingBottom: 5,
          marginBottom: 4,
          width: "100%",
        }}
      >
        <Text
          style={{
            ...styles.text,
            fontSize: fontSizes.large,
            fontWeight: fontWeights.semiBold,
            color: colors.primary,
            letterSpacing: 0.4,
          }}
        >
          {title}
        </Text>
      </View>

      {/* Section Content */}
      <View style={{ ...styles.column, gap: 6 }}>{children}</View>
    </View>
  );
};

export default PdfSection;
