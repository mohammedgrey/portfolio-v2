/* eslint-disable jsx-a11y/alt-text */
import { socials } from "@/data/socials";
import useEducation from "@/hooks/data/useEducation";
import useExperience from "@/hooks/data/useExperience";
import useInterests from "@/hooks/data/useInterests";
import useSkills from "@/hooks/data/useSkills";
import { Image, Link, Page, Text, View } from "@react-pdf/renderer";
import { type FC } from "react";
import { ResumeConfigState } from "../ResumeConfig";
import PdfEducationItem from "./components/PdfEducationItem";
import PdfExperienceItem from "./components/PdfExperienceItem";
import PdfHeader from "./components/PdfHeader";
import PdfInterests from "./components/PdfInterests";
import PdfSection from "./components/PdfSection";
import PdfSkillsGrid from "./components/PdfSkillsGrid";
import usePdfStyles from "./hooks/usePdfStyles";

interface PdfContentProps {
  config?: ResumeConfigState;
}

const PdfContent: FC<PdfContentProps> = ({ config }) => {
  const styleUtils = usePdfStyles();
  const { styles } = styleUtils;

  // Get data from hooks
  const { experienceItems } = useExperience();
  const { skillCategories } = useSkills();
  const { educationItems } = useEducation();
  const { interestItems, languages } = useInterests();
  const languagesText = languages
    .map((lang) => `${lang.language} (${lang.proficiency})`)
    .join("  •  ");
  const socialIconMap: Record<string, string> = {
    github: "/assets/icons/icons8/github-icon.png",
    linkedin: "/assets/icons/icons8/linkedin-icon.png",
    whatsapp: "/assets/icons/icons8/whatsapp-icon.png",
  };
  const githubLink =
    socials.find((social) => social.title.toLowerCase().includes("github"))
      ?.link || "https://github.com/mohammedgrey";
  const linkedinLink =
    socials.find((social) => social.title.toLowerCase().includes("linkedin"))
      ?.link || "https://www.linkedin.com/in/mohammedddawoodd";
  const whatsappLink =
    socials.find((social) => social.title.toLowerCase().includes("whats"))
      ?.link || "https://wa.me/966536209769";
  const footerSocials = [
    { key: "github", link: githubLink },
    { key: "linkedin", link: linkedinLink },
    { key: "whatsapp", link: whatsappLink },
  ];

  return (
    <Page size="A4" style={styles.page}>
      {/* Header with profile and contact info */}
      <PdfHeader styleUtils={styleUtils} />

      {/* Skills Section */}
      {config?.showSkills !== false && (
        <View style={{ marginBottom: 6 }}>
          <PdfSection
            title="SKILLS"
            styleUtils={styleUtils}
            iconSrc="/assets/icons/icons8/section-skills-icon.png"
          >
            <PdfSkillsGrid
              skillCategories={skillCategories}
              styleUtils={styleUtils}
            />
          </PdfSection>
        </View>
      )}

      {/* Experience Section */}
      {config?.showExperience !== false && (
        <PdfSection
          title="EXPERIENCE"
          styleUtils={styleUtils}
          iconSrc="/assets/icons/icons8/section-experience-icon.png"
        >
          <View style={{ ...styles.column, gap: 8 }}>
            {experienceItems.map((experience) => (
              <PdfExperienceItem
                key={experience.id}
                experience={experience}
                styleUtils={styleUtils}
              />
            ))}
          </View>
        </PdfSection>
      )}

      {/* Education Section */}
      {config?.showEducation !== false && (
        <PdfSection
          title="EDUCATION"
          styleUtils={styleUtils}
          iconSrc="/assets/icons/icons8/section-education-icon.png"
        >
          <View style={{ ...styles.column, gap: 6 }}>
            {educationItems.map((education) => (
              <PdfEducationItem
                key={education.id}
                education={education}
                styleUtils={styleUtils}
              />
            ))}
          </View>
        </PdfSection>
      )}

      {/* Interests & Activities Section */}
      {config?.showInterests !== false && (
        <PdfSection
          title="INTERESTS & ACTIVITIES"
          styleUtils={styleUtils}
          iconSrc="/assets/icons/icons8/section-interests-icon.png"
        >
          <PdfInterests
            interests={interestItems}
            languages={languages}
            styleUtils={styleUtils}
            showLanguages={false}
          />
        </PdfSection>
      )}

      {/* Footer Languages */}
      {(languages.length > 0 || socials.length > 0) && (
        <View
          style={{
            ...styles.footer,
            left: 24,
            right: 24,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              flexGrow: 1,
              flexShrink: 1,
              maxWidth: "78%",
              marginRight: 10,
            }}
          >
            {languages.length > 0 && (
              <>
                <Image
                  src="/assets/icons/icons8/globe-icon.png"
                  style={{
                    width: 10,
                    height: 10,
                    objectFit: "contain",
                    marginRight: 5,
                  }}
                />
                <Text
                  style={{
                    ...styles.text,
                    fontSize: styleUtils.fontSizes.small,
                    fontWeight: styleUtils.fontWeights.semiBold,
                    color: styleUtils.colors.text.title,
                    marginRight: 4,
                  }}
                >
                  Languages:
                </Text>
                <Text
                  style={{
                    ...styles.text,
                    fontSize: styleUtils.fontSizes.small,
                    fontWeight: styleUtils.fontWeights.medium,
                    color: styleUtils.colors.text.body,
                    flexShrink: 1,
                    lineHeight: 1.2,
                  }}
                >
                  {languagesText}
                </Text>
              </>
            )}
          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "flex-end",
              flexShrink: 0,
              width: 84,
            }}
          >
            {footerSocials.map((social) => (
              <View
                key={social.key}
                style={{
                  width: 24,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Link src={social.link}>
                  <Image
                    src={socialIconMap[social.key]}
                    style={{
                      width: social.key === "whatsapp" ? 17 : 16,
                      height: social.key === "whatsapp" ? 17 : 16,
                      objectFit: "contain",
                    }}
                  />
                </Link>
              </View>
            ))}
          </View>
        </View>
      )}
    </Page>
  );
};

export default PdfContent;
