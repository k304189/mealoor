import { ChangeEvent, memo, useEffect, useState, VFC } from "react";
import { Grid, GridItem } from "@chakra-ui/react";

import { TextForm } from "../../parts/form/TextForm";
import { NumberForm } from "../../parts/form/NumberForm";

export const BodyForm: VFC = memo(() => {
  const [date, setDate] = useState("");
  const [weight, setWeight] = useState(0);
  const [fatRate, setFatRate] = useState(26.2);
  const [fatWeight, setFatWeight] = useState(0);

  const onChangeDate = (e: ChangeEvent<HTMLInputElement>) => {
    setDate(e.target.value);
  };

  useEffect(() => {
    setFatWeight(0.25);
  }, []);

  return (
    <Grid templateColumns="repeat(3, 1fr)" gap={2}>
      <GridItem colSpan={3}>
        <TextForm
          label="日付"
          type="date"
          require="require"
          value={date}
          onChange={onChangeDate}
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
        />
      </GridItem>
    </Grid>
  );
});
