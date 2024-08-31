import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { expect, describe, test, vi, beforeEach } from "vitest";
import "@testing-library/jest-dom";
import CollectionAddForm from "./index";

// Mock the fetch function
global.fetch = vi.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({ totalItems: 1 }),
  })
);

describe("CollectionAddForm", () => {
  const mockOnSubmit = vi.fn();

  beforeEach(() => {
    render(<CollectionAddForm onSubmit={mockOnSubmit} />);
  });

  test("renders form elements", () => {
    expect(screen.getByText(/Book Title:/i)).toBeInTheDocument();
    expect(screen.getByText(/ISBN:/i)).toBeInTheDocument();
    expect(screen.getByText(/Condition:/i)).toBeInTheDocument();
    expect(screen.getByText(/Delivery Preferences:/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Verify/i })).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Add to collection/i })
    ).toBeInTheDocument();
  });

  test("ISBN verification process", async () => {
    const isbnInput = screen.getByRole("textbox", { name: /ISBN:/i });
    const verifyButton = screen.getByRole("button", { name: /Verify/i });

    fireEvent.change(isbnInput, { target: { value: "1234567890123" } });
    fireEvent.click(verifyButton);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        "https://www.googleapis.com/books/v1/volumes?q=isbn:1234567890123"
      );
    });

    expect(
      screen.getByRole("button", { name: /Add to collection/i })
    ).not.toBeDisabled();
  });

  test("form submission", async () => {
    // Simulate ISBN verification
    const isbnInput = screen.getByRole("textbox", { name: /ISBN:/i });
    const verifyButton = screen.getByRole("button", { name: /Verify/i });
    fireEvent.change(isbnInput, { target: { value: "1234567890123" } });
    fireEvent.click(verifyButton);
    await waitFor(() => {
      expect(
        screen.getByRole("button", { name: /Add to collection/i })
      ).not.toBeDisabled();
    });

    // Select a delivery preference
    const doorPickupCheckbox = screen.getByRole("checkbox", {
      name: /Door Pickup/i,
    });
    fireEvent.click(doorPickupCheckbox);

    // Submit the form
    const submitButton = screen.getByRole("button", {
      name: /Add to collection/i,
    });
    fireEvent.click(submitButton);

    expect(mockOnSubmit).toHaveBeenCalledWith({
      isbn: "1234567890123",
      delivery_preference: ["Door Pickup"],
      condition: "mint",
    });
  });

  test("condition selection", () => {
    const conditionSelect = screen.getByRole("combobox", {
      name: /Condition:/i,
    });
    fireEvent.change(conditionSelect, { target: { value: "very good" } });
    expect(conditionSelect.value).toBe("very good");
  });

  test("multiple delivery preferences", () => {
    const doorPickupCheckbox = screen.getByRole("checkbox", {
      name: /Door Pickup/i,
    });
    const postalServiceCheckbox = screen.getByRole("checkbox", {
      name: /Postal Service/i,
    });

    fireEvent.click(doorPickupCheckbox);
    fireEvent.click(postalServiceCheckbox);

    expect(doorPickupCheckbox).toBeChecked();
    expect(postalServiceCheckbox).toBeChecked();
  });
});
