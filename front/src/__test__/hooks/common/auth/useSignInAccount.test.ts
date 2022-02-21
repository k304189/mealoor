import { renderHook, act } from "@testing-library/react-hooks";

import { useSignInAccount } from "../../../../hooks/common/auth/useSignInAccount"

afterEach(() => {
  localStorage.clear();
});

describe("useSignInAccount Test", () => {
  const { result } = renderHook(() => useSignInAccount());
  const testUsername = "テストユーザー";

  it("getSignInUsername Called, Username exists in localStorage", () => {
    localStorage.setItem("username", testUsername);
    let username = "";
    act(() => {
      username = result.current.getSignInUsername();
    });
    expect(username).toBe(testUsername);
  });

  it("getSignInUsername Called, Username doesn't exist in localStorage", () => {
    let username = "";
    act(() => {
      username = result.current.getSignInUsername();
    });
    expect(username).toBe("");
  });
});
