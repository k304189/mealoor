import { render, screen, cleanup } from "@testing-library/react";

import { EatTimingRadio } from "../../../../../components/organisms/parts/food/EatTimingRadio";
import { eatTimingArray }from "../../../../../constants/eatTimingArray";

afterEach(() => cleanup());

describe("Rendering EatTimingRadio", () => {
  const onChangeFunction = jest.fn();
  it("Nomal Render", () => {
    render(
      <EatTimingRadio
        eatTiming={eatTimingArray[0].value}
        onChange={onChangeFunction}
      />
    );

    for (let i = 0; i < eatTimingArray.length; i++) {
      const value = eatTimingArray[i].value;
      const radioButtonElement = screen.queryByText(value) as HTMLInputElement;

      expect(radioButtonElement).not.toBeNull();
    }
  });
});
