import React from "react"
import NotFound404 from "./NotFound404"
import { render } from "@testing-library/react"

describe("NotFound404", () => {
  it("finds a navigation link pointing to root url", () => {
    const { getByRole } = render(<NotFound404 />)
    const link = getByRole("link")
    expect(link).toHaveAttribute("href", "/")
  })
})
