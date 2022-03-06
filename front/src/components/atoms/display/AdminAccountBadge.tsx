import { memo, VFC } from "react";
import { Badge } from "@chakra-ui/react";

type Props = {
  fontSize?: string;
};

export const AdminAccountBadge: VFC<Props> = memo((props) => {
  const { fontSize = "sm" } = props;
  return (
    <Badge fontSize={fontSize} bg="blue.800" variant="solid">管理者</Badge>
  );
});
