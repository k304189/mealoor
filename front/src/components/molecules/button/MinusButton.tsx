import { memo, VFC } from "react";
import { MinusIcon } from "@chakra-ui/icons";

import { DefaultIconButton, Props } from "../../atoms/button/DefaultIconButton";

export const MinusButton: VFC<Props> = memo((props) => {
  return (
    <DefaultIconButton icon={<MinusIcon />} {...props} />
  );
});
