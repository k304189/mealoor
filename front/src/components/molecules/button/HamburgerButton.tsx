import { memo, VFC } from "react";
import { HamburgerIcon } from "@chakra-ui/icons";

import { DefaultIconButton, Props } from "../../atoms/button/DefaultIconButton";

export const HamburgerButton: VFC<Props> = memo((props) => {
  return (
    <DefaultIconButton icon={<HamburgerIcon />} {...props} />
  );
});
