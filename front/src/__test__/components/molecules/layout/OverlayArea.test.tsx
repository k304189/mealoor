import { render, screen, cleanup } from "@testing-library/react";
import { Box } from "@chakra-ui/react";

import { OverlayArea } from "../../../../components/molecules/layout/OverlayArea";

afterEach(() => cleanup());

describe("Rendering", () => {
  const renderText = "オーバーレイテスト";
  it("Normal Render", () => {
    render(
      <OverlayArea
        overlayType="overlayDark"
        imageSrc="test.png"
        imageAlt="テスト画像"
      >
        <Box>{renderText}</Box>
      </OverlayArea>
    );
    // 要素が表示されていることを確認
    const renderTestElement = screen.queryByText(renderText);
    expect(renderTestElement).not.toBeNull();
  });
});
