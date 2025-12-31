import { CommandIcon } from "@/assets/icons";
import { type FC } from "react";

export type AppShortcutProps = Readonly<{
  letter: string;
}>;
const AppShortcut: FC<AppShortcutProps> = ({ letter }) => {
  return (
    <div className="bg-background items-center px-2 flex gap-2 py-1 rounded-md text-foreground">
      <CommandIcon className="text-foreground h-3 w-3" />
      <span className="font-semibold text-sm">{letter}</span>
    </div>
  );
};

export default AppShortcut;
