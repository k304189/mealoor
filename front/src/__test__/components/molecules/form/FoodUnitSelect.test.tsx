import { render, screen, cleanup } from "@testing-library/react";

import { FoodUnitSelect } from "../../../../components/molecules/form/FoodUnitSelect";
import { foodUnit } from "../../../../constants/foodUnit";

afterEach(() => cleanup());

describe("Rendering", () => {
  const elementTestId = "testSelectId";

  it("Normal Render", () => {
    render(
      <FoodUnitSelect
        data-testid={elementTestId}
      />
    );

    // 初期表示が問題ないことを確認
    const renderTestElement = screen.queryByTestId(elementTestId) as HTMLInputElement;
    expect(renderTestElement).not.toBeNull();
    expect(renderTestElement.value).toBe("");

    // 選択肢が指定したものに+1個になっていることを確認
    const optionElements = screen.queryAllByRole("option") as HTMLOptionElement[];
    expect(optionElements.length).toBe(foodUnit.length + 1);

    // 選択肢の1つ目が空白になっていることを確認
    expect(optionElements[0].value).toBe("");
    expect(optionElements[0].innerHTML).toBe("");

    // 渡した要素が選択できることを確認
    for (let i = 0; i < foodUnit.length; i++) {
      const attrValue = foodUnit[i].value;
      const elementValue = optionElements[i + 1].value;
      const elementDisplay = optionElements[i + 1].innerHTML;

      expect(elementValue).toBe(attrValue);
      expect(elementDisplay).toBe(attrValue);
    }
  });
});
