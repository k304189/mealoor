import { memo, VFC } from "react";
import { Center, Container, Heading, VStack } from "@chakra-ui/react";
import { CheckCircleIcon } from "@chakra-ui/icons";

import { accentColor } from "../../../theme/systemTheme";
import { HeaderLayout } from "../../templates/HeaderLayout";

export const WithdrawPage: VFC = memo(() => {
  return (
    <HeaderLayout>
      <Center className="bgMain" h="100%">
        <VStack spacing={10}>
          <CheckCircleIcon boxSize={20} color={accentColor} />
          <Heading size="2xl">退会の手続きが完了しました</Heading>
          <Container w="100%">
            退会の手続きが完了しました
            <br />
            今まで、当アプリをご利用いただきありがとうございました
            <br />
            またのご利用、心よりお待ちしております
          </Container>
        </VStack>
      </Center>
    </HeaderLayout>
  );
});
