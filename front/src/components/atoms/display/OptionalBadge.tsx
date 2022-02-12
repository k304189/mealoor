import { memo, VFC } from "react";
import { Badge } from "@chakra-ui/react";

type Props = {
  fontSize?: string;
};

export const OptionalBadge: VFC<Props> = memo((props) => {
  const { fontSize = "md" } = props;
  return (
    <Badge fontSize={fontSize} colorScheme="gray" variant="solid">任意</Badge>
  );
});
