import UserAvatar from "@/components/common/UserAvatar";
import { type FC } from "react";

export type UserPreviewProps = Readonly<{
  name: string;
  email: string;
  avatarUrl?: string;
}>;
const UserPreview: FC<UserPreviewProps> = ({ name, email, avatarUrl }) => {
  return (
    <div className="flex items-center gap-2">
      <UserAvatar name={name} imageUrl={avatarUrl} />
      <div>
        <div className="">{name}</div>
        <div className="text-xs text-muted-foreground">{email}</div>
      </div>
    </div>
  );
};

export default UserPreview;
