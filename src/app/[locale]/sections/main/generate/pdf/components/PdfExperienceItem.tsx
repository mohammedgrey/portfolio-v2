import type { ExperienceItem } from "@/types/common";
import { Text, View } from "@react-pdf/renderer";
import { type FC } from "react";
import type { UsePdfStylesReturn } from "../hooks/usePdfStyles";

interface PdfExperienceItemProps {
  experience: ExperienceItem;
  styleUtils: UsePdfStylesReturn;
}

const PdfExperienceItem: FC<PdfExperienceItemProps> = ({
  experience,
  styleUtils,
}) => {
  const { styles, colors, fontSizes, fontWeights } = styleUtils;
  const descriptionParagraphs = experience.description.split(/\n\s*\n/);

  const formatDate = (date: Date | null) => {
    if (!date) return "Present";
    return date.toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    });
  };

  return (
    <View wrap={false} style={{ ...styles.column, gap: 3, marginBottom: 6 }}>
      {/* Company and Position */}
      <View style={{ ...styles.row, justifyContent: "space-between" }}>
        <Text
          style={{
            ...styles.text,
            fontSize: fontSizes.medium,
            fontWeight: fontWeights.semiBold,
            color: colors.text.title,
          }}
        >
          {experience.company} - {experience.position}
        </Text>
        <Text
          style={{
            ...styles.text,
            fontSize: fontSizes.small,
            fontWeight: fontWeights.medium,
            color: colors.text.caption,
          }}
        >
          {formatDate(experience.startDate)} - {formatDate(experience.endDate)}
        </Text>
      </View>

      {/* Location and Work Type */}
      <Text
        style={{
          ...styles.text,
          fontSize: fontSizes.small,
          fontWeight: fontWeights.medium,
          color: colors.text.caption,
        }}
      >
        {experience.location} ({experience.workType})
      </Text>

      {/* Description */}
      <View style={{ ...styles.column, marginTop: 2 }}>
        {descriptionParagraphs.map((paragraph, index) => (
          <View
            key={`${experience.id}-paragraph-${index}`}
            style={{
              ...styles.row,
              alignItems: "flex-start",
              gap: 4,
              marginTop: 0,
            }}
          >
            <Text
              style={{
                ...styles.text,
                fontSize: fontSizes.small,
                color: colors.text.body,
                lineHeight: 1.3,
              }}
            >
              •
            </Text>
            <Text
              style={{
                ...styles.text,
                fontSize: fontSizes.small,
                color: colors.text.body,
                lineHeight: 1.3,
                flex: 1,
              }}
            >
              {paragraph}
            </Text>
          </View>
        ))}
      </View>

      {/* Technologies */}
      <View style={{ ...styles.row, gap: 4, flexWrap: "wrap", marginTop: 2 }}>
        {experience.technologies.map((tech, index) => (
          <Text
            key={index}
            style={{
              ...styles.text,
              fontSize: fontSizes.extraSmall,
              fontWeight: fontWeights.medium,
              color: colors.text.body,
              backgroundColor: colors.chipBg,
              border: `1px solid ${colors.chipBorder}`,
              paddingHorizontal: 6,
              paddingVertical: 2,
              borderRadius: 999,
            }}
          >
            {tech.label}
          </Text>
        ))}
      </View>
    </View>
  );
};

export default PdfExperienceItem;
