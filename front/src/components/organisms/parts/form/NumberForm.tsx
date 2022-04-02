import { memo, VFC } from "react";
import {
  Box,
  InputGroup,
  InputRightAddon,
  NumberInput,
  NumberInputField,
} from "@chakra-ui/react";

import { FormArea } from "../../../molecules/form/FormArea";
import { accentColor } from "../../../../theme/systemTheme";

type Props = {
  value: number;
  onChange: (v: number) => void;
  onBlur?: () => void;
  min?: number;
  max?: number;
  step?: number;
  precision?: number;
  unit?: string;
  label: string;
  labelSize?: string;
  require?: "require" | "optional" | "";
  helperText?: string;
  errorText?: string;
  isInvalid?: boolean;
  dataTestid?: string;
};

export const NumberForm: VFC<Props> = memo((props) => {
  const {
    value,
    onChange,
    onBlur = () => {},
    min = 0,
    max = Number.MAX_SAFE_INTEGER,
    step = 1,
    precision = 0,
    unit = "",
    label,
    labelSize = "md",
    require = "",
    helperText = "",
    errorText = "",
    isInvalid = false,
    dataTestid = "",
  } = props;

  return (
    <FormArea
      label={label}
      labelSize={labelSize}
      require={require}
      helperText={helperText}
      errorText={errorText}
      isInvalid={isInvalid}
    >
      <InputGroup>
        <NumberInput
          allowMouseWheel
          value={value}
          onChange={(vs: string, vn: number) => { onChange(vn); }}
          onBlur={onBlur}
          min={min}
          max={max}
          step={step}
          precision={precision}
          focusBorderColor={accentColor}
          variant="flushed"
        >
          <NumberInputField type="number" data-testid={dataTestid} />
        </NumberInput>
        { unit ? (<InputRightAddon>{unit}</InputRightAddon>) : (<Box />)}
      </InputGroup>
    </FormArea>
  );
});
