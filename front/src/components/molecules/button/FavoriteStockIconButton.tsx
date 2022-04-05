import { memo, VFC } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBasketShopping } from "@fortawesome/free-solid-svg-icons";

import { DefaultButton, Props } from "../../atoms/button/DefaultButton";

export const FavoriteStockIconButton: VFC<Props> = memo((props) => {
  return (
    <DefaultButton {...props}>
      <FontAwesomeIcon icon={faBasketShopping} />
    </DefaultButton>
  );
});
