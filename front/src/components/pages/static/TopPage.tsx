import { memo, VFC } from "react";
import { Box, Heading, Image, VStack, Text } from "@chakra-ui/react";

import { OverlayArea } from "../../molecules/layout/OverlayArea";
import { HeaderLayout } from "../../templates/HeaderLayout";
import { mainColor } from "../../../theme/systemTheme";
import topImage from "../../../assets/topImage.jpg";
import logo from "../../../assets/mealoorIcon.png";

export const TopPage: VFC = memo(() => {
  return (
    <HeaderLayout>
      <OverlayArea
        overlayType="overlayDark"
        imageSrc={topImage}
        imageAlt="Top画像"
      >
        <Box w="100%">
          <VStack spacing={4} w="100%" color={mainColor}>
            <Image boxSize="60%" src={logo} alt="Topページロゴ" />
            <Heading size="2xl">食生活の管理をサポート！</Heading>
            <Text>このアプリは食費や摂取カロリーを記録・計算できるアプリです</Text>
            <Text>日々の記録した食事データから食費や摂取カロリーを振り返り</Text>
            <Text>食費の節約や未来の食事スケジュールの参考にしてください</Text>
            <Text>また、自宅にある食材の管理・自炊で作った料理のカロリー計算も可能です</Text>
            <Text>自炊をサポートしている機能を活用して、楽しい食生活をお楽しみください</Text>
          </VStack>
        </Box>
      </OverlayArea>
    </HeaderLayout>
  );
});
