import { memo, VFC } from "react";
import { Box, Tooltip } from "@chakra-ui/react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition, faArrowDown, faArrowRight, faArrowUp } from "@fortawesome/free-solid-svg-icons";

type Props = {
  value: number;
  hoverText?: string;
  className?: string;
};

export const ArrowIcon: VFC<Props> = memo((props) => {
  const { value, hoverText = "", className = "" } = props;
  let icon: IconDefinition = faArrowRight;

  if (value > 0) {
    icon = faArrowUp;
  } else if (value < 0) {
    icon = faArrowDown;
  }

  return (
    <Tooltip label={hoverText}>
      <Box>
        <FontAwesomeIcon className={className} icon={icon} />
      </Box>
    </Tooltip>
  );
});
