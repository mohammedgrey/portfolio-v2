import { LanguageSwitcher } from "@/components/system/LanguageSwitcher";
import { PrimaryColorSwitcher } from "@/components/system/PrimaryColorSwitcher";
import { ThemeSwitcher } from "@/components/system/ThemeSwitcher";
import { type FC } from "react";
import HeaderText from "./HeaderText";

const AppHeader: FC = () => {
  return (
    <header className="flex w-full items-start justify-between gap-3 p-4 sm:gap-4 sm:items-center">
      <HeaderText />
      <nav className="flex shrink-0 gap-2">
        <PrimaryColorSwitcher />
        <LanguageSwitcher />
        <ThemeSwitcher />
      </nav>
    </header>
  );
};

export default AppHeader;
