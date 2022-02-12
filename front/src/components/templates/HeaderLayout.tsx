import { memo, ReactNode, VFC } from "react";
import { Box } from "@chakra-ui/react";

import { Header } from "../organisms/parts/layout/Header";

type Props = {
  title?: string;
  titleClass?: string;
  children: ReactNode;
};

export const HeaderLayout: VFC<Props> = memo((props) => {
  const { children } = props;
  return (
    <>
      <Header />
      <Box>
        {children}
      </Box>
    </>
  );
});
