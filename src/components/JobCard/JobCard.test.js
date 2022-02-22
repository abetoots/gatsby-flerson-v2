import React from "react"
import JobCard from "./JobCard"
import { render } from "@testing-library/react"

describe("JobCard", () => {
  it('finds an "apply" anchor link and the correct details are visible to the user', () => {
    const { getByRole, getByText } = render(
      <JobCard
        applyUrl="https://example.com"
        addOns={[""]}
        companyName="Company Name"
        handleTagClick={() => {}}
        jobPosition="Job Position"
        jobUrl="https://localhost/test-company/231"
        location="Worldwide"
        tags={[]}
      />
    )

    const name = getByText("Company Name")
    expect(name).toBeVisible()
    const position = getByText("Job Position")
    expect(position).toBeVisible()
    const location = getByText("Worldwide", { exact: false })
    expect(location).toBeVisible()
    const link = getByRole("link", { name: "Apply" })
    expect(link).toBeVisible()
    expect(link).toHaveAttribute("href", "https://example.com")
  })

  it("finds the company initials when no image is provided", () => {
    const { getByText } = render(
      <JobCard
        applyUrl="https://example.com"
        addOns={[""]}
        companyName="Company Name"
        handleTagClick={() => {}}
        jobPosition="Job Position"
        jobUrl="https://localhost/test-company/231"
        location="Worldwide"
        tags={[]}
      />
    )

    const initials = getByText("CN")
    expect(initials).toBeVisible()
  })
})
