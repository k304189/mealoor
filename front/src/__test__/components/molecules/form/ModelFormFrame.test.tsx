import { render, screen, cleanup } from "@testing-library/react";
import useEvent from "@testing-library/user-event";
import { Box } from "@chakra-ui/react";

import { ModelFormFrame } from "../../../../components/molecules/form/ModelFormFrame";

afterEach(() => cleanup());

const createDummyFunction = jest.fn();
const updateDummyFunction = jest.fn();
const createFunction = async () => {
  await createDummyFunction();
};

const updateFunction = async () => {
  await updateDummyFunction();
};

const childrenTestId = "childrenTestId";

describe("Rendering", () => {
  it("Only Require Attribute Rendering", () => {
    render(
      <ModelFormFrame
        createFunction={createFunction}
        updateFunction={updateFunction}
      >
        <Box data-testid={childrenTestId} />
      </ModelFormFrame>
    );

    const childrenElement = screen.queryByTestId(childrenTestId);
    expect(childrenElement).not.toBeNull();

    const execButtonElement = screen.queryByText("実行") as HTMLInputElement;
    expect(execButtonElement).toBeNull();

    const createButtonElement = screen.queryByText("登録") as HTMLInputElement;
    expect(createButtonElement).toBeNull();

    const updateButtonElement = screen.queryByText("更新") as HTMLInputElement;
    expect(updateButtonElement).toBeNull();
  });

  it("Update Mode is create", () => {
    render(
      <ModelFormFrame
        updateMode="create"
        createFunction={createFunction}
        updateFunction={updateFunction}
      >
        <Box data-testid={childrenTestId} />
      </ModelFormFrame>
    );

    const execButtonElement = screen.queryByText("実行") as HTMLInputElement;
    expect(execButtonElement).toBeNull();

    const createButtonElement = screen.queryByText("登録") as HTMLInputElement;
    expect(createButtonElement).not.toBeNull();

    const updateButtonElement = screen.queryByText("更新") as HTMLInputElement;
    expect(updateButtonElement).toBeNull();

    useEvent.click(createButtonElement);
    expect(createDummyFunction).toHaveBeenCalledTimes(1);
    expect(updateDummyFunction).toHaveBeenCalledTimes(0);
  });

  it("Update Mode is update", () => {
    render(
      <ModelFormFrame
        updateMode="update"
        createFunction={createFunction}
        updateFunction={updateFunction}
      >
        <Box data-testid={childrenTestId} />
      </ModelFormFrame>
    );

    const execButtonElement = screen.queryByText("実行") as HTMLInputElement;
    expect(execButtonElement).toBeNull();

    const createButtonElement = screen.queryByText("登録") as HTMLInputElement;
    expect(createButtonElement).toBeNull();

    const updateButtonElement = screen.queryByText("更新") as HTMLInputElement;
    expect(updateButtonElement).not.toBeNull();

    useEvent.click(updateButtonElement);
    expect(createDummyFunction).toHaveBeenCalledTimes(0);
    expect(updateDummyFunction).toHaveBeenCalledTimes(1);
  });

  it("Update Mode is empty string", () => {
    render(
      <ModelFormFrame
        updateMode=""
        createFunction={createFunction}
        updateFunction={updateFunction}
      >
        <Box data-testid={childrenTestId} />
      </ModelFormFrame>
    );

    const execButtonElement = screen.queryByText("実行") as HTMLInputElement;
    expect(execButtonElement).toBeNull();

    const createButtonElement = screen.queryByText("登録") as HTMLInputElement;
    expect(createButtonElement).toBeNull();

    const updateButtonElement = screen.queryByText("更新") as HTMLInputElement;
    expect(updateButtonElement).toBeNull();
  });

  it("Update Mode is create And ButtonDisabled is True", () => {
    render(
      <ModelFormFrame
        updateMode="create"
        createFunction={createFunction}
        updateFunction={updateFunction}
        buttonDisabled
      >
        <Box data-testid={childrenTestId} />
      </ModelFormFrame>
    );

    const execButtonElement = screen.queryByText("実行") as HTMLInputElement;
    expect(execButtonElement).toBeNull();

    const createButtonElement = screen.queryByText("登録") as HTMLInputElement;
    expect(createButtonElement).not.toBeNull();

    const updateButtonElement = screen.queryByText("更新") as HTMLInputElement;
    expect(updateButtonElement).toBeNull();

    useEvent.click(createButtonElement);
    expect(createDummyFunction).toHaveBeenCalledTimes(0);
    expect(updateDummyFunction).toHaveBeenCalledTimes(0);
  });

  it("Update Mode is update And ButtonDisabled is True", () => {
    render(
      <ModelFormFrame
        updateMode="update"
        createFunction={createFunction}
        updateFunction={updateFunction}
        buttonDisabled
      >
        <Box data-testid={childrenTestId} />
      </ModelFormFrame>
    );

    const execButtonElement = screen.queryByText("実行") as HTMLInputElement;
    expect(execButtonElement).toBeNull();

    const createButtonElement = screen.queryByText("登録") as HTMLInputElement;
    expect(createButtonElement).toBeNull();

    const updateButtonElement = screen.queryByText("更新") as HTMLInputElement;
    expect(updateButtonElement).not.toBeNull();

    useEvent.click(updateButtonElement);
    expect(createDummyFunction).toHaveBeenCalledTimes(0);
    expect(updateDummyFunction).toHaveBeenCalledTimes(0);
  });
});
