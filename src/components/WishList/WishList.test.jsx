import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, vi, expect, beforeEach, afterEach } from 'vitest';
import WishList from './index';

// Mock React
vi.mock('react', async () => {
  const actual = await vi.importActual('react');
  return {
    ...actual,
    default: actual,
  };
});

// Mock the API_URL
vi.mock('../../utils/constants', () => ({
  API_URL: 'http://test-api.com',
}));

// Mock child components
vi.mock('../../components/WishlistAddForm', () => ({
  default: ({ onSubmit }) => (
    <button onClick={() => onSubmit({ title: 'Test Book' })}>Add Book</button>
  ),
}));

vi.mock('../../components/FullPageSpinner', () => ({
  default: () => <div data-testid="full-page-spinner">Loading...</div>,
}));

vi.mock('../../components/WishListCard', () => ({
  default: ({ wish, onDelete }) => (
    <div data-testid={`wishlist-card-${wish.wishlist_id}`}>
      {wish.title}
      <button onClick={() => onDelete(wish.wishlist_id)}>Delete</button>
    </div>
  ),
}));

vi.mock('../../components/BookList', () => ({
  default: ({ children }) => <div data-testid="book-list">{children}</div>,
}));

// Mock useNavigate
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe('WishList component', () => {
  beforeEach(() => {
    localStorage.setItem('token', 'fake-token');
    global.fetch = vi.fn();
    mockNavigate.mockClear();
  });

  afterEach(() => {
    localStorage.clear();
    vi.resetAllMocks();
  });

  it('renders loading spinner initially', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => [],
    });

    render(<WishList />, { wrapper: MemoryRouter });

    expect(screen.getByTestId('full-page-spinner')).toBeTruthy();

    await waitFor(() => {
      expect(screen.queryByTestId('full-page-spinner')).toBeFalsy();
    });
  });

  it('fetches and renders wishlist items', async () => {
    const mockWishlists = [
      { wishlist_id: '1', title: 'Book 1' },
      { wishlist_id: '2', title: 'Book 2' },
    ];

    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockWishlists,
    });

    render(<WishList />, { wrapper: MemoryRouter });

    await waitFor(() => {
      expect(screen.getByText('Book 1')).toBeTruthy();
      expect(screen.getByText('Book 2')).toBeTruthy();
    });
  });

  it('handles adding a new wishlist item', async () => {
    global.fetch
      .mockResolvedValueOnce({
        ok: true,
        json: async () => [],
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ wishlist_id: '3', title: 'Test Book' }),
      });

    render(<WishList />, { wrapper: MemoryRouter });

    await waitFor(() => {
      fireEvent.click(screen.getByText('Add new Book'));
    });

    fireEvent.click(screen.getByText('Add Book'));

    await waitFor(() => {
      expect(screen.getByText('Test Book')).toBeTruthy();
    });
  });

  it('handles deleting a wishlist item', async () => {
    const mockWishlists = [{ wishlist_id: '1', title: 'Book 1' }];

    global.fetch
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockWishlists,
      })
      .mockResolvedValueOnce({
        ok: true,
      });

    render(<WishList />, { wrapper: MemoryRouter });

    await waitFor(() => {
      expect(screen.getByText('Book 1')).toBeTruthy();
    });

    fireEvent.click(screen.getByText('Delete'));

    await waitFor(() => {
      expect(screen.queryByText('Book 1')).toBeFalsy();
    });
  });

  it('displays error message when fetch fails', async () => {
    global.fetch.mockRejectedValueOnce(new Error('Fetch failed'));

    render(<WishList />, { wrapper: MemoryRouter });

    await waitFor(() => {
      expect(screen.getByText('Failed to fetch wishlist. Please try again later.')).toBeTruthy();
    });
  });

  it('redirects to home if no token is found', async () => {
    localStorage.removeItem('token');

    render(<WishList />, { wrapper: MemoryRouter });

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/');
    });
  });
});