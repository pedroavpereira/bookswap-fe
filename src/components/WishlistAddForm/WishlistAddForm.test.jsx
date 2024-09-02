import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import WishlistAddForm from "./index";
import BookSearch from "../BookSearch/index";
import "@testing-library/jest-dom"; // Import jest-dom for extended assertions

// Mock the BookSearch component
vi.mock("../BookSearch", () => ({
  default: vi.fn(() => <div data-testid="book-search">Mocked BookSearch</div>),
}));

// Mock fetch globally
global.fetch = vi.fn();

describe("WishlistAddForm", () => {
  const mockOnSubmit = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders the form correctly", () => {
    render(<WishlistAddForm onSubmit={mockOnSubmit} />);

    expect(screen.getByText("Book Title:")).toBeInTheDocument();
    expect(screen.getByTestId("book-search")).toBeInTheDocument();
    expect(screen.getByLabelText("ISBN:")).toBeInTheDocument();
    expect(screen.getByText("Verify")).toBeInTheDocument();
    expect(
      screen.getByLabelText("Radius distance in miles")
    ).toBeInTheDocument();
    expect(screen.getByText("Add to wishlist")).toBeInTheDocument();
  });

  it("disables submit button when ISBN is not verified", () => {
    render(<WishlistAddForm onSubmit={mockOnSubmit} />);

    const submitButton = screen.getByText("Add to wishlist");
    expect(submitButton).toBeDisabled(); // Corrected assertion
  });

  it("enables submit button when ISBN is verified", async () => {
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ totalItems: 1 }),
    });

    render(<WishlistAddForm onSubmit={mockOnSubmit} />);

    const isbnInput = screen.getByLabelText("ISBN:");
    fireEvent.change(isbnInput, { target: { value: "1234567890123" } });

    const verifyButton = screen.getByText("Verify");
    fireEvent.click(verifyButton);

    await waitFor(() => {
      const submitButton = screen.getByText("Add to wishlist");
      expect(submitButton).not.toBeDisabled(); // Corrected assertion
    });
  });

  it("shows error message when ISBN verification fails", async () => {
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ totalItems: 0 }),
    });

    render(<WishlistAddForm onSubmit={mockOnSubmit} />);

    const isbnInput = screen.getByLabelText("ISBN:");
    fireEvent.change(isbnInput, { target: { value: "invalidisbn" } });

    const verifyButton = screen.getByText("Verify");
    fireEvent.click(verifyButton);

    await waitFor(() => {
      // Use a more specific query to target the exact error message, such as by using 'aria-describedby' or a nearby label
      const errorMessages = screen.getAllByText("Please enter a correct ISBN");
      expect(errorMessages).toHaveLength(2); // Update the length to match the number of expected instances
    });
  });

  it("calls onSubmit with correct data when form is submitted", async () => {
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ totalItems: 1 }),
    });

    render(<WishlistAddForm onSubmit={mockOnSubmit} />);

    const isbnInput = screen.getByLabelText("ISBN:");
    fireEvent.change(isbnInput, { target: { value: "1234567890123" } });

    const verifyButton = screen.getByText("Verify");
    fireEvent.click(verifyButton);

    // Ensure verification completes and submit is enabled
    await waitFor(() => {
      const submitButton = screen.getByText("Add to wishlist");
      expect(submitButton).not.toBeDisabled();
    });

    // Proceed with form submission
    const submitButton = screen.getByText("Add to wishlist");
    fireEvent.click(submitButton);

    expect(mockOnSubmit).toHaveBeenCalledTimes(1);
    expect(mockOnSubmit).toHaveBeenCalledWith({
      isbn: "1234567890123",
      radius: 10, // Confirm the default or current value of radius is set correctly
    });
  });
});
