import { memo, VFC } from "react";
import { Input } from "@chakra-ui/react";

// import { textColor } from "../../../theme/systemTheme";

type Props = {
  value: string | number;
  dataTestid?: string;
}

export const ReadOnlyInput: VFC<Props> = memo((props) => {
  const { value, dataTestid = "" } = props;
  return (
    <Input
      value={value}
      className="readOnly"
      data-testid={dataTestid}
      variant="filled"
      isDisabled
    />
  );
});
