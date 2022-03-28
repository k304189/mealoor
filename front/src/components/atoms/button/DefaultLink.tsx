import { memo, VFC } from "react";
import { Button, ButtonProps } from "@chakra-ui/react";

export const DefaultLink: VFC<ButtonProps> = memo((props) => {
  return (
    <Button {...props} variant="link" size="sm" />
  );
});
