import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { BrowserRouter, useNavigate } from "react-router-dom";
import SearchForm from "./index";

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: vi.fn(),
  };
});

global.fetch = vi.fn();

const RouterWrapper = ({ children }) => (
  <BrowserRouter>{children}</BrowserRouter>
);

describe("SearchForm", () => {
  let mockNavigate;

  beforeEach(() => {
    vi.clearAllMocks();
    mockNavigate = vi.fn();
    useNavigate.mockReturnValue(mockNavigate);
  });

  it("renders the search form with all inputs", () => {
    render(<SearchForm />, { wrapper: RouterWrapper });

    expect(screen.getByPlaceholderText("Book title")).to.exist;
    expect(screen.getByPlaceholderText("Post Code")).to.exist;
    expect(screen.getByRole("combobox")).to.exist;
    expect(screen.getByRole("button", { name: "Search" })).to.exist;
  });

  it("updates input values when user types", () => {
    render(<SearchForm />, { wrapper: RouterWrapper });

    const titleInput = screen.getByPlaceholderText("Book title");
    const postCodeInput = screen.getByPlaceholderText("Post Code");

    fireEvent.change(titleInput, { target: { value: "Harry Potter" } });
    fireEvent.change(postCodeInput, { target: { value: "SW1A 1AA" } });

    expect(titleInput.value).to.equal("Harry Potter");
    expect(postCodeInput.value).to.equal("SW1A 1AA");
  });

  it("calls API and navigates when form is submitted", async () => {
    global.fetch.mockResolvedValueOnce({
      json: () =>
        Promise.resolve({ result: { latitude: 51.5074, longitude: -0.1278 } }),
    });

    render(<SearchForm />, { wrapper: RouterWrapper });

    fireEvent.change(screen.getByPlaceholderText("Book title"), {
      target: { value: "Harry Potter" },
    });
    fireEvent.change(screen.getByPlaceholderText("Post Code"), {
      target: { value: "SW1A 1AA" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Search" }));

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        "https://api.postcodes.io/postcodes/SW1A 1AA"
      );
      expect(mockNavigate).toHaveBeenCalledWith(
        "/search?radius=5&lat=51.5074&lng=-0.1278&title=Harry+Potter"
      );
    });
  });

  it("displays FullPageSpinner when loading", async () => {
    global.fetch.mockImplementationOnce(() => new Promise(() => {})); // Never resolves

    render(<SearchForm />, { wrapper: RouterWrapper });

    fireEvent.change(screen.getByPlaceholderText("Book title"), {
      target: { value: "Harry Potter" },
    });
    fireEvent.change(screen.getByPlaceholderText("Post Code"), {
      target: { value: "SW1A 1AA" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Search" }));

    await waitFor(() => {
      expect(screen.getByTestId("spinner-background")).to.exist;
      expect(screen.getByTestId("spinner")).to.exist;
    });
  });
});
