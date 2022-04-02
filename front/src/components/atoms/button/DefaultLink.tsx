import { memo, VFC } from "react";
import { Button, ButtonProps, Tooltip } from "@chakra-ui/react";

type Props = ButtonProps & {
  hoverText?: string
}

export const DefaultLink: VFC<Props> = memo((props) => {
  const { hoverText } = props;
  const linkButtonProp = { ...props };
  delete linkButtonProp.hoverText;
  return (
    <Tooltip label={hoverText}>
      <Button {...linkButtonProp} variant="link" size="sm" />
    </Tooltip>
  );
});
