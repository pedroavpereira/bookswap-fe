import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import BookSearch from "./index";
import { vi } from "vitest";
import "@testing-library/jest-dom";

describe("BookSearch component", () => {
  beforeEach(() => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve({
            items: [
              {
                id: "1",
                volumeInfo: {
                  title: "Test Book 1",
                  authors: ["Author 1"],
                  imageLinks: {
                    smallThumbnail: "http://example.com/image1.jpg",
                  },
                },
              },
              {
                id: "2",
                volumeInfo: {
                  title: "Test Book 2",
                  authors: ["Author 2"],
                  imageLinks: {
                    smallThumbnail: "http://example.com/image2.jpg",
                  },
                },
              },
            ],
          }),
      })
    );
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("renders without crashing", () => {
    render(
      <BookSearch selected={null} setSelected={vi.fn()} onTyping={vi.fn()} />
    );
    const inputElement = screen.getByTestId("book-search-input");
    expect(inputElement).toBeInTheDocument();
  });

  it("calls onTyping and fetches data when typing in input", async () => {
    const onTypingMock = vi.fn();
    render(
      <BookSearch
        selected={null}
        setSelected={vi.fn()}
        onTyping={onTypingMock}
      />
    );

    const inputElement = screen.getByTestId("book-search-input");
    fireEvent.change(inputElement, { target: { value: "Crime" } });

    // Wait for onTyping to be called
    await waitFor(() => {
      expect(onTypingMock).toHaveBeenCalled();
    });

    // Wait for results to be displayed
    await waitFor(() => {
      const resultsContainer = screen.getByTestId("search-results-container");
      expect(resultsContainer).toBeInTheDocument();
      const resultElements = screen.getAllByTestId("search-book-result");
      expect(resultElements.length).toBe(2);
    });
  });

  it("updates query and calls setSelected when a result is selected", async () => {
    const setSelectedMock = vi.fn();
    render(
      <BookSearch
        selected={null}
        setSelected={setSelectedMock}
        onTyping={vi.fn()}
      />
    );

    const inputElement = screen.getByTestId("book-search-input");
    fireEvent.change(inputElement, { target: { value: "Crime" } });

    // Wait for results to be displayed
    await waitFor(() => {
      const resultsContainer = screen.getByTestId("search-results-container");
      expect(resultsContainer).toBeInTheDocument();
      const resultElements = screen.getAllByTestId("search-book-result");
      expect(resultElements.length).toBe(2);
      fireEvent.click(resultElements[0]);
    });

    // Check that setSelected was called with the correct object
    expect(setSelectedMock).toHaveBeenCalledWith(
      expect.objectContaining({
        volumeInfo: {
          title: "Test Book 1",
          authors: ["Author 1"],
          imageLinks: { smallThumbnail: "http://example.com/image1.jpg" },
        },
      })
    );
  });
});
