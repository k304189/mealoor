import { memo, VFC } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShop } from "@fortawesome/free-solid-svg-icons";

import { DefaultButton, Props } from "../../atoms/button/DefaultButton";

export const FavoriteEatIconButton: VFC<Props> = memo((props) => {
  return (
    <DefaultButton className="favoriteEat" {...props}>
      <FontAwesomeIcon icon={faShop} />
    </DefaultButton>
  );
});
