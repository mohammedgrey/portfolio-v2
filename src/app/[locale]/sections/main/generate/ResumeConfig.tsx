"use client";

import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useAppTranslations } from "@/i18n";
import { AnalyticsEvent, trackEvent } from "@/lib/analytics";
import { type FC, useState } from "react";

interface ResumeConfigProps {
  onConfigChange?: (config: ResumeConfigState) => void;
}

export interface ResumeConfigState {
  showSkills: boolean;
  showExperience: boolean;
  showEducation: boolean;
  showInterests: boolean;
}

const ResumeConfig: FC<ResumeConfigProps> = ({ onConfigChange }) => {
  const t = useAppTranslations("HomePage");

  const [config, setConfig] = useState<ResumeConfigState>({
    showSkills: true,
    showExperience: true,
    showEducation: true,
    showInterests: true,
  });

  const handleToggle = (key: keyof ResumeConfigState) => {
    const newConfig = { ...config, [key]: !config[key] };
    setConfig(newConfig);
    onConfigChange?.(newConfig);
    trackEvent(AnalyticsEvent.ResumeConfigChange, {
      section: key,
      enabled: newConfig[key],
    });
  };

  return (
    <div className="space-y-4">
      <Card className="p-6 space-y-6">
        <div className="space-y-2">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            {t("generate.customize")}
          </h3>
          <p className="text-sm text-muted-foreground">
            {t("generate.customizeDesc")}
          </p>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="show-skills" className="cursor-pointer">
              {t("generate.sections.skills")}
            </Label>
            <Switch
              id="show-skills"
              checked={config.showSkills}
              onCheckedChange={() => handleToggle("showSkills")}
            />
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="show-experience" className="cursor-pointer">
              {t("generate.sections.experience")}
            </Label>
            <Switch
              id="show-experience"
              checked={config.showExperience}
              onCheckedChange={() => handleToggle("showExperience")}
            />
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="show-education" className="cursor-pointer">
              {t("generate.sections.education")}
            </Label>
            <Switch
              id="show-education"
              checked={config.showEducation}
              onCheckedChange={() => handleToggle("showEducation")}
            />
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="show-interests" className="cursor-pointer">
              {t("generate.sections.interests")}
            </Label>
            <Switch
              id="show-interests"
              checked={config.showInterests}
              onCheckedChange={() => handleToggle("showInterests")}
            />
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ResumeConfig;
