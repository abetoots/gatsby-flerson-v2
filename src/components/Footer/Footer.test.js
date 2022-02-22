import React from "react";
import Footer from "./Footer";
import { render } from "@testing-library/react";

describe("Footer", () => {
  it("finds a an attribution link to the icon author and link to Flaticon", () => {
    const { getByTitle, getAllByTitle } = render(<Footer />);
    const authorLinks = getAllByTitle("author", { exact: false });
    for (const link of authorLinks) {
      expect(link).toHaveAttribute(
        "href",
        expect.stringContaining("flaticon.com/authors")
      );
    }

    const link2 = getByTitle(/flaticon/i);
    expect(link2).toHaveAttribute(
      "href",
      expect.stringContaining("flaticon.com")
    );
  });
});
