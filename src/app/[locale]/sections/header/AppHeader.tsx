import { LanguageSwitcher } from "@/components/system/LanguageSwitcher";
import { PrimaryColorSwitcher } from "@/components/system/PrimaryColorSwitcher";
import { ThemeSwitcher } from "@/components/system/ThemeSwitcher";
import { type FC } from "react";

const AppHeader: FC = () => {
  return (
    <header className="flex w-full p-4 justify-between items-start">
      {/* <HeaderText /> */}
      <div />
      <nav className="flex gap-2">
        <PrimaryColorSwitcher />
        <LanguageSwitcher />
        <ThemeSwitcher />
      </nav>
    </header>
  );
};

export default AppHeader;
