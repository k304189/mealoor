import { memo, VFC } from "react";

import { TodayEatListTable } from "./TodayEatListTable";
import { DefaultModal } from "../../../molecules/layout/DefaultModal";

type Props = {
  date: string;
  isOpen: boolean;
  onClose: () => void;
};

export const TodayEatListModal: VFC<Props> = memo((props) => {
  const { date, isOpen, onClose } = props;

  return (
    <DefaultModal
      isOpen={isOpen}
      onClose={onClose}
      modalHeader="本日の食事一覧"
      modalBody={(
        <TodayEatListTable
          date={date}
          size="sm"
        />
      )}
      size="5xl"
    />
  );
});
