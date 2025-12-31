import AppFallback, {
  type AppFallbackProps,
} from "@/components/common/AppFallback";
import { type FC } from "react";

export type AppFallbackWrapperProps = Readonly<{
  children?: React.ReactNode;
  showFallback?: boolean;
  fallbackProps?: AppFallbackProps;
}>;
const AppFallbackWrapper: FC<AppFallbackWrapperProps> = ({
  children,
  showFallback = false,
  fallbackProps = {},
}) => {
  if (showFallback) return <AppFallback {...fallbackProps} />;

  return children;
};

export default AppFallbackWrapper;
