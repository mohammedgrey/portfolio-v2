/* eslint-disable jsx-a11y/alt-text */
import { personalInfo } from "@/data/personalInfo";
import { Image, Link, Text, View } from "@react-pdf/renderer";
import { type FC } from "react";
import type { UsePdfStylesReturn } from "../hooks/usePdfStyles";

interface PdfHeaderProps {
  styleUtils: UsePdfStylesReturn;
}

type HeaderIconName = "email" | "phone" | "location" | "link";

const HeaderIcon: FC<{
  name: HeaderIconName;
  size?: number;
}> = ({ name, size = 9 }) => {
  const iconPathMap: Record<HeaderIconName, string> = {
    email: "/assets/icons/icons8/email-icon.png",
    phone: "/assets/icons/icons8/phone-icon.png",
    location: "/assets/icons/icons8/location-icon.png",
    link: "/assets/icons/icons8/link-icon.png",
  };

  return (
    <Image
      src={iconPathMap[name]}
      style={{ width: size, height: size, objectFit: "contain" }}
    />
  );
};

const PdfHeader: FC<PdfHeaderProps> = ({ styleUtils }) => {
  const { styles, colors, fontSizes, fontWeights } = styleUtils;
  const portfolioUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://github.com/mohammedgrey";
  const normalizedPhone = personalInfo.phone.replace(/\s+/g, "");
  const mapsQuery = encodeURIComponent(personalInfo.location.fullAddress);

  const contactItems: Array<{
    key: string;
    icon: HeaderIconName;
    value: string;
    href: string;
  }> = [
    {
      key: "email",
      icon: "email",
      value: personalInfo.email,
      href: `mailto:${personalInfo.email}`,
    },
    {
      key: "phone",
      icon: "phone",
      value: personalInfo.phone,
      href: `tel:${normalizedPhone}`,
    },
    {
      key: "location",
      icon: "location",
      value: personalInfo.location.fullAddress,
      href: `https://maps.google.com/?q=${mapsQuery}`,
    },
    {
      key: "portfolio",
      icon: "link",
      value: portfolioUrl,
      href: portfolioUrl,
    },
  ];
  const contactRows = [contactItems.slice(0, 2), contactItems.slice(2, 4)];

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

        <View style={{ ...styles.column, gap: 3, marginTop: 6 }}>
          {contactRows.map((row, rowIndex) => (
            <View
              key={`contact-row-${rowIndex}`}
              style={{ ...styles.row, gap: 8, alignItems: "center" }}
            >
              {row.map((item) => (
                <View
                  key={item.key}
                  style={{
                    ...styles.row,
                    alignItems: "center",
                    gap: 5,
                    flex: 1,
                  }}
                >
                  <HeaderIcon name={item.icon} />
                  <Link src={item.href} style={{ flexShrink: 1, flexGrow: 1 }}>
                    <Text
                      style={{
                        ...styles.text,
                        fontSize:
                          item.key === "portfolio"
                            ? fontSizes.extraSmall
                            : fontSizes.small,
                        fontWeight: fontWeights.medium,
                        color: colors.text.body,
                        textDecoration: "underline",
                        flexShrink: 1,
                        lineHeight: 1.2,
                      }}
                    >
                      {item.value}
                    </Text>
                  </Link>
                </View>
              ))}
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};

export default PdfHeader;
