import { ProjectTypeEnum } from "@/types/enums";
import {
  Bot,
  Building2,
  Cpu,
  Gamepad2,
  GraduationCap,
  Hotel,
  MessageSquare,
  Music,
  Network,
  Package,
  Search,
  ShoppingCart,
  Truck,
} from "lucide-react";

const useDomainIcons = () => {
  const domainIcons: Record<ProjectTypeEnum, React.ReactNode> = {
    [ProjectTypeEnum.Education]: <GraduationCap className="h-4 w-4" />,
    [ProjectTypeEnum.Messaging]: <MessageSquare className="h-4 w-4" />,
    [ProjectTypeEnum.Delivery]: <Truck className="h-4 w-4" />,
    [ProjectTypeEnum.Enterprise]: <Building2 className="h-4 w-4" />,
    [ProjectTypeEnum.Hospitality]: <Hotel className="h-4 w-4" />,
    [ProjectTypeEnum.Ecommerce]: <ShoppingCart className="h-4 w-4" />,
    [ProjectTypeEnum.Logistics]: <Package className="h-4 w-4" />,
    [ProjectTypeEnum.Search]: <Search className="h-4 w-4" />,
    [ProjectTypeEnum.Entertainment]: <Music className="h-4 w-4" />,
    [ProjectTypeEnum.Gaming]: <Gamepad2 className="h-4 w-4" />,
    [ProjectTypeEnum.AiMl]: <Bot className="h-4 w-4" />,
    [ProjectTypeEnum.Hardware]: <Cpu className="h-4 w-4" />,
    [ProjectTypeEnum.Networking]: <Network className="h-4 w-4" />,
  };

  return domainIcons;
};

export default useDomainIcons;
