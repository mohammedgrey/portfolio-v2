import { ProjectTypeEnum } from "@/types/enums";
import {
  Bot,
  FlaskConical,
  GraduationCap,
  Hotel,
  ShoppingCart,
  Stethoscope,
  Tv2,
} from "lucide-react";

const useDomainIcons = () => {
  const domainIcons: Record<ProjectTypeEnum, React.ReactNode> = {
    [ProjectTypeEnum.ECommerce]: <ShoppingCart className="h-4 w-4" />,
    [ProjectTypeEnum.HealthTech]: <Stethoscope className="h-4 w-4" />,
    [ProjectTypeEnum.EdTech]: <GraduationCap className="h-4 w-4" />,
    [ProjectTypeEnum.Hospitality]: <Hotel className="h-4 w-4" />,
    [ProjectTypeEnum.Entertainment]: <Tv2 className="h-4 w-4" />,
    [ProjectTypeEnum.AiMl]: <Bot className="h-4 w-4" />,
    [ProjectTypeEnum.Engineering]: <FlaskConical className="h-4 w-4" />,
  };

  return domainIcons;
};

export default useDomainIcons;
