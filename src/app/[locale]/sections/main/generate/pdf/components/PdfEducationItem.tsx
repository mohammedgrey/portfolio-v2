import type { EducationItem } from "@/types/common";
import { Text, View } from "@react-pdf/renderer";
import { type FC } from "react";
import type { UsePdfStylesReturn } from "../hooks/usePdfStyles";

interface PdfEducationItemProps {
  education: EducationItem;
  styleUtils: UsePdfStylesReturn;
}

const PdfEducationItem: FC<PdfEducationItemProps> = ({
  education,
  styleUtils,
}) => {
  const { styles, colors, fontSizes, fontWeights } = styleUtils;

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    });
  };

  return (
    <View wrap={false} style={{ ...styles.column, gap: 2, marginBottom: 4 }}>
      {/* Degree and Institution */}
      <View style={{ ...styles.row, justifyContent: "space-between" }}>
        <Text
          style={{
            ...styles.text,
            fontSize: fontSizes.medium,
            fontWeight: fontWeights.semiBold,
            color: colors.text.title,
          }}
        >
          {education.degree} - {education.institution}
        </Text>
        <Text
          style={{
            ...styles.text,
            fontSize: fontSizes.small,
            fontWeight: fontWeights.medium,
            color: colors.text.caption,
          }}
        >
          {formatDate(education.graduationDate)}
        </Text>
      </View>

      {/* Location and Score/GPA */}
      <View style={{ ...styles.row, gap: 8 }}>
        <Text
          style={{
            ...styles.text,
            fontSize: fontSizes.small,
            fontWeight: fontWeights.medium,
            color: colors.text.caption,
          }}
        >
          {education.location}
        </Text>
        {education.gpa && (
          <>
            <Text
              style={{
                ...styles.text,
                fontSize: fontSizes.small,
                fontWeight: fontWeights.medium,
                color: colors.text.caption,
              }}
            >
              •
            </Text>
            <Text
              style={{
                ...styles.text,
                fontSize: fontSizes.small,
                fontWeight: fontWeights.medium,
                color: colors.text.body,
              }}
            >
              GPA: {education.gpa}
            </Text>
          </>
        )}
        {education.score && (
          <>
            <Text
              style={{
                ...styles.text,
                fontSize: fontSizes.small,
                fontWeight: fontWeights.medium,
                color: colors.text.caption,
              }}
            >
              •
            </Text>
            <Text
              style={{
                ...styles.text,
                fontSize: fontSizes.small,
                fontWeight: fontWeights.medium,
                color: colors.text.body,
              }}
            >
              Score: {education.score}
            </Text>
          </>
        )}
      </View>
    </View>
  );
};

export default PdfEducationItem;
