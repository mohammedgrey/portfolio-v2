import type { AppFallbackProps } from "@/components/common/AppFallback";
import AppFallback from "@/components/common/AppFallback";
import AppSkeletonWrapper from "@/components/common/AppSkeletonWrapper";
import { type FC } from "react";

export type AppGridContainerProps = Readonly<{
  children?: React.ReactNode;
  isLoading?: boolean;
  skeletonHeight?: number;
  skeletonCount?: number;
  shouldShowFallback?: boolean;
  fallbackProps?: AppFallbackProps;
}>;

const AppGridContainer: FC<AppGridContainerProps> = ({
  children,
  isLoading,
  skeletonHeight = 200,
  skeletonCount = 3,
  shouldShowFallback = false,
  fallbackProps,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <AppSkeletonWrapper
        isLoading={isLoading}
        count={skeletonCount}
        height={skeletonHeight}
      >
        {shouldShowFallback ? (
          <div
            style={{ height: `${skeletonHeight}px` }}
            className="col-span-full justify-center flex items-center"
          >
            <AppFallback {...fallbackProps} />
          </div>
        ) : (
          children
        )}
      </AppSkeletonWrapper>
    </div>
  );
};

export default AppGridContainer;
