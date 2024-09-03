import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import WishListCard from './index';

// Mock the react-icons components
vi.mock('react-icons/hi', () => ({
  HiClock: () => <div data-testid="clock-icon" />,
  HiTrash: ({ onClick }) => <div data-testid="trash-icon" onClick={onClick} />,
}));

describe('WishListCard', () => {
  const mockWish = {
    book: {
      title: 'Test Book',
      image: 'test-image.jpg',
    },
    radius: 10,
    wishlist_id: '123',
  };

  const mockOnDelete = vi.fn();

  it('renders the component with correct book information', () => {
    render(<WishListCard wish={mockWish} onDelete={mockOnDelete} />);

    expect(screen.getByText('Test Book')).toBeInTheDocument();
    expect(screen.getByText('10 miles')).toBeInTheDocument();
    expect(screen.getByAltText('Spinning glass cube')).toHaveAttribute('src', 'test-image.jpg');
  });

  it('calls onDelete function when trash icon is clicked', () => {
    render(<WishListCard wish={mockWish} onDelete={mockOnDelete} />);

    const trashIcon = screen.getByTestId('trash-icon');
    fireEvent.click(trashIcon);

    expect(mockOnDelete).toHaveBeenCalledWith('123');
  });

  it('renders the correct link for the book image', () => {
    render(<WishListCard wish={mockWish} onDelete={mockOnDelete} />);

    const linkElement = screen.getByRole('link');
    expect(linkElement).toHaveAttribute('href', '/');
  });

  it('applies correct CSS classes', () => {
    render(<WishListCard wish={mockWish} onDelete={mockOnDelete} />);

    expect(screen.getByTestId('card-container')).toHaveClass('card-container');
    expect(screen.getByTestId('main-content')).toHaveClass('main-content');
    expect(screen.getByTestId('time-left')).toHaveClass('time-left');
  });
});