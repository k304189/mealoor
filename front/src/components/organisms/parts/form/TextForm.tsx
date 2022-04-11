import { ChangeEvent, memo, ReactNode, VFC } from "react";

import { DefaultTextInput } from "../../../atoms/form/DefaultTextInput";
import { ReadOnlyInput } from "../../../molecules/form/ReadOnlyInput";
import { FormArea } from "../../../molecules/form/FormArea";

type Props = {
  value: string | number;
  type?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: () => void;
  leftAddon?: string;
  rightAddon?: string;
  label: string;
  labelSize?: string;
  require?: "require" | "optional" | "";
  helperText?: string;
  errorText?: string;
  isDisabled?: boolean;
  isReadOnly?: boolean;
  isInvalid?: boolean;
  setPlaceholder?: boolean;
  dataTestid?: string;
  size?: "xs" | "sm" | "md" | "lg";
};

export const TextForm: VFC<Props> = memo((props) => {
  const {
    value,
    type = "text",
    onChange,
    onBlur = () => {},
    leftAddon = "",
    rightAddon = "",
    label,
    labelSize = "md",
    require = "",
    helperText = "",
    errorText = "",
    isDisabled = false,
    isReadOnly = false,
    isInvalid = false,
    setPlaceholder = true,
    dataTestid = "",
    size = "md",
  } = props;

  const placeholder = setPlaceholder ? label : "";

  let children: ReactNode;
  if (isReadOnly) {
    children = (
      <ReadOnlyInput
        type={type}
        value={value}
        leftAddon={leftAddon}
        rightAddon={rightAddon}
        dataTestid={dataTestid}
        size={size}
      />
    );
  } else {
    children = (
      <DefaultTextInput
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        onBlur={onBlur}
        data-testid={dataTestid}
        size={size}
      />
    );
  }

  return (
    <FormArea
      label={label}
      labelSize={labelSize}
      require={require}
      helperText={helperText}
      errorText={errorText}
      isDisabled={isDisabled}
      isInvalid={isInvalid}
      isReadOnly={isReadOnly}
    >
      {children}
    </FormArea>
  );
});
