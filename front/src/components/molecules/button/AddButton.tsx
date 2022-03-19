import { memo, VFC } from "react";
import { AddIcon } from "@chakra-ui/icons";

import { DefaultIconButton, Props } from "../../atoms/button/DefaultIconButton";

export const AddButton: VFC<Props> = memo((props) => {
  return (
    <DefaultIconButton icon={<AddIcon />} {...props} />
  );
});
