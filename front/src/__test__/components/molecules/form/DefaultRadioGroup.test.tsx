import useEvent from "@testing-library/user-event";
import { render, screen, cleanup } from "@testing-library/react";

import { DefaultRadioGroup } from "../../../../components/molecules/form/DefaultRadioGroup";

afterEach(() => cleanup());

describe("Rendering DefaultRadioGroup", () => {
  const onChangeFunction = jest.fn();
  const itemValues = ["v1", "v2", "v3"];
  const displayItemValues = ["value1", "value2", "value3"];

  it("Nomal Render", () => {
    const items = itemValues.map((iv) => {
      return { value: iv }
    });
    render(
      <DefaultRadioGroup
        items={items}
        groupName="testName"
        value={itemValues[0]}
        onChange={onChangeFunction}
      />
    );

    for (let i = 0; i < itemValues.length; i++) {
      const value = itemValues[i];
      const checked = i === 0;
      const radioButtonElement = screen.queryByText(value) as HTMLInputElement;

      expect(radioButtonElement).not.toBeNull();
      expect(radioButtonElement.getAttribute("class")).toMatch(/defaultRadioButton/);
      useEvent.click(radioButtonElement);
    }
    expect(onChangeFunction).toHaveBeenCalledTimes(items.length - 1);
  });

  it("Nomal Render when displayValue", () => {
    const items = [];
    for (let i = 0; i < itemValues.length; i++) {
      items.push({ value: itemValues[i], displayValue: displayItemValues[i] });
    }
    render(
      <DefaultRadioGroup
        items={items}
        groupName="testName"
        value=""
        onChange={onChangeFunction}
      />
    );

    for (let i = 0; i < items.length; i++) {
      const value = items[i].value;
      const displayValue = items[i].displayValue;

      const valueElement = screen.queryByText(value) as HTMLInputElement;
      const displayValueElement = screen.queryByText(displayValue) as HTMLInputElement;

      expect(valueElement).toBeNull();
      expect(displayValueElement).not.toBeNull();
    }
  });

  it("Nomal Render when set className", () => {
    const items = itemValues.map((iv) => {
      return { value: iv }
    });
    render(
      <DefaultRadioGroup
        items={items}
        groupName="testName"
        value=""
        onChange={onChangeFunction}
        className="testClassName"
      />
    );

    for (let i = 0; i < items.length; i++) {
      const value = items[i].value;

      const radioButtonElement = screen.queryByText(value) as HTMLInputElement;
      expect(radioButtonElement.getAttribute("class")).toMatch(/testClassName/);
      expect(radioButtonElement.getAttribute("class")).not.toMatch(/defaultRadioButton/);
    }
  });

  it("Nomal Render when set items disabled", () => {
    const items = [
      { value: "value1" },
      { value: "value2", disabled: true },
    ];
    render(
      <DefaultRadioGroup
        items={items}
        groupName="testName"
        value=""
        onChange={onChangeFunction}
      />
    );

    for (let i = 0; i < items.length; i++) {
      const value = items[i].value;

      const radioButtonElement = screen.queryByText(value) as HTMLInputElement;
      useEvent.click(radioButtonElement)
    }
    expect(onChangeFunction).toHaveBeenCalledTimes(1);
  });
});
