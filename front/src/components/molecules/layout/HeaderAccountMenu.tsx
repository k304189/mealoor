import { memo, VFC } from "react";
import {
  Menu,
  MenuButton,
  MenuDivider,
  MenuGroup,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";

import { DefaultAvatar } from "../../atoms/display/DefaultAvatar";
import { useSignInAccount } from "../../../hooks/common/auth/useSignInAccount";

type Props = {
  signOut: () => void;
};

export const HeaderAccountMenu: VFC<Props> = memo((props) => {
  const { signOut } = props;
  const { getSignInUsername } = useSignInAccount();
  return (
    <Menu>
      <MenuButton
        className="systemHeaderButton"
        data-testid="headerAccountMenuButton"
      >
        <DefaultAvatar mx={4} size="sm" />
      </MenuButton>
      <MenuList>
        <MenuGroup title={getSignInUsername()}>
          <MenuDivider />
          <MenuItem onClick={signOut}>
            サインアウト
          </MenuItem>
        </MenuGroup>
      </MenuList>
    </Menu>
  );
});
