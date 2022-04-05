import { memo, VFC } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileMedical } from "@fortawesome/free-solid-svg-icons";

import { DefaultButton, Props } from "../../atoms/button/DefaultButton";

export const BodyIconButton: VFC<Props> = memo((props) => {
  return (
    <DefaultButton {...props}>
      <FontAwesomeIcon icon={faFileMedical} />
    </DefaultButton>
  );
});
