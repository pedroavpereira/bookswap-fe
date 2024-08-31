import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import CollectionCard from "./index";

const mockNavigate = vi.fn();
vi.mock("react-router-dom", () => ({
  useNavigate: () => mockNavigate,
}));

describe("CollectionCard", () => {
  const mockCollection = {
    collection_id: "1",
    book: {
      book_id: "123",
      title: "Test Book",
      image: "test-image.jpg",
    },
    condition: "Good",
  };

  const mockOnClick = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders correctly", () => {
    render(
      <CollectionCard collection={mockCollection} onClick={mockOnClick} />
    );

    expect(screen.getByText("Test Book")).toBeTruthy();
    expect(screen.getByText("Condition:")).toBeTruthy();
    expect(screen.getByText("Good")).toBeTruthy();
    const img = screen.getByRole("img");
    expect(img.getAttribute("src")).toBe("test-image.jpg");
  });

  it("calls onClick when delete button is clicked", () => {
    render(
      <CollectionCard collection={mockCollection} onClick={mockOnClick} />
    );

    const deleteButton = screen.getByTestId("delete-button");
    fireEvent.click(deleteButton);

    expect(mockOnClick).toHaveBeenCalledWith("1");
  });

  it("navigates to offering page when image is clicked", () => {
    render(
      <CollectionCard collection={mockCollection} onClick={mockOnClick} />
    );

    const image = screen.getByRole("img");
    fireEvent.click(image);

    expect(mockNavigate).toHaveBeenCalledWith("/offering/123", {
      state: { collection: mockCollection },
    });
  });
});
