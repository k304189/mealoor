import { ChangeEvent, memo, useEffect, useState, VFC } from "react";
import { Grid, GridItem } from "@chakra-ui/react";

import { ModelFormFrame } from "../../../molecules/form/ModelFormFrame";
import { TextForm } from "../../parts/form/TextForm";
import { NumberForm } from "../../parts/form/NumberForm";
import { HTTP_404_NOT_FOUND } from "../../../../constants/httpStatus";
import { useBodyApi } from "../../../../hooks/body/useBodyApi";
import { useBodyValidation } from "../../../../hooks/body/useBodyValidation";
import { useMessage } from "../../../../hooks/common/layout/useMessage";
import { TBody } from "../../../../types/api/TBody";

export const BodyForm: VFC = memo(() => {
  const [date, setDate] = useState("");
  const [weight, setWeight] = useState(0);
  const [fatRate, setFatRate] = useState(0);
  const [fatWeight, setFatWeight] = useState(0);
  const [invalidDate, setInvalidDate] = useState(false);
  const [errorTextDate, setErrorTextDate] = useState("");
  const [updateMode, setUpdateMode] = useState<"create" | "update" | "">("");

  const { body, getBody, createBody, updateBody } = useBodyApi();
  const { validateDate } = useBodyValidation();
  const { errorToast } = useMessage();

  const onChangeDate = (e: ChangeEvent<HTMLInputElement>) => {
    setDate(e.target.value);
  };

  const onBlurDate = () => {
    const { invalid, errorText } = validateDate(date);
    setInvalidDate(invalid);
    setErrorTextDate(errorText);
  };

  const getJson = (): TBody | null => {
    const { invalid } = validateDate(date);
    let json: TBody | null = null;
    if (invalid) {
      errorToast("入力内容に不備があります");
      onBlurDate();
    } else {
      json = {
        date,
        weight,
        fat_rate: fatRate,
      };
    }
    return json;
  };

  const createFunction = async () => {
    const json = getJson();
    if (json) {
      await createBody(json);
    }
  };

  const updateFunction = async () => {
    const json = getJson();
    if (json) {
      await updateBody(json);
    }
  };

  const setBodyInfo = (bodyInfo: TBody | null) => {
    let getWeight = 0;
    let getFatRate = 0;
    let getFatWeight = 0;
    let exec: "create" | "update" = "create";
    if (bodyInfo) {
      getWeight = bodyInfo.weight;
      getFatRate = bodyInfo.fat_rate;
      getFatWeight = bodyInfo.fat_weight ?? 0;
      exec = "update";
    }
    setWeight(getWeight);
    setFatRate(getFatRate);
    setFatWeight(getFatWeight);
    setUpdateMode(exec);
  };

  useEffect(() => {
    if (date) {
      getBody(date)
        .catch((e) => {
          if (e.response.status === HTTP_404_NOT_FOUND) {
            setBodyInfo(null);
          } else {
            errorToast("体調の取得に失敗しました");
          }
        });
    } else {
      setBodyInfo(null);
    }
  }, [date]);

  useEffect(() => {
    setBodyInfo(body);
  }, [body]);

  return (
    <ModelFormFrame
      updateMode={updateMode}
      createFunction={createFunction}
      updateFunction={updateFunction}
      buttonDisabled={invalidDate}
    >
      <Grid templateColumns="repeat(3, 1fr)" gap={2}>
        <GridItem colSpan={3}>
          <TextForm
            label="日付"
            type="date"
            require="require"
            value={date}
            onChange={onChangeDate}
            onBlur={onBlurDate}
            isInvalid={invalidDate}
            errorText={errorTextDate}
            dataTestid="testIdDate"
          />
        </GridItem>
        <GridItem colSpan={1}>
          <NumberForm
            label="体重"
            value={weight}
            onChange={setWeight}
            min={0}
            step={0.05}
            precision={2}
            unit="kg"
            require="require"
            dataTestid="testIdWeight"
          />
        </GridItem>
        <GridItem colSpan={1}>
          <NumberForm
            label="体脂肪率"
            value={fatRate}
            onChange={setFatRate}
            min={0}
            step={0.1}
            precision={2}
            unit="%"
            require="require"
            dataTestid="testIdFatRate"
          />
        </GridItem>
        <GridItem colSpan={1}>
          <TextForm
            label="体脂肪量"
            type="number"
            value={fatWeight}
            onChange={() => {}}
            isReadOnly
            rightAddon="kg"
            dataTestid="testIdFatWeight"
          />
        </GridItem>
      </Grid>
    </ModelFormFrame>
  );
});
