import useEvent from "@testing-library/user-event";
import { render, screen, cleanup } from "@testing-library/react";

import { BodyForm } from "../../../../../components/organisms/pages/body/BodyForm";

afterEach(() => cleanup());

describe("Rendering BodyForm", () => {
  const testIdDate = "testIdDate";
  const testIdWeight = "testIdWeight";
  const testIdFatRate = "testIdFatRate";
  const testIdFatWeight = "testIdFatWeight";
  it("First Rendering", () => {
    render(<BodyForm />);

    const updateModeCreateElement = screen.queryByText("登録モード");
    expect(updateModeCreateElement).not.toBeNull();

    const updateModeUpdateElement = screen.queryByText("更新モード");
    expect(updateModeUpdateElement).toBeNull();

    const dateLabel = screen.queryByText("日付");
    expect(dateLabel).not.toBeNull();

    const dateInputElement = screen.queryByTestId(testIdDate) as HTMLInputElement;
    expect(dateInputElement).not.toBeNull();

    const weightLabel = screen.queryByText("体重");
    expect(weightLabel).not.toBeNull();

    const weightInputElement = screen.queryByTestId(testIdWeight) as HTMLInputElement;
    expect(weightInputElement).not.toBeNull();
    expect(weightInputElement.value).not.toBe(0);

    const fatRateLabel = screen.queryByText("体脂肪率");
    expect(fatRateLabel).not.toBeNull();

    const fatRateInputElement = screen.queryByTestId(testIdFatRate) as HTMLInputElement;
    expect(fatRateInputElement).not.toBeNull();
    expect(fatRateInputElement.value).not.toBe(0);

    const fatWeightLabel = screen.queryByText("体脂肪量");
    expect(fatWeightLabel).not.toBeNull();

    const fatWeightInputElement = screen.queryByTestId(testIdFatWeight) as HTMLInputElement;
    expect(fatWeightInputElement).not.toBeNull();
    expect(fatWeightInputElement.value).not.toBe(0);
  });
})
