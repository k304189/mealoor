import { memo, VFC } from "react";
import { forwardRef, IconButton, IconButtonProps, Tooltip } from "@chakra-ui/react";

export type Props = IconButtonProps & {
  hoverText?: String;
};

export const DefaultIconButton: VFC<Props> = memo(forwardRef((props, ref) => {
  const { hoverText } = props;
  const iconButtonProp = { ...props };
  delete iconButtonProp.hoverText;
  return (
    <Tooltip label={hoverText}>
      <IconButton ref={ref} {...iconButtonProp} />
    </Tooltip>
  );
}));
