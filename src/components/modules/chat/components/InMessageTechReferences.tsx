import { TechChip } from "@/app/[locale]/sections/main/projects/components/ProjectBadges";
import { StackOverlay } from "@/app/[locale]/sections/main/stack/StackOverlay";
import useStackItems from "@/hooks/data/useStackItems";
import { useAppTranslations } from "@/i18n";
import { StackItem } from "@/types/common";
import { TechEnum } from "@/types/enums";
import { useState, type FC } from "react";
import InMessageReference from "./InMessageReference";

export type InMessageTechReferencesProps = Readonly<{
  references: TechEnum[];
}>;
const InMessageTechReferences: FC<InMessageTechReferencesProps> = ({
  references,
}) => {
  const [selectedItem, setSelectedItem] = useState<StackItem | null>(null);
  const { getStackItemsFromTitles } = useStackItems();
  const t = useAppTranslations("Chat");

  const stackItems = getStackItemsFromTitles(references);
  return (
    <>
      <InMessageReference title={t("techReferences.title")}>
        {stackItems.map((item) => (
          <TechChip
            label={item.title}
            key={item.title}
            onClick={() => setSelectedItem(item)}
          />
        ))}
      </InMessageReference>
      {selectedItem && (
        <StackOverlay
          item={selectedItem}
          layoutId={`chat-stack-scene-${selectedItem.id}`}
          onClose={() => setSelectedItem(null)}
        />
      )}
    </>
  );
};

export default InMessageTechReferences;
