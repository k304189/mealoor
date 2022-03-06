import { ChangeEvent, memo, VFC } from "react";
import { Textarea } from "@chakra-ui/react";

import { FormArea } from "../../../molecules/form/FormArea";
import { baseColor } from "../../../../theme/systemTheme";

type Props = {
  value: string;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  onBlur?: () => void;
  label: string;
  labelSize?: string;
  require?: "require" | "optional" | "";
  helperText?: string;
  errorText?: string;
  isDisabled?: boolean;
  isReadOnly?: boolean;
  isInvalid?: boolean;
  setPlaceholder?: boolean;
};

export const TextareaForm: VFC<Props> = memo((props) => {
  const {
    value,
    onChange,
    onBlur = () => {},
    label,
    labelSize = "md",
    require = "",
    helperText = "",
    errorText = "",
    isDisabled = false,
    isReadOnly = false,
    isInvalid = false,
    setPlaceholder = true,
  } = props;

  const placeholder = setPlaceholder ? label : "";
  let variant = "outline";
  let className = "";
  if (isReadOnly) {
    variant = "filled";
    className = "readOnly";
  }

  return (
    <FormArea
      label={label}
      labelSize={labelSize}
      require={require}
      helperText={helperText}
      errorText={errorText}
      isDisabled={isDisabled || isReadOnly}
      isInvalid={isInvalid}
      isReadOnly={isReadOnly}
    >
      <Textarea
        value={value}
        variant={variant}
        className={className}
        placeholder={placeholder}
        onChange={onChange}
        onBlur={onBlur}
        focusBorderColor={baseColor}
      />
    </FormArea>
  );
});
