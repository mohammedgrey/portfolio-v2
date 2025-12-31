import { type FC } from "react";

export type HeaderTextProps = Readonly<object>;
const HeaderText: FC<HeaderTextProps> = () => {
  return (
    <div className="flex flex-col gap-1 p-4 bg-primary/10 rounded-md backdrop-blur-md">
      <h1 className="font-bold text-3xl">Mohammed Dawood</h1>
      <p className="text-muted-foreground text-sm flex gap-1 font-medium items-center">
        Fullstack Engineer | React Expert
      </p>
    </div>
  );
};

export default HeaderText;
