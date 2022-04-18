import { memo, ReactNode, VFC } from "react";
import { Alert, AlertIcon } from "@chakra-ui/react";

type Props = {
  status: "info" | "warning" | "success" | "error";
  children: ReactNode;
};

export const DefaultAlert: VFC<Props> = memo((props) => {
  const { status, children } = props;

  return (
    <Alert status={status}>
      <AlertIcon />
      {children}
    </Alert>
  );
});
