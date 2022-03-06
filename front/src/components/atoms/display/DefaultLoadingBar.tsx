import { memo, VFC } from "react";
import { Progress, ProgressProps } from "@chakra-ui/react";
// import { systemComponentColor } from "../../../theme/systemTheme";

export const DefaultLoadingBar: VFC<ProgressProps> = memo((props) => {
  return (
    <Progress {...props} colorScheme="blue" isIndeterminate />
  );
});
