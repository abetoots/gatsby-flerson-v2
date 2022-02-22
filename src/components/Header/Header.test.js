import React from "react";
import Header from "./Header";
import { render } from "@testing-library/react";

describe("Header", () => {
  it("finds a logo with an alt text", () => {
    const { getByAltText } = render(<Header />);

    const logo = getByAltText(/logo/i);
    expect(logo).toBeInTheDocument();
  });

  it("finds a job post button", () => {
    const { getByRole } = render(<Header />);
    const menuBtn = getByRole("button");
    expect(menuBtn).toBeInTheDocument();
  });
});
