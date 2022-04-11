import { memo, VFC } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookOpen } from "@fortawesome/free-solid-svg-icons";

import { DefaultButton, Props } from "../../atoms/button/DefaultButton";

export const IngredientIconButton: VFC<Props> = memo((props) => {
  return (
    <DefaultButton {...props}>
      <FontAwesomeIcon icon={faBookOpen} />
    </DefaultButton>
  );
});
