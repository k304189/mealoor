import { Box } from "@chakra-ui/react";
import useEvent from "@testing-library/user-event";
import { render, screen, cleanup } from "@testing-library/react";

import { DefaultAlertDialog } from "../../../../components/molecules/layout/DefaultAlertDialog";

afterEach(() => cleanup());

describe("Rendering DefaultAlertDialog", () => {
  const onCloseFunction = jest.fn();
  const onClickYesFunction = jest.fn();
  const headerText = "ダイアログヘッダー";
  const bodyText = "ダイアログボディ";
  const yesButtonText = "yes";
  const noButtonText = "no";

  it("Render Dialog When isOpen is True", () => {
    render(
      <DefaultAlertDialog
        isOpen
        onClose={onCloseFunction}
        onClickYes={onClickYesFunction}
        dialogBody={(<Box>{bodyText}</Box>)}
        dialogHeader={(<Box>{headerText}</Box>)}
        yesButtonText={yesButtonText}
        noButtonText={noButtonText}
      />
    );

    const dialogHeaderElement = screen.queryByText(headerText);
    expect(dialogHeaderElement).not.toBeNull();

    const dialogBodyElement = screen.queryByText(bodyText);
    expect(dialogBodyElement).not.toBeNull();

    const yesButtonElement = screen.queryByText(yesButtonText) as HTMLInputElement;
    expect(yesButtonElement).not.toBeNull();

    const noButtonElement = screen.queryByText(noButtonText) as HTMLInputElement;
    expect(noButtonElement).not.toBeNull();

    useEvent.click(yesButtonElement);
    expect(onClickYesFunction).toHaveBeenCalledTimes(1);

    useEvent.click(noButtonElement);
    expect(onCloseFunction).toHaveBeenCalledTimes(1);
  });

  it("Render Dialog When isOpen And Set Only Require Attribute", () => {
    render(
      <DefaultAlertDialog
        isOpen
        onClose={onCloseFunction}
        onClickYes={onClickYesFunction}
        dialogBody={(<Box>{bodyText}</Box>)}
      />
    );

    const dialogHeaderElement = screen.queryByText(headerText);
    expect(dialogHeaderElement).toBeNull();

    const dialogBodyElement = screen.queryByText(bodyText);
    expect(dialogBodyElement).not.toBeNull();

    const yesButtonElement = screen.queryByText("はい") as HTMLInputElement;
    expect(yesButtonElement).not.toBeNull();

    const noButtonElement = screen.queryByText("いいえ") as HTMLInputElement;
    expect(noButtonElement).not.toBeNull();

    useEvent.click(yesButtonElement);
    expect(onClickYesFunction).toHaveBeenCalledTimes(1);

    useEvent.click(noButtonElement);
    expect(onCloseFunction).toHaveBeenCalledTimes(1);
  });

  it("Render Dialog When isOpen is False", () => {
    render(
      <DefaultAlertDialog
        isOpen={false}
        onClose={onCloseFunction}
        onClickYes={onClickYesFunction}
        dialogBody={(<Box>{bodyText}</Box>)}
        dialogHeader={(<Box>{headerText}</Box>)}
        yesButtonText={yesButtonText}
        noButtonText={noButtonText}
      />
    );

    const dialogHeaderElement = screen.queryByText(headerText);
    expect(dialogHeaderElement).toBeNull();

    const dialogBodyElement = screen.queryByText(bodyText);
    expect(dialogBodyElement).toBeNull();

    const yesButtonElement = screen.queryByText(yesButtonText) as HTMLInputElement;
    expect(yesButtonElement).toBeNull();

    const noButtonElement = screen.queryByText(noButtonText) as HTMLInputElement;
    expect(noButtonElement).toBeNull();
  });
});
