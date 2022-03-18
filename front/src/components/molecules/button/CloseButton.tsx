import { memo, VFC } from "react";
import { CloseIcon } from "@chakra-ui/icons";

import { DefaultIconButton, Props } from "../../atoms/button/DefaultIconButton";

export const CloseButton: VFC<Props> = memo((props) => {
  return (
    <DefaultIconButton icon={<CloseIcon />} {...props} />
  );
});
