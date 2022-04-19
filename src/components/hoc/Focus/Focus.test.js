import { fireEvent,render } from "@testing-library/react";
import React from "react";

import Focus from "./Focus";

describe("Focus", () => {
  it("focuses its child on keyboard only if given the right prop", () => {
    const { getByText, container } = render(
      <Focus keyBoardOnly>
        <button>focus me</button>
      </Focus>
    );
    const button = getByText(/focus me/i);
    fireEvent.click(button);
    expect(button).not.toHaveFocus();
    fireEvent.keyUp(button, { key: "Tab", code: "Tab", keyCode: 9 });
    expect(button).toHaveFocus();
  });

  it("only takes over it's first child's focus handler", () => {
    const { getByText } = render(
      <Focus keyBoardOnly>
        <button>keyboard only</button>
        <button>normal focus</button>
      </Focus>
    );
    const el1 = getByText(/keyboard only/i);
    const el2 = getByText(/normal focus/i);
    fireEvent.click(el1);
    expect(el1).not.toHaveFocus();
    //TODO install testing-library/user-event
    // fireEvent.click(el2);
    // expect(el2).toHaveFocus();
    // fireEvent.keyUp(el2, { key: "Tab", code: "Tab", keyCode: 9 });
    // expect(div).toHaveFocus();
  });
});
