/* eslint-disable jsx-a11y/alt-text */
import { personalInfo } from "@/data/personalInfo";
import { Image, Text, View } from "@react-pdf/renderer";
import { type FC } from "react";
import type { UsePdfStylesReturn } from "../hooks/usePdfStyles";

interface PdfHeaderProps {
  styleUtils: UsePdfStylesReturn;
}

const PdfHeader: FC<PdfHeaderProps> = ({ styleUtils }) => {
  const { styles, colors, fontSizes, fontWeights } = styleUtils;

  return (
    <View
      style={{
        ...styles.row,
        gap: 16,
        alignItems: "center",
        paddingBottom: 16,
      }}
    >
      {/* Profile Image */}
      <Image
        src={personalInfo.profileImage}
        style={{
          width: 80,
          height: 80,
          borderRadius: 40,
          objectFit: "cover",
        }}
      />

      {/* Name and Contact Info */}
      <View
        style={{
          ...styles.column,
          flex: 1,
          gap: 4,
        }}
      >
        <Text
          style={{
            ...styles.text,
            fontSize: fontSizes.extraLarge,
            fontWeight: fontWeights.bold,
            color: colors.primary,
            letterSpacing: 0.2,
          }}
        >
          {personalInfo.name}
        </Text>
        <Text
          style={{
            ...styles.text,
            fontSize: fontSizes.medium,
            fontWeight: fontWeights.medium,
            color: colors.text.body,
          }}
        >
          {personalInfo.title}
        </Text>

        <View style={{ ...styles.row, gap: 8, marginTop: 4 }}>
          <Text
            style={{
              ...styles.text,
              fontSize: fontSizes.small,
              fontWeight: fontWeights.medium,
              color: colors.text.caption,
            }}
          >
            {personalInfo.email}
          </Text>
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
              color: colors.text.caption,
            }}
          >
            {personalInfo.phone}
          </Text>
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
              color: colors.text.caption,
            }}
          >
            {personalInfo.location.fullAddress}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default PdfHeader;
