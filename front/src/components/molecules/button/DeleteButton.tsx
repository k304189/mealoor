import { memo, VFC } from "react";
import { DeleteIcon } from "@chakra-ui/icons";

import { DefaultIconButton, Props } from "../../atoms/button/DefaultIconButton";

export const DeleteButton: VFC<Props> = memo((props) => {
  return (
    <DefaultIconButton icon={<DeleteIcon />} {...props} />
  );
});
