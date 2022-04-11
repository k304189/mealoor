import { memo, VFC } from "react";

import { DefaultRadioGroup } from "../../../molecules/form/DefaultRadioGroup";
import { locationArray } from "../../../../constants/locationArray";

type Props = {
  location: string;
  onChange: (value: string) => void;
  size?: "xs" | "sm" | "md" | "lg";
  isGroupDisabled?: boolean;
}

export const LocationRadio: VFC<Props> = memo((props) => {
  const { location, onChange, size = "md", isGroupDisabled = false } = props;

  return (
    <DefaultRadioGroup
      items={locationArray}
      groupName="LocationRadio"
      value={location}
      onChange={onChange}
      isGroupDisabled={isGroupDisabled}
      size={size}
    />
  );
});
