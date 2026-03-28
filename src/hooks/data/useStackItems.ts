import { useAppTranslations } from "@/i18n";
import { StackItem } from "@/types/common";
import { TechEnum } from "@/types/enums";

const useStackItems = () => {
  const t = useAppTranslations("HomePage");

  const stackItems: StackItem[] = [
    {
      id: "react",
      title: TechEnum.React,
      description: t("stack.react.description"),
      model: "/assets/models/react.glb",
      color: "#61DAFB",
      expertise: 5,
    },
    {
      id: "nextjs",
      title: TechEnum.NextJS,
      description: t("stack.nextjs.description"),
      model: "/assets/models/next.glb",
      color: "#ffffff",
      expertise: 5,
    },
    {
      id: "typescript",
      title: TechEnum.Typescript,
      description: t("stack.typescript.description"),
      model: "/assets/models/typescript.glb",
      color: "#007ACC",
      expertise: 5,
    },
    {
      id: "node",
      title: TechEnum.NodeJS,
      description: t("stack.node.description"),
      model: "/assets/models/node.glb",
      color: "#83CD29",
      expertise: 4,
    },

    {
      id: "ai",
      title: TechEnum.AI,
      description: t("stack.ai.description"),
      model: "/assets/models/ai.glb",
      color: "#ffffff",
      expertise: 4,
    },
    {
      id: "flutter",
      title: TechEnum.Flutter,
      description: t("stack.flutter.description"),
      model: "/assets/models/flutter.glb",
      color: "#46d0fe",
      expertise: 4,
    },
    {
      id: "vue",
      title: TechEnum.Vue,
      description: t("stack.vue.description"),
      model: "/assets/models/vue.glb",
      color: "#41B883",
      expertise: 4,
    },
    {
      id: "docker",
      title: TechEnum.Docker,
      description: t("stack.docker.description"),
      model: "/assets/models/docker.glb",
      color: "#0091e2",
      expertise: 3,
    },
  ] as StackItem[];

  const getStackItemsFromTitles = (titles: TechEnum[]) => {
    return stackItems.filter((item) => titles.includes(item.title));
  };

  return {
    stackItems,
    getStackItemsFromTitles,
  };
};
export default useStackItems;

export type UseStackItemsReturn = ReturnType<typeof useStackItems>;
