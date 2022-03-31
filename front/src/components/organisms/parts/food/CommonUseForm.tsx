import { ChangeEvent, memo, useState, VFC } from "react";
import { Box, Flex, HStack, VStack } from "@chakra-ui/react";

import { EatTimingRadio } from "./EatTimingRadio";
import { NumberForm } from "../form/NumberForm";
import { TextForm } from "../form/TextForm";
import { TextareaForm } from "../form/TextareaForm";
import { DefaultButton } from "../../../atoms/button/DefaultButton";
import { CheckboxButton } from "../../../atoms/button/CheckboxButton";
import { AddButton } from "../../../molecules/button/AddButton";
import { MinusButton } from "../../../molecules/button/MinusButton";
import { FormArea } from "../../../molecules/form/FormArea";
import { useMessage } from "../../../../hooks/common/layout/useMessage";

export type Props = {
  quantity?: number;
  maxRate?: number;
  selectedDataText?: string;
};

export const CommonUseForm: VFC<Props> = memo((props) => {
  const [date, setDate] = useState("");
  const [eatTiming, setEatTiming] = useState("");
  const [rate, setRate] = useState(0);
  const [price, setPrice] = useState(0);
  const [discounted, setDiscounted] = useState(false);
  const [note, setNote] = useState("");
  const { successToast } = useMessage();
  const {
    quantity = 1,
    maxRate = Number.MAX_SAFE_INTEGER,
    selectedDataText = "",
  } = props;

  const onChangeDate = (e: ChangeEvent<HTMLInputElement>) => {
    setDate(e.target.value);
  };

  const onChangeNote = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setNote(e.target.value);
  };

  const onChangeDiscounted = (e: ChangeEvent<HTMLInputElement>) => {
    setDiscounted(e.target.checked);
  };

  const onClickAddButton = () => {
    if (quantity > 0) {
      let tmpRate = rate + Math.trunc(100 / quantity);
      if (tmpRate > maxRate) {
        tmpRate = maxRate;
      }
      setRate(tmpRate);
    }
  };

  const onClickMinusButton = () => {
    if (quantity > 0) {
      let tmpRate = rate - Math.trunc(100 / quantity);
      if (tmpRate < 0) {
        tmpRate = 0;
      }
      setRate(tmpRate);
    }
  };

  const onClickButton = () => {
    successToast("食事データを作成しました");
  };

  return (
    <>
      <VStack gap={2} h="100%">
        {selectedDataText ? (
          <Box h="10%" w="100%" align="left">
            {`選択中データ：${selectedDataText}`}
          </Box>
        ) : (
          <></>
        )}
        <HStack gap={2} w="100%" h="30%">
          <Box w="40%">
            <TextForm
              label="食事日"
              type="date"
              require="require"
              value={date}
              onChange={onChangeDate}
            />
          </Box>
          <Box w="60%">
            <FormArea
              label="食事タイミング"
              require="require"
            >
              <EatTimingRadio eatTiming={eatTiming} onChange={setEatTiming} />
            </FormArea>
          </Box>
        </HStack>
        <HStack w="100%" gap={4} h="50%">
          <Box w="40%" h="100%">
            <Flex h="100%" align="end" gap={1}>
              <NumberForm
                label="食事量"
                value={rate}
                onChange={setRate}
                unit="%"
                require="require"
              />
              <HStack pb={2}>
                <AddButton aria-label="割合追加" size="sm" onClick={onClickAddButton} />
                <MinusButton aria-label="割合削除" size="sm" onClick={onClickMinusButton} />
              </HStack>
            </Flex>
          </Box>
          <Box w="30%">
            <NumberForm
              label="価格"
              value={price}
              onChange={setPrice}
              unit="円"
              require="optional"
            />
          </Box>
          <Box w="20%" h="100%">
            <CheckboxButton isChecked={discounted} onChange={onChangeDiscounted}>
              割引品
            </CheckboxButton>
          </Box>
        </HStack>
        <Flex w="100%" h="10%" align="end">
          <TextareaForm
            label="メモ"
            value={note}
            require="optional"
            onChange={onChangeNote}
            size="sm"
          />
          <Box pb={2} ml={2}>
            <DefaultButton
              className="primary"
              onClick={onClickButton}
            >
              食事
            </DefaultButton>
          </Box>
        </Flex>
      </VStack>
    </>
  );
});
