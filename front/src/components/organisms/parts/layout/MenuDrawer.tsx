import { memo, VFC } from "react";
import { Box } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

import { DefaultDrawer } from "../../../molecules/layout/DefaultDrawer";
import { AvatarUsername } from "../../../molecules/layout/AvatarUsername";
import { useRequestHeader } from "../../../../hooks/common/auth/useRequestHeader";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export const MenuDrawer: VFC<Props> = memo((props) => {
  const { hasRequestHeader } = useRequestHeader();
  const navigate = useNavigate();
  const {
    isOpen,
    onClose,
  } = props;

  const drawerBody = (
    <Box>
      { hasRequestHeader() ? (
        <>
          <Box
            className="menuButton"
            data-testid="menuButton"
            onClick={() => { navigate("/account"); }}
          >
            <AvatarUsername />
          </Box>
          <Box className="menuSection" data-testid="menuSection">
            データ
          </Box>
          <Box
            className="menuButton"
            data-testid="menuButton"
            onClick={() => { navigate("/dashboard"); }}
          >
            ダッシュボード
          </Box>
          <Box className="menuSection" data-testid="menuSection">
            食材
          </Box>
          <Box
            className="menuButton"
            data-testid="menuButton"
            onClick={() => { navigate("/stock"); }}
          >
            家にある食材
          </Box>
          <Box className="menuSection" data-testid="menuSection">
            食事
          </Box>
          <Box
            className="menuButton"
            data-testid="menuButton"
            onClick={() => { navigate("/favoriteEat"); }}
          >
            お気に入り食事
          </Box>
        </>
      ) : (
        <Box />
      )}
      <Box className="menuSection" data-testid="menuSection">
        mealoor
      </Box>
      <Box
        className="menuButton"
        data-testid="menuButton"
        onClick={() => { navigate("/"); }}
      >
        Top
      </Box>
    </Box>
  );

  return (
    <DefaultDrawer
      isOpen={isOpen}
      onClose={onClose}
      drawerHeader={(<Box>メニュー</Box>)}
      drawerBody={drawerBody}
    />
  );
});
