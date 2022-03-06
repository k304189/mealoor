import { memo, ReactNode, VFC } from "react";
import { Box, Center } from "@chakra-ui/react";

import { DefaultLoadingBar } from "../atoms/display/DefaultLoadingBar";
import { Header } from "../organisms/parts/layout/Header";

type Props = {
  title?: string;
  titleClass?: string;
  children: ReactNode;
  loading?: boolean
};

export const HeaderLayout: VFC<Props> = memo((props) => {
  const {
    title = "",
    titleClass = "",
    children,
    loading = false,
  } = props;
  let mainArea: ReactNode;

  if (title === "") {
    mainArea = (
      <Box className="appOnlyContents">{children}</Box>
    );
  } else {
    mainArea = (
      <>
        <Box className={`appTitle ${titleClass}`}>{title}</Box>
        <Box className="appContents">{children}</Box>
      </>
    );
  }

  return (
    <>
      <Header />
      <Box className="systemMain">
        { loading ? (
          <Center h="100%">
            <DefaultLoadingBar w="50%" size="md" />
          </Center>
        ) : mainArea }
      </Box>
    </>
  );
});
