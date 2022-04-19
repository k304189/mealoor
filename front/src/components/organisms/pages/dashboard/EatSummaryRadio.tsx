import { memo, VFC } from "react";

import { DefaultRadioGroup } from "../../../molecules/form/DefaultRadioGroup";
import { eatSummaryValueArray } from "../../../../constants/eatSummaryValueArray";

type Props = {
  eatSummary: string;
  onChange: (value: string) => void;
  size?: "xs" | "sm" | "md" | "lg";
  isGroupDisabled?: boolean;
}

export const EatSummaryRadio: VFC<Props> = memo((props) => {
  const { eatSummary, onChange, size = "md", isGroupDisabled = false } = props;

  return (
    <DefaultRadioGroup
      items={eatSummaryValueArray}
      groupName="EatTimingRadio"
      value={eatSummary}
      onChange={onChange}
      isGroupDisabled={isGroupDisabled}
      size={size}
    />
  );
});
