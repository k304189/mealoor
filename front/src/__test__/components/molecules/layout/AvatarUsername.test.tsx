import { render, screen, cleanup } from "@testing-library/react";

import { AvatarUsername } from "../../../../components/molecules/layout/AvatarUsername";

beforeEach(() => cleanup());
afterEach(() => localStorage.clear());

describe("Rendering AvatarUsername", () => {
  const username = "testUsername";
  it("When Username exists in localStorage, Render AvatarUsername", () => {
    localStorage.setItem("username", username);
    render(<AvatarUsername />);
    const usernameElement = screen.queryByText(username);
    expect(usernameElement).not.toBeNull();
  });

  it("When Username doesn't exist in localStorage, Render AvatarUsername", () => {
    render(<AvatarUsername />);
    const usernameElement = screen.queryByText(username);
    expect(usernameElement).toBeNull();
  });
});
