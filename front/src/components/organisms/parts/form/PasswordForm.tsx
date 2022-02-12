import { ChangeEvent, memo, VFC } from "react";

import { PasswordInput } from "../../../molecules/form/PasswordInput";
import { FormArea } from "../../../molecules/form/FormArea";

type Props = {
  password: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onBlur:() => void;
  dataTestid?: string;
  label?: string;
  labelSize?: string;
  require?: "require" | "optional" | "";
  helperText?: string;
  errorText?: string;
  isDisabled?: boolean;
  isInvalid?: boolean;
  isReadOnly?: boolean;
};

export const PasswordForm: VFC<Props> = memo((props) => {
  const {
    password,
    onChange,
    onBlur,
    dataTestid = "",
    label = "",
    labelSize = "md",
    require = "",
    helperText = "",
    errorText = "",
    isDisabled = false,
    isInvalid = false,
    isReadOnly = false,
  } = props;

  const outputLabel = label === "" ? "パスワード" : label;
  const placeholder = outputLabel;

  return (
    <FormArea
      label={outputLabel}
      labelSize={labelSize}
      require={require}
      helperText={helperText}
      errorText={errorText}
      isDisabled={isDisabled}
      isInvalid={isInvalid}
      isReadOnly={isReadOnly}
    >
      <PasswordInput
        password={password}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        dataTestid={dataTestid}
      />
    </FormArea>
  );
});
