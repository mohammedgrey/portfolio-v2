import { Image, Text, View } from "@react-pdf/renderer";
import { type FC, type ReactNode } from "react";
import type { UsePdfStylesReturn } from "../hooks/usePdfStyles";

interface PdfSectionProps {
  title: string;
  children: ReactNode;
  styleUtils: UsePdfStylesReturn;
  iconSrc?: string;
}

const PdfSection: FC<PdfSectionProps> = ({
  title,
  children,
  styleUtils,
  iconSrc,
}) => {
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
        <View style={{ ...styles.row, alignItems: "center", gap: 6 }}>
          {iconSrc && (
            <Image
              src={iconSrc}
              style={{ width: 11, height: 11, objectFit: "contain" }}
            />
          )}
          <Text
            style={{
              ...styles.text,
              fontSize: fontSizes.large,
              fontWeight: fontWeights.semiBold,
              color: colors.text.body,
              letterSpacing: 0.4,
            }}
          >
            {title}
          </Text>
        </View>
      </View>

      {/* Section Content */}
      <View style={{ ...styles.column, gap: 6 }}>{children}</View>
    </View>
  );
};

export default PdfSection;
