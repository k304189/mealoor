import { memo, VFC } from "react";

import { HeaderLayout } from "../../templates/HeaderLayout";

export const AccountEditPage: VFC = memo(() => {
  return (
    <HeaderLayout>
      <div>
        <p>AccountEditページです</p>
      </div>
    </HeaderLayout>
  );
});
