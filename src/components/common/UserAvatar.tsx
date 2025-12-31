import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { type FC } from "react";

export type UserAvatarProps = Readonly<{
  name: string;
  imageUrl?: string;
  color?: string;
  className?: string;
}>;
const UserAvatar: FC<UserAvatarProps> = ({
  name,
  imageUrl,
  color,
  className,
}) => {
  return (
    <Avatar className={className}>
      <AvatarImage src={imageUrl} alt={name} />
      <AvatarFallback
        className="bg-primary text-primary-foreground"
        style={{ backgroundColor: color }}
      >
        {name?.charAt(0).toUpperCase()}
      </AvatarFallback>
    </Avatar>
  );
};

export default UserAvatar;
