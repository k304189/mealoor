import { memo, VFC } from "react";

import { DefaultSelect, Props as DefaultSelectProps } from "../../atoms/form/DefaultSelect";
import { foodUnit } from "../../../constants/foodUnit";

type Props = Omit<DefaultSelectProps, "options">;

export const FoodUnitSelect: VFC<Props> = memo((props) => {
  return (
    <DefaultSelect {...props} options={foodUnit} />
  );
});
