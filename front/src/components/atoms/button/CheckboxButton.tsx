import { ChangeEvent, memo, ReactNode, VFC } from "react";
import { Box, Button, Center, Checkbox, useCheckbox } from "@chakra-ui/react";

type Props = {
  isChecked: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  children: ReactNode;
  size?: "xs" | "sm" | "md" | "lg";
};

export const CheckboxButton: VFC<Props> = memo((props) => {
  const { className = "primary", children, size = "md" } = props;
  const checkboxButtonProps = { ...props };
  delete checkboxButtonProps.className;
  delete checkboxButtonProps.children;
  delete checkboxButtonProps.size;
  const { state, getCheckboxProps, getInputProps, htmlProps } = useCheckbox(checkboxButtonProps);

  return (
    <Box as="label" {...htmlProps}>
      <input {...getInputProps()} />
      <Button
        as="div"
        className={`defaultCheckBoxButton ${className}`}
        variant="outline"
        size={size}
        {...getCheckboxProps() }
      >
        { size !== "xs" ? (
          <Center mr={1}>
            <Checkbox
              className="smallCheckbox"
              colorScheme="whiteAlpha"
              size={size}
              isChecked={state.isChecked}
            />
          </Center>
        ) : (
          <></>
        ) }
        {children}
      </Button>
    </Box>
  );
});
