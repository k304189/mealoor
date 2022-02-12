import { ChangeEvent, memo, VFC, useState } from "react";
import { InputGroup, InputRightElement } from "@chakra-ui/react";

import { DefaultTextInput } from "../../atoms/form/DefaultTextInput";
import { ToggleViewButton } from "../button/ToggleViewButton";

type Props = {
  password: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onBlur: () => void;
  placeholder?: string;
  dataTestid?: string;
};

export const PasswordInput: VFC<Props> = memo((props) => {
  const {
    password,
    onChange,
    onBlur,
    placeholder = "",
    dataTestid = "",
  } = props;
  const [isView, setIsView] = useState(false);
  return (
    <InputGroup>
      <DefaultTextInput
        type={(isView ? "text" : "password")}
        value={password}
        placeholder={placeholder}
        onChange={onChange}
        onBlur={onBlur}
        data-testid={dataTestid}
      />
      <InputRightElement>
        <ToggleViewButton
          isView={isView}
          setIsView={setIsView}
          dataTestid={ (dataTestid.length > 0 ? `${dataTestid}ViewButton` : "") }
        />
      </InputRightElement>
    </InputGroup>
  );
});
