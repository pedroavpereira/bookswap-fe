import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import WishlistTable from './index';

// Mock react-bootstrap
vi.mock('react-bootstrap', () => ({
  Table: ({ children }) => <table>{children}</table>,
}));

// Mock react-icons/hi2
vi.mock('react-icons/hi2', () => ({
  HiOutlineTrash: () => <div data-testid="trash-icon">Trash</div>,
}));

describe('WishlistTable', () => {
  const mockWishs = [
    {
      wishlist_id: '1',
      book: {
        title: 'Test Book 1',
        image: 'http://example.com/image1.jpg',
      },
      radius: 10,
    },
    {
      wishlist_id: '2',
      book: {
        title: 'Test Book 2',
        image: 'http://example.com/image2.jpg',
      },
      radius: 20,
    },
  ];

  const mockOnDelete = vi.fn();

  it('renders the table with correct headers', () => {
    render(<WishlistTable wishs={mockWishs} onDelete={mockOnDelete} />);

    expect(screen.getByText('Book')).toBeTruthy();
    expect(screen.getByText('Title')).toBeTruthy();
    expect(screen.getByText('Radius')).toBeTruthy();
    expect(screen.getByText('Actions')).toBeTruthy();
  });

  it('renders wish items correctly', () => {
    render(<WishlistTable wishs={mockWishs} onDelete={mockOnDelete} />);

    expect(screen.getByText('Test Book 1')).toBeTruthy();
    expect(screen.getByText('Test Book 2')).toBeTruthy();
    expect(screen.getByText('10 miles')).toBeTruthy();
    expect(screen.getByText('20 miles')).toBeTruthy();

    const images = screen.getAllByRole('img');
    expect(images).toHaveLength(2);
    expect(images[0].getAttribute('src')).toBe('http://example.com/image1.jpg');
    expect(images[1].getAttribute('src')).toBe('http://example.com/image2.jpg');
  });

  it('calls onDelete with correct id when trash icon is clicked', () => {
    render(<WishlistTable wishs={mockWishs} onDelete={mockOnDelete} />);

    const trashIcons = screen.getAllByTestId('trash-icon');
    fireEvent.click(trashIcons[0]);

    expect(mockOnDelete).toHaveBeenCalledWith('1');
  });

  it('renders empty table when no wishs are provided', () => {
    render(<WishlistTable wishs={[]} onDelete={mockOnDelete} />);

    expect(screen.queryByText('Test Book 1')).toBeFalsy();
    expect(screen.queryByText('Test Book 2')).toBeFalsy();
  });
});