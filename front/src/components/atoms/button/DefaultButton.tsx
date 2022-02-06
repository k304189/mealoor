import { memo, ReactNode, VFC } from "react";
import { Button, Tooltip } from "@chakra-ui/react";

type Props = {
  children: ReactNode;
  onClick: () => void;
  className?: string;
  disabled?: boolean;
  hoverText?: string;
  loading?: boolean;
  size?: "sm" | "md" | "lg" | "xs";
  variant?: "solid" | "outline" | "ghost" | "link";
};

export const DefaultButton: VFC<Props> = memo((props) => {
  const {
    children,
    onClick,
    className = "",
    disabled = false,
    hoverText = "",
    loading = false,
    size = "md",
    variant = "soild",
  } = props;

  return (
    <Tooltip label={hoverText}>
      <Button
        onClick={onClick}
        className={className}
        disabled={disabled || loading}
        isLoading={loading}
        size={size}
        variant={variant}
      >
        {children}
      </Button>
    </Tooltip>
  );
});
