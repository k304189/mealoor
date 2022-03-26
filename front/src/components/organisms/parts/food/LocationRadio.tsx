import { memo, VFC } from "react";

import { DefaultRadioGroup } from "../../../molecules/form/DefaultRadioGroup";
import { locationArray } from "../../../../constants/locationArray";

type Props = {
  location: string;
  onChange: (value: string) => void;
}

export const LocationRadio: VFC<Props> = memo((props) => {
  const { location, onChange } = props;

  return (
    <DefaultRadioGroup
      items={locationArray}
      groupName="LocationRadio"
      value={location}
      onChange={onChange}
    />
  );
});
