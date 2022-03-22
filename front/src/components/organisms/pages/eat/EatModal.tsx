import { memo, VFC } from "react";

import { EatForm } from "./EatForm";
import { DefaultModal } from "../../../molecules/layout/DefaultModal";
import { TEat } from "../../../../types/api/TEat";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  eat?: TEat | null;
};

export const EatModal: VFC<Props> = memo((props) => {
  const { isOpen, onClose, eat = null } = props;

  return (
    <DefaultModal
      isOpen={isOpen}
      onClose={onClose}
      modalHeader="食事編集"
      modalBody={(
        <EatForm
          eat={eat}
        />
      )}
      size="6xl"
    />
  );
});
