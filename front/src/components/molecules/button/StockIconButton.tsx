import { memo, VFC } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBoxOpen } from "@fortawesome/free-solid-svg-icons";

import { DefaultButton, Props } from "../../atoms/button/DefaultButton";

export const StockIconButton: VFC<Props> = memo((props) => {
  return (
    <DefaultButton {...props}>
      <FontAwesomeIcon icon={faBoxOpen} />
    </DefaultButton>
  );
});
