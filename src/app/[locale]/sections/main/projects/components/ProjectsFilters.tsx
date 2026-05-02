"use client";

import { CalendarIcon } from "@/assets/icons";
import MultiSelect, {
  SelectOption,
  SelectOptionValue,
} from "@/components/ui/multi-select";
import useDomainIcons from "@/hooks/logic/useDomainIcons";
import { useAppTranslations } from "@/i18n";
import { AnalyticsEvent, trackEvent } from "@/lib/analytics";
import { ProjectTypeEnum } from "@/types/enums";
import { Code2, Layers } from "lucide-react";
import { FC } from "react";

interface ProjectsFiltersProps {
  typeOptions: SelectOption[];
  techOptions: SelectOption[];
  yearOptions: SelectOption[];
  selectedTypes: SelectOptionValue[];
  setSelectedTypes: (types: SelectOptionValue[]) => void;
  selectedTechs: SelectOptionValue[];
  setSelectedTechs: (techs: SelectOptionValue[]) => void;
  selectedYears: SelectOptionValue[];
  setSelectedYears: (years: SelectOptionValue[]) => void;
}

const ProjectsFilters: FC<ProjectsFiltersProps> = ({
  typeOptions,
  techOptions,
  yearOptions,
  selectedTypes,
  setSelectedTypes,
  selectedTechs,
  setSelectedTechs,
  selectedYears,
  setSelectedYears,
}) => {
  const t = useAppTranslations("HomePage");
  const domainIcons = useDomainIcons();

  // Localize year options
  const localizedYearOptions = yearOptions.map((option) => ({
    ...option,
    label:
      option.label === "currentYear" ? t("projects.currentYear") : option.label,
  }));

  const trackFilter = (
    filterType: "type" | "tech" | "year",
    values: SelectOptionValue[],
  ) => {
    trackEvent(AnalyticsEvent.ProjectFilterChange, {
      filterType,
      values: values.join(","),
      count: values.length,
    });
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-8">
      <MultiSelect
        options={typeOptions}
        value={selectedTypes}
        onChange={(values) => {
          setSelectedTypes(values);
          trackFilter("type", values);
        }}
        placeholder={t("projects.filters.type")}
        clearable
        icon={<Layers className="h-4 w-4" />}
        renderOption={({ label, value }) => (
          <div className="flex items-center gap-2">
            {domainIcons[value as ProjectTypeEnum]} {label}
          </div>
        )}
        renderChip={({ label, value }) => (
          <div className="flex items-center gap-1.5">
            <span className="[&>svg]:h-3 [&>svg]:w-3 shrink-0">
              {domainIcons[value as ProjectTypeEnum]}
            </span>
            {label}
          </div>
        )}
      />
      <MultiSelect
        options={techOptions}
        value={selectedTechs}
        onChange={(values) => {
          setSelectedTechs(values);
          trackFilter("tech", values);
        }}
        placeholder={t("projects.filters.tech")}
        clearable
        icon={<Code2 className="h-4 w-4" />}
      />
      <MultiSelect
        options={localizedYearOptions}
        value={selectedYears}
        onChange={(values) => {
          setSelectedYears(values);
          trackFilter("year", values);
        }}
        placeholder={t("projects.filters.year")}
        clearable
        icon={<CalendarIcon className="h-4 w-4" />}
      />
    </div>
  );
};

export default ProjectsFilters;
