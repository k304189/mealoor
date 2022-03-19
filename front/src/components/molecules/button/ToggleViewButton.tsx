import { memo, VFC, useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

import { DefaultIconButton } from "../../atoms/button/DefaultIconButton";

type Props = {
  isView: boolean;
  setIsView: (bool: boolean) => void;
  dataTestid?: string;
}

export const ToggleViewButton: VFC<Props> = memo((props) => {
  const { isView, setIsView, dataTestid = "" } = props;
  const [ariaLabel, setAriaLabel] = useState(isView ? "非表示" : "表示");
  const toggleIsView = () => {
    const newIsView = !isView;
    const newAriaLabel = newIsView ? "非表示" : "表示";
    setIsView(newIsView);
    setAriaLabel(newAriaLabel);
  };

  return (
    <DefaultIconButton
      className="transparent"
      onClick={toggleIsView}
      aria-label={ariaLabel}
      data-testid={dataTestid}
      icon={(isView ? <ViewOffIcon /> : <ViewIcon />)}
    />
  );
});
