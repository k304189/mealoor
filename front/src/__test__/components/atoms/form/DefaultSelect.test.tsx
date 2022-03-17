import userEvent from "@testing-library/user-event";
import { render, screen, cleanup } from "@testing-library/react";

import { DefaultSelect } from "../../../../components/atoms/form/DefaultSelect";

afterEach(() => cleanup());

describe("Rendering", () => {
  const elementTestId = "testSelectId";
  const onChangeFunction = jest.fn();
  const onBlurFunction = jest.fn();

  it("Normal Render", () => {
    const options = [
      { value: "val1" },
      { value: "val2" },
      { value: "val3" },
    ];
    render(
      <DefaultSelect
        options={options}
        onChange={onChangeFunction}
        data-testid={elementTestId}
      />
    );

    // 初期表示が問題ないことを確認
    const renderTestElement = screen.queryByTestId(elementTestId) as HTMLInputElement;
    expect(renderTestElement).not.toBeNull();
    expect(renderTestElement.value).toBe("");

    // 選択肢が指定したものに+1個になっていることを確認
    const optionElements = screen.queryAllByRole("option") as HTMLOptionElement[];
    expect(optionElements.length).toBe(options.length + 1);

    // 選択肢の1つ目が空白になっていることを確認
    expect(optionElements[0].value).toBe("");
    expect(optionElements[0].innerHTML).toBe("");

    // 渡した要素が選択できることを確認
    for (let i = 0; i < options.length; i++) {
      const attrValue = options[i].value;
      const elementValue = optionElements[i + 1].value;
      const elementDisplay = optionElements[i + 1].innerHTML;

      expect(elementValue).toBe(attrValue);
      expect(elementDisplay).toBe(attrValue);
    }

    // 要素を選択した時に値が切り替わることを確認
    for (let i = 0; i < optionElements.length; i++) {
      const selectValue = optionElements[i].value;

      userEvent.selectOptions(renderTestElement, selectValue);
      expect(renderTestElement.value).toBe(selectValue);
      expect(optionElements[i].selected).toBeTruthy();
    }

    expect(onChangeFunction).toHaveBeenCalledTimes(optionElements.length);
  });

  it("Normal Render when set value", () => {
    const options = [
      { value: "val1" },
      { value: "val2" },
      { value: "val3" },
    ];
    const value = "val2";
    render(
      <DefaultSelect
        options={options}
        value={value}
        onChange={onChangeFunction}
        data-testid={elementTestId}
      />
    );

    // 初期表示で指定した値が選択されていることを確認
    const renderTestElement = screen.queryByTestId(elementTestId) as HTMLInputElement;
    expect(renderTestElement.value).toBe(value);

    // 選択肢が指定したものに+1個になっていることを確認
    const optionElements = screen.queryAllByRole("option") as HTMLOptionElement[];
    expect(optionElements.length).toBe(options.length + 1);

    // 選択肢の1つ目が空白になっていることを確認
    expect(optionElements[0].value).toBe("");
    expect(optionElements[0].innerHTML).toBe("");
  });

  it("Render No Options", () => {
    render(
      <DefaultSelect
        data-testid={elementTestId}
      />
    );

    // 初期表示で指定した値が選択されていることを確認
    const renderTestElement = screen.queryByTestId(elementTestId) as HTMLInputElement;
    expect(renderTestElement.value).toBe("");

    // 選択肢が1個になっていることを確認
    const optionElements = screen.queryAllByRole("option") as HTMLOptionElement[];
    expect(optionElements.length).toBe(1);

    // 選択肢の1つ目が空白になっていることを確認
    expect(optionElements[0].value).toBe("");
    expect(optionElements[0].innerHTML).toBe("");
  });

  it("Render Options have displayValue", () => {
    const options = [
      { value: "val1", displayValue: "v1" },
      { value: "val2", displayValue: "v2" },
      { value: "val3", displayValue: "v3" },
    ];
    render(
      <DefaultSelect
        options={options}
        data-testid={elementTestId}
      />
    );

    // 初期表示で指定した値が選択されていることを確認
    const renderTestElement = screen.queryByTestId(elementTestId) as HTMLInputElement;
    expect(renderTestElement.value).toBe("");

    const optionElements = screen.queryAllByRole("option") as HTMLOptionElement[];

    for (let i = 0; i < options.length; i++) {
      const element = optionElements[i + 1];
      const attr = options[i];
      expect(element.value).toBe(attr.value);
      expect(element.innerHTML).toBe(attr.displayValue);
    }
  });
});
