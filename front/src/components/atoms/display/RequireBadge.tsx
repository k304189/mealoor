import { memo, VFC } from "react";
import { Badge } from "@chakra-ui/react";

type Props = {
  fontSize?: string;
};

export const RequireBadge: VFC<Props> = memo((props) => {
  const { fontSize = "sm" } = props;
  return (
    <Badge fontSize={fontSize} colorScheme="red" variant="solid">必須</Badge>
  );
});
