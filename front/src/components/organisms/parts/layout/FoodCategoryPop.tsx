import { memo, VFC } from "react";
import {
  Box,
  Button,
  Flex,
  IconButton,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody,
} from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";

// import { DefaultButton } from "../../../atoms/button/DefaultButton";
import { DefaultTextInput } from "../../../atoms/form/DefaultTextInput";
import { FoodCategorySelect } from "../../../molecules/form/FoodCategorySelect";
import { FoodUnitSelect } from "../../../molecules/form/FoodUnitSelect";

export const FoodCategoryPop: VFC = memo(() => {
  return (
    <Popover>
      <PopoverTrigger>
        <Button variant="link">ポップ</Button>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverHeader>カテゴリー選択</PopoverHeader>
        <PopoverBody>
          <Flex>
            <Box w="50%"><FoodCategorySelect size="xs" /></Box>
            <Box w="20%"><DefaultTextInput size="xs" /></Box>
            <Box w="20%"><FoodUnitSelect size="xs" /></Box>
            <Box w="10%"><IconButton aria-label="closeButton" size="xs" icon={<CloseIcon />} /></Box>
          </Flex>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
});
