import { memo, VFC } from "react";
import { Tag } from "@chakra-ui/react";

type Props = {
  size?: "sm" | "md" | "lg";
};

export const CreateModeTag: VFC<Props> = memo((props) => {
  const { size = "md" } = props;
  return (
    <Tag size={size} key="createMode" colorScheme="teal">
      登録モード
    </Tag>
  );
});
