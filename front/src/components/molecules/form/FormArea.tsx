import { memo, ReactNode, VFC } from "react";
import {
  HStack,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
} from "@chakra-ui/react";

import { RequireBadge } from "../../atoms/display/RequireBadge";
import { OptionalBadge } from "../../atoms/display/OptionalBadge";

type Props = {
  children: ReactNode;
  label: string;
  labelSize?: string;
  require?: "require" | "optional" | "";
  helperText?: string;
  errorText?: string;
  isDisabled?: boolean;
  isInvalid?: boolean;
  isReadOnly?: boolean;
}

export const FormArea: VFC<Props> = memo((props) => {
  const {
    children,
    label,
    labelSize = "md",
    require = "",
    helperText = "",
    errorText = "",
    isDisabled = false,
    isInvalid = false,
    isReadOnly = false,
  } = props;
  let displayBadge: ReactNode | null;

  if (require === "require") {
    displayBadge = <RequireBadge />;
  } else if (require === "optional") {
    displayBadge = <OptionalBadge />;
  } else {
    displayBadge = null;
  }

  return (
    <FormControl
      isDisabled={isDisabled}
      isInvalid={isInvalid}
      isReadOnly={isReadOnly}
    >
      <HStack spacing={1}>
        <FormLabel fontSize={labelSize}>
          {label}
        </FormLabel>
        {displayBadge}
      </HStack>
      {children}
      <FormHelperText>{helperText}</FormHelperText>
      <FormErrorMessage>{errorText}</FormErrorMessage>
    </FormControl>
  );
});
