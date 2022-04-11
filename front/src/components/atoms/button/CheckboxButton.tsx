import { ChangeEvent, memo, ReactNode, VFC } from "react";
import { Box, Button, useCheckbox } from "@chakra-ui/react";

type Props = {
  isChecked: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  children: ReactNode;
  size?: "xs" | "sm" | "md" | "lg";
};

export const CheckboxButton: VFC<Props> = memo((props) => {
  const { className = "defaultCheckboxButton", children, size = "md" } = props;
  const checkboxButtonProps = { ...props };
  delete checkboxButtonProps.className;
  delete checkboxButtonProps.children;
  delete checkboxButtonProps.size;
  const { getCheckboxProps, getInputProps, htmlProps } = useCheckbox(checkboxButtonProps);

  return (
    <Box as="label" {...htmlProps}>
      <input {...getInputProps()} />
      <Button
        as="div"
        className={className}
        variant="outline"
        size={size}
        {...getCheckboxProps() }
      >
        {children}
      </Button>
    </Box>
  );
});
