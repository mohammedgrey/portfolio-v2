import { Skeleton } from "@/components/ui/skeleton";
import { type FC } from "react";

export type AppSkeletonWrapperProps = Readonly<{
  isLoading?: boolean;
  children?: React.ReactNode;
  count?: number;
  height?: string | number;
  width?: string | number;
}>;
const AppSkeletonWrapper: FC<AppSkeletonWrapperProps> = ({
  isLoading,
  children,
  count = 1,
  height,
  width = "100%",
}) => {
  if (isLoading)
    return Array.from({ length: count }).map((_, index) => (
      <Skeleton
        key={index}
        style={{ height, width }}
        className="h-full w-full rounded-md"
      />
    ));
  return children;
};

export default AppSkeletonWrapper;
