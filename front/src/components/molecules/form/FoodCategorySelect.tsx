import { memo, VFC } from "react";

import { DefaultSelect, Props as DefaultSelectProps } from "../../atoms/form/DefaultSelect";
import { foodCategory } from "../../../constants/foodCategory";

type Props = Omit<DefaultSelectProps, "options">;

export const FoodCategorySelect: VFC<Props> = memo((props) => {
  return (
    <DefaultSelect {...props} options={foodCategory} />
  );
});
