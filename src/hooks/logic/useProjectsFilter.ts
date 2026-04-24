import { SelectOption, SelectOptionValue } from "@/components/ui/multi-select";
import { ProjectType } from "@/types/common";
import { useMemo, useState } from "react";

interface UseProjectsFilterReturn {
  selectedTypes: SelectOptionValue[];
  setSelectedTypes: (types: SelectOptionValue[]) => void;
  selectedTechs: SelectOptionValue[];
  setSelectedTechs: (techs: SelectOptionValue[]) => void;
  selectedYears: SelectOptionValue[];
  setSelectedYears: (years: SelectOptionValue[]) => void;
  resetFilters: () => void;
  hasActiveFilters: boolean;
  typeOptions: SelectOption[];
  techOptions: SelectOption[];
  yearOptions: SelectOption[];
  filteredProjects: ProjectType[];
}

export const useProjectsFilter = (
  projects: ProjectType[],
): UseProjectsFilterReturn => {
  const [selectedTypes, setSelectedTypes] = useState<SelectOptionValue[]>([]);
  const [selectedTechs, setSelectedTechs] = useState<SelectOptionValue[]>([]);
  const [selectedYears, setSelectedYears] = useState<SelectOptionValue[]>([]);

  const resetFilters = () => {
    setSelectedTypes([]);
    setSelectedTechs([]);
    setSelectedYears([]);
  };

  const hasActiveFilters =
    selectedTypes.length > 0 ||
    selectedTechs.length > 0 ||
    selectedYears.length > 0;

  const typeOptions = useMemo(() => {
    const uniqueTypes = Array.from(new Set(projects.map((p) => p.type.value)));
    return uniqueTypes.map((value) => {
      const project = projects.find((p) => p.type.value === value);
      return { value, label: project!.type.label };
    });
  }, [projects]);

  const techOptions = useMemo(() => {
    const allTechs = projects.flatMap((p) => p.details.techs);
    const countByValue = allTechs.reduce<Record<string, number>>((acc, t) => {
      acc[t.value as string] = (acc[t.value as string] ?? 0) + 1;
      return acc;
    }, {});
    const firstSeenIndexByValue = allTechs.reduce<Record<string, number>>(
      (acc, t, idx) => {
        const value = t.value as string;
        if (acc[value] === undefined) {
          acc[value] = idx;
        }
        return acc;
      },
      {},
    );
    const uniqueTechs = Array.from(new Set(allTechs.map((t) => t.value)));
    return uniqueTechs
      .filter((value) => (countByValue[value as string] ?? 0) >= 2)
      .sort((a, b) => {
        const countDiff =
          (countByValue[b as string] ?? 0) - (countByValue[a as string] ?? 0);
        if (countDiff !== 0) {
          return countDiff;
        }

        const firstSeenDiff =
          (firstSeenIndexByValue[a as string] ?? Number.MAX_SAFE_INTEGER) -
          (firstSeenIndexByValue[b as string] ?? Number.MAX_SAFE_INTEGER);
        if (firstSeenDiff !== 0) {
          return firstSeenDiff;
        }

        const labelA = allTechs.find((t) => t.value === a)?.label ?? "";
        const labelB = allTechs.find((t) => t.value === b)?.label ?? "";
        return labelA.localeCompare(labelB);
      })
      .map((value) => {
        const tech = allTechs.find((t) => t.value === value);
        return { value, label: tech!.label };
      });
  }, [projects]);

  const yearOptions = useMemo(() => {
    const currentYear = new Date().getFullYear();
    const years: SelectOption[] = [];

    for (let year = currentYear; year >= 2020; year--) {
      years.push({
        value: year.toString(),
        label: year === currentYear ? "currentYear" : year.toString(),
      });
    }

    return years;
  }, []);

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const typeMatch =
        selectedTypes.length === 0 ||
        selectedTypes.includes(project.type.value);
      const techMatch =
        selectedTechs.length === 0 ||
        project.details.techs.some((tech) =>
          selectedTechs.includes(tech.value),
        );
      const yearMatch =
        selectedYears.length === 0 ||
        selectedYears.includes(project.year.toString());
      return typeMatch && techMatch && yearMatch;
    });
  }, [projects, selectedTypes, selectedTechs, selectedYears]);

  return {
    selectedTypes,
    setSelectedTypes,
    selectedTechs,
    setSelectedTechs,
    selectedYears,
    setSelectedYears,
    resetFilters,
    hasActiveFilters,
    typeOptions,
    techOptions,
    yearOptions,
    filteredProjects,
  };
};
