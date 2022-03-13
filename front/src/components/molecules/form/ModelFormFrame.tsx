import { memo, ReactNode, useEffect, useState, VFC } from "react";
import { Box, Flex } from "@chakra-ui/react";

import { DefaultButton } from "../../atoms/button/DefaultButton";
import { CreateModeTag } from "../../atoms/display/CreateModeTag";
import { UpdateModeTag } from "../../atoms/display/UpdateModeTag";
import { useMessage } from "../../../hooks/common/layout/useMessage";

type Props = {
  children: ReactNode;
  updateMode?: "create" | "update" | "";
  createFunction: () => Promise<void>;
  updateFunction: () => Promise<void>;
  buttonDisabled?: boolean;
};

export const ModelFormFrame: VFC<Props> = memo((props) => {
  const {
    children,
    updateMode = "",
    createFunction,
    updateFunction,
    buttonDisabled = false,
  } = props;
  const [btnText, setBtnText] = useState("");
  const [loading, setLoading] = useState(false);
  const [modeTag, setModeTag] = useState(<Box />);

  const { successToast, errorToast } = useMessage();

  const onClickButton = () => {
    setLoading(true);
    if (updateMode === "create") {
      createFunction()
        .then(() => {
          successToast("データ登録が成功しました");
        })
        .catch(() => {
          errorToast("データ登録が失敗しました");
        });
    } else if (updateMode === "update") {
      updateFunction()
        .then(() => {
          successToast("データ更新が成功しました");
        })
        .catch(() => {
          errorToast("データ更新が失敗しました");
        });
    } else {
      errorToast("ボタン設定に不備があります");
    }
    setLoading(false);
  };

  const button = (
    <DefaultButton
      className="primary"
      onClick={onClickButton}
      disabled={buttonDisabled}
      loading={loading}
    >
      {btnText}
    </DefaultButton>
  );

  useEffect(() => {
    if (updateMode === "create") {
      setBtnText("登録");
      setModeTag(<CreateModeTag />);
    } else if (updateMode === "update") {
      setBtnText("更新");
      setModeTag(<UpdateModeTag />);
    } else {
      setBtnText("実行");
      setModeTag(<Box />);
    }
  }, [updateMode]);

  return (
    <Box>
      <Box mb={2}>
        {modeTag}
      </Box>
      {children}
      <Flex w="100%" justify="end">
        {updateMode ? button : (<Box />)}
      </Flex>
    </Box>
  );
});
