import { memo, VFC } from "react";

import { BodyForm } from "./BodyForm";
import { DefaultModal } from "../../../molecules/layout/DefaultModal";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export const BodyModal: VFC<Props> = memo((props) => {
  const { isOpen, onClose } = props;
  return (
    <DefaultModal
      isOpen={isOpen}
      onClose={onClose}
      modalHeader="体調編集"
      modalBody={(<BodyForm />)}
    />
  );
});
