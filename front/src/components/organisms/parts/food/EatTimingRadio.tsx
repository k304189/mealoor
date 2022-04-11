import { memo, VFC } from "react";

import { DefaultRadioGroup } from "../../../molecules/form/DefaultRadioGroup";
import { eatTimingArray } from "../../../../constants/eatTimingArray";

type Props = {
  eatTiming: string;
  onChange: (value: string) => void;
  size?: "xs" | "sm" | "md" | "lg";
  isGroupDisabled?: boolean;
}

export const EatTimingRadio: VFC<Props> = memo((props) => {
  const { eatTiming, onChange, size = "md", isGroupDisabled = false } = props;

  return (
    <DefaultRadioGroup
      items={eatTimingArray}
      groupName="EatTimingRadio"
      value={eatTiming}
      onChange={onChange}
      isGroupDisabled={isGroupDisabled}
      size={size}
    />
  );
});
