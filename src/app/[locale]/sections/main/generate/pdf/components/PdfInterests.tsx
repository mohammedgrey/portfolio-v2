import type { InterestItem } from "@/types/common";
import { Text, View } from "@react-pdf/renderer";
import { type FC } from "react";
import type { UsePdfStylesReturn } from "../hooks/usePdfStyles";

interface PdfInterestsProps {
  interests: InterestItem[];
  languages: Array<{ language: string; proficiency: string }>;
  styleUtils: UsePdfStylesReturn;
  showLanguages?: boolean;
}

const PdfInterests: FC<PdfInterestsProps> = ({
  interests,
  languages,
  styleUtils,
  showLanguages = true,
}) => {
  const { styles, colors, fontSizes, fontWeights } = styleUtils;

  return (
    <View style={{ ...styles.column, gap: 6 }}>
      {/* Interests/Activities */}
      {interests.map((interest) => (
        <View key={interest.id} style={{ ...styles.column, gap: 2 }}>
          <Text
            style={{
              ...styles.text,
              fontSize: fontSizes.small,
              fontWeight: fontWeights.semiBold,
              color: colors.text.title,
            }}
          >
            {interest.title}
          </Text>
          <Text
            style={{
              ...styles.text,
              fontSize: fontSizes.small,
              lineHeight: 1.45,
              color: colors.text.body,
            }}
          >
            {interest.description}
          </Text>
        </View>
      ))}

      {/* Languages */}
      {showLanguages && languages.length > 0 && (
        <View style={{ ...styles.row, gap: 8, marginTop: 4 }}>
          <Text
            style={{
              ...styles.text,
              fontSize: fontSizes.small,
              fontWeight: fontWeights.semiBold,
              color: colors.text.title,
            }}
          >
            Languages:
          </Text>
          {languages.map((lang, index) => (
            <Text
              key={index}
              style={{
                ...styles.text,
                fontSize: fontSizes.small,
                fontWeight: fontWeights.medium,
                color: colors.text.body,
              }}
            >
              {lang.language} ({lang.proficiency})
              {index < languages.length - 1 && "   •"}
            </Text>
          ))}
        </View>
      )}
    </View>
  );
};

export default PdfInterests;
