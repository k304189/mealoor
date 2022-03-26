import { memo, VFC } from "react";
import { Select, SelectProps } from "@chakra-ui/react";

import { TFormAttribute } from "../../../types/components/TFormAttribute";
import { accentColor } from "../../../theme/systemTheme";

export type Props = SelectProps & {
  options?: Array<TFormAttribute>;
};

export const DefaultSelect: VFC<Props> = memo((props) => {
  let { options = [{ value: "" }] } = props;
  const selectProp = { ...props };
  delete selectProp.options;

  const emptyOption = options.filter((op) => {
    return op.value === "";
  });

  if (emptyOption.length <= 0) {
    options = [{ value: "" }, ...options];
  }

  return (
    <Select {...selectProp} variant="flushed" focusBorderColor={accentColor}>
      {options.map((op) => {
        return (
          <option key={op.value} value={op.value}>
            {op.displayValue || op.value }
          </option>
        );
      })}
    </Select>
  );
});
