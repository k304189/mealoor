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
  dataTestid?: string;
  leftAddon?: string;
  rightAddon?: string;
}

export const ReadOnlyInput: VFC<Props> = memo((props) => {
  const {
    value,
    dataTestid = "",
    leftAddon = "",
    rightAddon = "",
  } = props;
  return (
    <InputGroup>
      {leftAddon === ""
        ? (<Box />)
        : (<InputLeftAddon>{leftAddon}</InputLeftAddon>)}
      <Input
        value={value}
        className="readOnly"
        data-testid={dataTestid}
        variant="filled"
        isDisabled
      />
      {rightAddon === ""
        ? (<Box />)
        : (<InputRightAddon>{rightAddon}</InputRightAddon>)}
    </InputGroup>
  );
});
