import React from "react";
import { render, screen, cleanup } from "@testing-library/react";
import BookList from "./index"; // Adjust the path as necessary

// Mock the BookCard component to isolate testing of BookList
vi.mock("../BookCard", () => ({
  default: ({ collection }) => (
    <div data-testid="book-card" role="listitem">
      <p>{collection.book.title}</p>
    </div>
  ),
}));

describe("BookList component", () => {
  const mockCollections = [
    {
      collection_id: 4,
      book_id: 3,
      user_id: 1,
      user: {
        first_name: "Pedro",
        last_name: "Pereira",
      },
      condition: "mint",
      delivery_preference: ["hand-off"],
      book: {
        book_id: 3,
        title: "Crime and Punishment",
        authors: ["Fyodor Dostoyevsky"],
        categories: ["Fiction"],
        lang: "en",
        isbn: "9780140449136",
        image:
          "http://books.google.com/books/content?id=SYu-4-oO3h8C&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
      },
    },
    {
      collection_id: 3,
      book_id: 3,
      user_id: 1,
      user: {
        first_name: "Pedro",
        last_name: "Pereira",
      },
      condition: "mint",
      delivery_preference: ["hand-off"],
      book: {
        book_id: 3,
        title: "Crime and Punishment",
        authors: ["Fyodor Dostoyevsky"],
        categories: ["Fiction"],
        lang: "en",
        isbn: "9780140449136",
        image:
          "http://books.google.com/books/content?id=SYu-4-oO3h8C&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
      },
    },
  ];

  beforeEach(() => {
    render(<BookList collections={mockCollections} />);
  });

  afterEach(() => {
    cleanup();
  });

  it("renders without crashing", () => {
    const bookListElement = screen.getByRole("list");
    expect(bookListElement).to.exist;
  });

  it("renders the correct number of BookCard components", () => {
    const bookCards = screen.getAllByTestId("book-card");
    expect(bookCards.length).toBe(mockCollections.length);
  });

  it("displays the correct book titles in the BookCard components", () => {
    mockCollections.forEach((collection) => {
      const bookTitleElements = screen.getAllByText(collection.book.title);
      expect(bookTitleElements.length).toBeGreaterThan(0);
    });
  });
});
