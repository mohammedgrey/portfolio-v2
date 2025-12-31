import { cn } from "@/lib/utils";
import { parseAsInteger, useQueryState } from "nuqs";
import { useState, type FC, type ReactNode } from "react";

export type AppTabsProps = Readonly<{
  tabs: { label: string; content: ReactNode }[];
  defaultTabIndex?: number;
  variant?: "underlined" | "contained";
  saveTabToQuery?: boolean;
  resetOtherQueriesOnTabChange?: boolean;
  queryKey?: string;
  tabsContainerClassName?: string;
  contentContainerClassName?: string;
  containerClassName?: string;
  endContent?: ReactNode;
}>;

const AppTabs: FC<AppTabsProps> = ({
  tabs,
  defaultTabIndex = 0,
  variant = "underlined",
  saveTabToQuery = false,
  resetOtherQueriesOnTabChange = false,
  tabsContainerClassName = "",
  queryKey = "tab",
  contentContainerClassName = "",
  containerClassName = "",
  endContent = null,
}) => {
  const [queryTab, setQueryTab] = useQueryState(
    queryKey,
    parseAsInteger.withDefault(defaultTabIndex)
  );

  const [localTab, setLocalTab] = useState(defaultTabIndex);

  if (!tabs?.length) return null;

  const activeTab = saveTabToQuery ? queryTab ?? defaultTabIndex : localTab;

  const handleTabChange = (newValue: number) => {
    if (saveTabToQuery) {
      if (resetOtherQueriesOnTabChange)
        window.history.replaceState({}, "", `${window.location.pathname}`);
      setQueryTab(newValue);
    } else {
      setLocalTab(newValue);
    }
  };

  const baseTabClasses = "px-4 py-2 text-sm transition-colors duration-200";

  const underlinedClasses = {
    inactive:
      "text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-gray-100 border-b-2 border-transparent",
    active: "text-primary border-b-2 border-primary",
  };

  const containedClasses = {
    inactive:
      "text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-gray-100 border-e [&:last-child]:border-transparent",
    active: "text-white bg-primary hover:bg-primary/90",
  };

  const variantClasses =
    variant === "contained" ? containedClasses : underlinedClasses;

  return (
    <div className={cn("flex w-full gap-4 flex-col", containerClassName)}>
      <div
        className={cn(
          "flex w-full justify-between flex-col md:flex-row md:items-center gap-4",
          tabsContainerClassName
        )}
      >
        <div
          className={cn(
            "flex border-border/50",
            variant === "underlined" && "border-b grow",
            variant === "contained" &&
              "rounded-md overflow-hidden bg-muted self-start border border-gray-200 dark:border-gray-700"
          )}
        >
          {tabs?.map((tab, index) => (
            <button
              key={index}
              className={cn(
                baseTabClasses,
                activeTab === index
                  ? variantClasses.active
                  : variantClasses.inactive
              )}
              onClick={() => handleTabChange(index)}
              role="tab"
              aria-selected={activeTab === index}
              aria-controls={`tabpanel-${index}`}
              id={`tab-${index}`}
            >
              {tab.label}
            </button>
          ))}
        </div>
        {endContent}
      </div>

      <div
        className={cn(contentContainerClassName)}
        role="tabpanel"
        id={`tabpanel-${activeTab}`}
        aria-labelledby={`tab-${activeTab}`}
      >
        {tabs?.[activeTab]?.content}
      </div>
    </div>
  );
};

export default AppTabs;
