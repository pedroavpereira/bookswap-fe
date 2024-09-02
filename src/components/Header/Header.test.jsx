import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { BrowserRouter } from "react-router-dom";
import Header from "./index";

// Wrapper component to provide router context
const RouterWrapper = ({ children }) => (
  <BrowserRouter>{children}</BrowserRouter>
);

describe("Header", () => {
  it("renders the header with correct logo and navigation links", () => {
    render(<Header />, { wrapper: RouterWrapper });

    // Check if logo is present
    const logo = screen.getByText("BookNest");
    expect(logo).to.exist;
    expect(logo.closest("a")).to.have.property("href").that.includes("/");

    // Check if all navigation links are present
    const navLinks = [
      { text: "Home", href: "/" },
      { text: "Browse", href: "/search" },
      { text: "Swap", href: "/swap" },
      { text: "Collection", href: "/collection" },
      { text: "Login", href: "/login" },
    ];

    navLinks.forEach((link) => {
      const linkElement = screen.getByText(link.text);
      expect(linkElement).to.exist;
      expect(linkElement.closest("a"))
        .to.have.property("href")
        .that.includes(link.href);
    });
  });

  it("applies correct CSS classes", () => {
    render(<Header />, { wrapper: RouterWrapper });

    const header = screen.getByRole("banner");
    expect(header.classList.contains("header")).to.be.true;

    const nav = screen.getByRole("navigation");
    expect(nav.classList.contains("navbar")).to.be.true;
  });
});
