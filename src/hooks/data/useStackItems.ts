import { StackItem } from "@/types/common";

const useStackItems = () => {
  const stackItems: StackItem[] = [
    {
      id: "react",
      title: "React",
      description: "UI library for building component-based interfaces",
      model: "/assets/models/react.glb",
      color: "#61DAFB",
    },
    {
      id: "nextjs",
      title: "Next.js",
      description: "React framework for production",
      model: "/assets/models/next.glb",
      color: "#ffffff",
    },
    {
      id: "typescript",
      title: "TypeScript",
      description: "Typed superset of JavaScript",
      model: "/assets/models/typescript.glb",
      color: "#007ACC",
    },
    {
      id: "node",
      title: "Node.js",
      description: "JavaScript runtime built on Chrome's V8 JavaScript engine",
      model: "/assets/models/node.glb",
      color: "#83CD29",
    },
    {
      id: "docker",
      title: "Docker",
      description:
        "Platform for developing, shipping, and running applications",
      model: "/assets/models/docker.glb",
      color: "#0091e2",
    },
    {
      id: "ai",
      title: "AI",
      description: "Artificial Intelligence technologies and frameworks",
      model: "/assets/models/ai.glb",
      color: "#ffffff",
    },
    {
      id: "flutter",
      title: "Flutter",
      description: "UI toolkit for building natively compiled applications",
      model: "/assets/models/flutter.glb",
      color: "#46d0fe",
    },
    {
      id: "vue",
      title: "Vue.js",
      description: "JavaScript framework for building user interfaces",
      model: "/assets/models/vue.glb",
      color: "#41B883",
    },
  ];

  return {
    stackItems,
  };
};
export default useStackItems;

export type UseStackItemsReturn = ReturnType<typeof useStackItems>;
