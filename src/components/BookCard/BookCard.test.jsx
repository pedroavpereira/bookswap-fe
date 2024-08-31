import React from "react"; // Add this import
import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as matchers from "@testing-library/jest-dom/matchers";
import { BrowserRouter } from "react-router-dom";
import BookCard from "./index"; // Adjust the path as necessary

expect.extend(matchers);

// Correctly mock useNavigate and keep other exports from react-router-dom
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

const mockNavigate = vi.fn(); // Mock useNavigate function

describe("BookCard component", () => {
  const mockCollection = {
    collection_id: "123",
    book: {
      image: "path/to/image.jpg",
      title: "Test Book Title",
    },
    condition: "New",
    user: {
      first_name: "John",
      last_name: "Doe",
    },
  };

  beforeEach(() => {
    vi.clearAllMocks();
    render(
      <BrowserRouter>
        <BookCard collection={mockCollection} />
      </BrowserRouter>
    );
  });

  afterEach(() => {
    cleanup();
  });

  it("Displays the book's title", () => {
    const titleElement = screen.getByText("Test Book Title");
    expect(titleElement).toBeInTheDocument();
  });

  it("Displays the book's condition", () => {
    const conditionElement = screen.getByText(/Condition:/i);
    expect(conditionElement).toBeInTheDocument();
    expect(screen.getByText("New")).toBeInTheDocument();
  });

  it("Displays the book's owner", () => {
    const ownerElement = screen.getByText(/Owner:/i);
    expect(ownerElement).toBeInTheDocument();
    expect(screen.getByText("John Doe")).toBeInTheDocument();
  });

  it("Navigates to the correct URL when clicked", async () => {
    const bookCard = screen.getByRole("img", { name: /test book title/i });
    await userEvent.click(bookCard);
    expect(mockNavigate).toHaveBeenCalledWith("/offering/123");
  });
});
