import useEducation from "@/hooks/data/useEducation";
import useExperience from "@/hooks/data/useExperience";
import useInterests from "@/hooks/data/useInterests";
import useSkills from "@/hooks/data/useSkills";
import { Page, View } from "@react-pdf/renderer";
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

  return (
    <Page size="A4" style={styles.page}>
      {/* Header with profile and contact info */}
      <PdfHeader styleUtils={styleUtils} />

      {/* Skills Section */}
      {config?.showSkills !== false && (
        <PdfSection title="SKILLS" styleUtils={styleUtils}>
          <PdfSkillsGrid
            skillCategories={skillCategories}
            styleUtils={styleUtils}
          />
        </PdfSection>
      )}

      {/* Experience Section */}
      {config?.showExperience !== false && (
        <PdfSection title="EXPERIENCE" styleUtils={styleUtils}>
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
        <PdfSection title="EDUCATION" styleUtils={styleUtils}>
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
        <PdfSection title="INTERESTS & ACTIVITIES" styleUtils={styleUtils}>
          <PdfInterests
            interests={interestItems}
            languages={languages}
            styleUtils={styleUtils}
          />
        </PdfSection>
      )}
    </Page>
  );
};

export default PdfContent;
