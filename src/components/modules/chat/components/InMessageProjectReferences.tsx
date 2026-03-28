import { TechChip } from "@/app/[locale]/sections/main/projects/components/ProjectBadges";
import ProjectDetailsOverlay from "@/app/[locale]/sections/main/projects/components/ProjectDetailsOverlay";
import { FullscreenOverlay } from "@/components/common/FullScreenOverlay";
import useProjects from "@/hooks/data/useProjects";
import { useAppTranslations } from "@/i18n";
import { ProjectType } from "@/types/common";
import { ProjectNameEnum } from "@/types/enums";
import { useState, type FC } from "react";
import InMessageReference from "./InMessageReference";

export type InMessageProjectReferencesProps = Readonly<{
  references: ProjectNameEnum[];
}>;
const InMessageProjectReferences: FC<InMessageProjectReferencesProps> = ({
  references,
}) => {
  const [selectedItem, setSelectedItem] = useState<ProjectType | null>(null);
  const { getProjectsFromTitles } = useProjects();
  const t = useAppTranslations("Chat");
  const closeOverlay = () => setSelectedItem(null);

  const stackItems = getProjectsFromTitles(references);
  return (
    <>
      <InMessageReference title={t("projectReferences.title")}>
        {stackItems.map((item) => (
          <TechChip
            label={item.title}
            key={item.title}
            onClick={() => setSelectedItem(item)}
          />
        ))}
      </InMessageReference>
      {!!selectedItem && (
        <FullscreenOverlay onClose={closeOverlay}>
          <ProjectDetailsOverlay
            project={selectedItem}
            onClose={closeOverlay}
          />
        </FullscreenOverlay>
      )}
    </>
  );
};

export default InMessageProjectReferences;
