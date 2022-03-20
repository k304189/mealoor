import { memo, VFC } from "react";

import { DefaultRadioGroup } from "../../../molecules/form/DefaultRadioGroup";
import { eatTimingArray } from "../../../../constants/eatTimingArray";

type Props = {
  eatTiming: string;
  onChange: (value: string) => void;
}

export const EatTimingRadio: VFC<Props> = memo((props) => {
  const { eatTiming, onChange } = props;

  return (
    <DefaultRadioGroup
      items={eatTimingArray}
      groupName="EatTimingRadio"
      value={eatTiming}
      onChange={onChange}
    />
  );
});
