import { render, screen, cleanup } from "@testing-library/react";

import { LocationRadio } from "../../../../../components/organisms/parts/food/LocationRadio";
import { locationArray }from "../../../../../constants/locationArray";

afterEach(() => cleanup());

describe("Rendering LocationRadio", () => {
  const onChangeFunction = jest.fn();
  it("Nomal Render", () => {
    render(
      <LocationRadio
        location={locationArray[0].value}
        onChange={onChangeFunction}
      />
    );

    for (let i = 0; i < locationArray.length; i++) {
      const value = locationArray[i].value;
      const radioButtonElement = screen.queryByText(value) as HTMLInputElement;

      expect(radioButtonElement).not.toBeNull();
    }
  });
});
