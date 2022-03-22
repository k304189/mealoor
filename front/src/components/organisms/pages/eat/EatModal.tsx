import { memo, VFC } from "react";

import { FoodCommonForm } from "../../parts/food/FoodCommonForm";
import { DefaultModal } from "../../../molecules/layout/DefaultModal";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  updateMode: "create" | "update";
};

export const EatModal: VFC<Props> = memo((props) => {
  const { isOpen, onClose, updateMode } = props;

  const createFunction = async () => {};
  const updateFunction = async () => {};

  return (
    <DefaultModal
      isOpen={isOpen}
      onClose={onClose}
      modalHeader="食事編集"
      modalBody={(
        <FoodCommonForm
          model="eat"
          updateMode={updateMode}
          createFunction={createFunction}
          updateFunction={updateFunction}
        />
      )}
      size="6xl"
    />
  );
});
