import { memo, VFC } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faScissors } from "@fortawesome/free-solid-svg-icons";

import { DefaultButton, Props } from "../../atoms/button/DefaultButton";

export const DivideIconButton: VFC<Props> = memo((props) => {
  return (
    <DefaultButton {...props}>
      <FontAwesomeIcon icon={faScissors} />
    </DefaultButton>
  );
});
