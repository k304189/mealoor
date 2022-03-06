import { memo, VFC } from "react";
import { forwardRef, Avatar, AvatarProps } from "@chakra-ui/react";
import { systemComponentColor } from "../../../theme/systemTheme";

export const DefaultAvatar: VFC<AvatarProps> = memo(forwardRef((props, ref) => {
  return (
    <Avatar {...props} bg={systemComponentColor} ref={ref} />
  );
}));
