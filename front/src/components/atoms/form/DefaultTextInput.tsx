import { memo, VFC } from "react";
import { forwardRef, Input, InputProps } from "@chakra-ui/react";
import { accentColor } from "../../../theme/systemTheme";

export const DefaultTextInput: VFC<InputProps> = memo(forwardRef((props, ref) => {
  return (
    <Input {...props} focusBorderColor={accentColor} variant="flushed" ref={ref} />
  );
}));
