import { memo, ReactNode, VFC } from "react";
import { Box, Image } from "@chakra-ui/react";

type Props = {
  overlayType: "overlayDark" | "overlayLight";
  imageSrc: string;
  imageAlt: string;
  children: ReactNode;
};

export const OverlayArea: VFC<Props> = memo((props) => {
  const { overlayType, imageSrc, imageAlt, children } = props;
  return (
    <Box className={overlayType}>
      <Image className="bg" src={imageSrc} alt={imageAlt} />
      <Box className="overlayText">
        {children}
      </Box>
    </Box>
  );
});
