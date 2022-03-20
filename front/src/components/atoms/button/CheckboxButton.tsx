import { ChangeEvent, memo, ReactNode, VFC } from "react";
import { Box, Button, useCheckbox } from "@chakra-ui/react";

type Props = {
  isChecked: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  children: ReactNode;
};

export const CheckboxButton: VFC<Props> = memo((props) => {
  const { className = "defaultCheckboxButton", children } = props;
  const checkboxButtonProps = { ...props };
  delete checkboxButtonProps.className;
  delete checkboxButtonProps.children;
  const { getCheckboxProps, getInputProps, htmlProps } = useCheckbox(checkboxButtonProps);

  return (
    <Box as="label" {...htmlProps}>
      <input {...getInputProps()} />
      <Button
        as="div"
        className={className}
        variant="outline"
        {...getCheckboxProps() }
      >
        {children}
      </Button>
    </Box>
  );
});
