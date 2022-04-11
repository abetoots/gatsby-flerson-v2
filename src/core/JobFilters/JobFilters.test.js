import { EMPLOYMENT_TYPE,PRIMARY_TAG } from "@Shared/utils/constants";
import { fireEvent,render } from "@testing-library/react";
import React from "react";

import JobFilters from "./JobFilters";

describe("JobFilters", () => {
  let element;
  beforeEach(() => {
    element = render(
      <JobFilters
        postsToFilter={[]}
        originalPosts={[]}
        setCurrentPosts={() => {}}
      />
    );
  });

  it("finds a 'Filter Jobs' submit button", () => {
    const { getByRole } = element;
    const button = getByRole("button", { name: "Filter Jobs" });
    expect(button).toHaveAttribute("type", "submit");
    expect(button).toBeVisible();
    fireEvent.click(button);
    expect(button).not.toBeDisabled();
  });

  it("by default has unchecked checkbox controls ", () => {
    const { getByRole } = element;
    const form = getByRole("form");
    expect(form).toBeInTheDocument();
    expect(form).toHaveFormValues({
      [PRIMARY_TAG]: [],
      [EMPLOYMENT_TYPE]: [],
    });
  });
});
