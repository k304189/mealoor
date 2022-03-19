import { memo, VFC } from "react";
import {
  Box,
  Button,
  HStack,
  RadioProps,
  useRadio,
  useRadioGroup,
} from "@chakra-ui/react";

import { TFormAttribute } from "../../../types/components/TFormAttribute";

type RadioButtonProps = RadioProps & {
  size?: "lg" | "md" | "sm" | "xs";
};

const RadioButton: VFC<RadioButtonProps> = memo((props) => {
  const { size = "md" } = props;
  const radioProps = { ...props };
  delete radioProps.size;
  const { getInputProps, getCheckboxProps } = useRadio(radioProps);

  const input = getInputProps();
  const checkbox = getCheckboxProps();

  return (
    <Box as="label">
      <input {...input} />
      <Button
        as="div"
        className="radioButton"
        size={size}
        variant="outline"
        {...checkbox}
      >
        {props.children}
      </Button>
    </Box>
  );
});

type Props = {
  items: Array<TFormAttribute>;
  groupName: string;
  value: string;
  onChange: (nextValue: string) => void;
  size?: "lg" | "md" | "sm" | "xs";
};

export const DefaultRadioGroup: VFC<Props> = memo((props) => {
  const { items, groupName, value, onChange, size = "md" } = props;
  const { getRootProps, getRadioProps } = useRadioGroup({
    name: groupName,
    defaultValue: value,
    onChange,
  });
  const group = getRootProps();

  return (
    <HStack {...group}>
      {items.map((item) => {
        return (
          <RadioButton
            key={item.value}
            size={size}
            {...getRadioProps({ value: item.value })}
          >
            {item.displayValue || item.value}
          </RadioButton>
        );
      })}
    </HStack>
  );
});
