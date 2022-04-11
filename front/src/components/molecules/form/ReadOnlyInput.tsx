import { memo, VFC } from "react";
import {
  Box,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
} from "@chakra-ui/react";

type Props = {
  value: string | number;
  type?: string;
  dataTestid?: string;
  leftAddon?: string;
  rightAddon?: string;
  size?: "xs" | "sm" | "md" | "lg";
}

export const ReadOnlyInput: VFC<Props> = memo((props) => {
  const {
    value,
    type = "text",
    dataTestid = "",
    leftAddon = "",
    rightAddon = "",
    size = "md",
  } = props;
  return (
    <InputGroup size={size}>
      {leftAddon === ""
        ? (<Box />)
        : (<InputLeftAddon>{leftAddon}</InputLeftAddon>)}
      <Input
        value={value}
        type={type}
        className="readOnly"
        data-testid={dataTestid}
        variant="filled"
        isDisabled
        isReadOnly
      />
      {rightAddon === ""
        ? (<Box />)
        : (<InputRightAddon>{rightAddon}</InputRightAddon>)}
    </InputGroup>
  );
});
