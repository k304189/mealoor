import { memo, VFC } from "react";
import { Tag } from "@chakra-ui/react";

type Props = {
  size?: "sm" | "md" | "lg";
};

export const UpdateModeTag: VFC<Props> = memo((props) => {
  const { size = "md" } = props;
  return (
    <Tag size={size} key="updateMode" colorScheme="orange">
      更新モード
    </Tag>
  );
});
