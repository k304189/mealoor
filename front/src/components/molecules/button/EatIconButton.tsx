import { memo, VFC } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUtensils } from "@fortawesome/free-solid-svg-icons";

import { DefaultButton, Props } from "../../atoms/button/DefaultButton";

export const EatIconButton: VFC<Props> = memo((props) => {
  return (
    <DefaultButton className="eat" {...props}>
      <FontAwesomeIcon icon={faUtensils} />
    </DefaultButton>
  );
});
