import { memo, ReactNode, VFC } from "react";
import { Center, Tooltip } from "@chakra-ui/react";

type Props = {
  onClick: () => void;
  children: ReactNode;
  px?: number;
  hoverText?: string;
};

export const HeaderButton: VFC<Props> = memo((props) => {
  const { onClick, children, px = 0, hoverText = "" } = props;
  return (
    <Tooltip label={hoverText}>
      <Center className="systemHeaderButton" px={px} onClick={onClick}>
        {children}
      </Center>
    </Tooltip>
  );
});
