import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect, beforeEach } from "vitest";
import Footer from "./index";

describe("Footer", () => {
  beforeEach(() => {
    console.log("Footer component:", Footer);
  });

  it("renders the footer with correct text", () => {
    render(<Footer />);
    const footerElement = screen.getByText(
      "© 2024 BookNest. All rights reserved."
    );
    expect(footerElement).to.exist;
  });

  it("has the correct CSS class", () => {
    const { container } = render(<Footer />);
    const footerElement = container.firstChild;
    expect(footerElement.classList.contains("footer")).to.be.true;
  });
});
