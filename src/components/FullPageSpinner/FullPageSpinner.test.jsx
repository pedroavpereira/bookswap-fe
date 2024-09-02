import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import FullPageSpinner from "./index";

describe("FullPageSpinner", () => {
  it("renders the spinner component", () => {
    render(<FullPageSpinner />);

    const spinnerBackground = screen.getByTestId("spinner-background");
    expect(spinnerBackground).to.exist;
    expect(spinnerBackground.classList.contains("spinner-background")).to.be
      .true;

    const spinner = screen.getByTestId("spinner");
    expect(spinner).to.exist;
    expect(spinner.classList.contains("spinner")).to.be.true;
  });
});
