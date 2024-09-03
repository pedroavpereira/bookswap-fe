import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { expect, vi } from 'vitest';
import BookCard from './index'; // Adjust the import path if necessary

describe('BookCard component', () => {
  const user = {
    first_name: 'John',
    last_name: 'Doe',
  };

  const book = {
    title: 'Test Book Title',
    image: 'path/to/image.jpg',
  };

  const collection = {
    condition: 'New',
    distance: 10.5,
  };

  const mockOnClick = vi.fn();
  const mockOnDelete = vi.fn();

  it('renders the book title and image', () => {
    const { getByText, getByAltText } = render(
      <BookCard
        user={user}
        book={book}
        collection={collection}
        type="search"
        onClick={mockOnClick}
        onDelete={mockOnDelete}
      />
    );

    expect(getByText(book.title)).toBeDefined();
    const img = getByAltText('Spinning glass cube');
    expect(img).toBeDefined();
    expect(img.getAttribute('src')).toBe(book.image);
  });

  it('calls onClick when the card is clicked', () => {
    const { container } = render(
      <BookCard
        user={user}
        book={book}
        collection={collection}
        type="search"
        onClick={mockOnClick}
        onDelete={mockOnDelete}
      />
    );

    fireEvent.click(container.firstChild);
    expect(mockOnClick).toHaveBeenCalledTimes(1);
    expect(mockOnClick).toHaveBeenCalledWith(collection);
  });

  it('displays condition and distance when type is "search"', () => {
    const { getByText } = render(
      <BookCard
        user={user}
        book={book}
        collection={collection}
        type="search"
        onClick={mockOnClick}
        onDelete={mockOnDelete}
      />
    );

    expect(getByText(collection.condition)).toBeDefined();
    expect(getByText('10.5 miles away')).toBeDefined();
  });

  it('displays condition when type is "selection"', () => {
    const { getByText } = render(
      <BookCard
        user={user}
        book={book}
        collection={collection}
        type="selection"
        onClick={mockOnClick}
        onDelete={mockOnDelete}
      />
    );

    expect(getByText(collection.condition)).toBeDefined();
    expect(getByText(`Owner: ${user.first_name} ${user.last_name}`)).toBeDefined();
  });

  it('displays condition and delete button when type is "display"', () => {
    const { getByText, getByTestId } = render(
      <BookCard
        user={user}
        book={book}
        collection={collection}
        type="display"
        onClick={mockOnClick}
        onDelete={mockOnDelete}
      />
    );

    expect(getByText(collection.condition)).toBeDefined();

    const deleteButton = getByTestId('delete-button');
    fireEvent.click(deleteButton);
    expect(mockOnDelete).toHaveBeenCalledTimes(1);
    expect(mockOnDelete).toHaveBeenCalledWith(collection);
  });
});