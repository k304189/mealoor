import { memo, VFC } from "react";
import { Center, Container, Heading, VStack } from "@chakra-ui/react";
import { NotAllowedIcon } from "@chakra-ui/icons";

import { HeaderLayout } from "../../templates/HeaderLayout";

export const Http404Page: VFC = memo(() => {
  return (
    <HeaderLayout>
      <Center className="bgMain" h="100%">
        <VStack spacing={10}>
          <NotAllowedIcon w="15%" h="15%" color="red" />
          <Heading size="2xl">HTTP 404 Not Found</Heading>
          <Container w="100%">
            このページはご利用いただけません
            <br />
            リンクに問題があるかページが削除された可能性があります
          </Container>
        </VStack>
      </Center>
    </HeaderLayout>
  );
});
