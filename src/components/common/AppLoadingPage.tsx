import Text from "@/components/common/Text";
import { type FC } from "react";

const AppLoadingPage: FC = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md bg-primary/5">
      <div className="flex flex-col items-center animate-pulse gap-2">
        <Text
          translationKey="Metadata.title"
          weight="semibold"
          size="2xl"
          className="text-center"
        />
      </div>
    </div>
  );
};

export default AppLoadingPage;
