import type { SkillCategory } from "@/types/common";
import { Text, View } from "@react-pdf/renderer";
import { type FC } from "react";
import type { UsePdfStylesReturn } from "../hooks/usePdfStyles";

interface PdfSkillsGridProps {
  skillCategories: SkillCategory[];
  styleUtils: UsePdfStylesReturn;
}

const PdfSkillsGrid: FC<PdfSkillsGridProps> = ({
  skillCategories,
  styleUtils,
}) => {
  const { styles, colors, fontSizes, fontWeights } = styleUtils;

  return (
    <View style={{ ...styles.column, gap: 13 }}>
      {skillCategories.map((category) => (
        <View
          wrap={false}
          key={category.id}
          style={{
            ...styles.column,
            gap: 6,
            width: "100%",
            border: `0.6px solid ${colors.border}`,
            borderRadius: 6,
            paddingHorizontal: 8,
            paddingVertical: 7,
          }}
        >
          <View style={styles.row}>
            <Text
              style={{
                ...styles.text,
                fontSize: fontSizes.small,
                fontWeight: fontWeights.semiBold,
                color: colors.text.title,
                letterSpacing: 0.2,
              }}
            >
              {category.category}
            </Text>
          </View>

          <View style={{ ...styles.row, gap: 5, flexWrap: "wrap", flex: 1 }}>
            {category.skills.map((skill, index) => (
              <View
                key={index}
                style={{
                  backgroundColor: colors.chipBg,
                  border: `0.6px solid ${colors.chipBorder}`,
                  borderRadius: 999,
                  paddingHorizontal: 7,
                  paddingVertical: 2,
                }}
              >
                <Text
                  style={{
                    ...styles.text,
                    fontSize: fontSizes.extraSmall,
                    fontWeight: fontWeights.medium,
                    color: colors.text.body,
                  }}
                >
                  {skill}
                </Text>
              </View>
            ))}
          </View>
        </View>
      ))}
    </View>
  );
};

export default PdfSkillsGrid;
