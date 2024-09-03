import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import Collection from './index';
import { useCollections } from '../../contexts/CollectionsContext';
import { useUser } from '../../contexts/UserContext';
import { useNavigate } from 'react-router-dom';

// Mock the required hooks and components
vi.mock('../../contexts/CollectionsContext');
vi.mock('../../contexts/UserContext');
vi.mock('react-router-dom', () => ({
  useNavigate: vi.fn(),
}));
vi.mock('../../components/FullPageSpinner', () => ({ default: () => <div>Loading...</div> }));
vi.mock('../../components/BookCard', () => ({ default: ({ book, onDelete }) => (
  <div data-testid="book-card">
    {book.title}
    <button onClick={() => onDelete({ collection_id: book.id })}>Delete</button>
  </div>
)}));
vi.mock('../../components/CollectionAddForm', () => ({ default: ({ onSubmit }) => (
  <form onSubmit={(e) => { e.preventDefault(); onSubmit({ title: 'New Book' }); }}>
    <button type="submit">Add Book</button>
  </form>
)}));

describe('Collection Component', () => {
  const mockCollections = [
    { collection_id: '1', book: { id: '1', title: 'Book 1' } },
    { collection_id: '2', book: { id: '2', title: 'Book 2' } },
  ];

  const mockCreateCollection = vi.fn();
  const mockDeleteCollection = vi.fn();

  beforeEach(() => {
    useCollections.mockReturnValue({
      collections: mockCollections,
      isLoading: false,
      createCollection: mockCreateCollection,
      deleteCollection: mockDeleteCollection,
    });

    useUser.mockReturnValue({
      user: { id: 'user1' },
      isLoading: false,
    });

    useNavigate.mockReturnValue(vi.fn());
  });

  it('renders the component with collections', () => {
    render(<Collection />);
    expect(screen.getByText('Your Collection')).toBeDefined();
    expect(screen.getAllByTestId('book-card').length).toBe(2);
  });

  it('opens modal when "Add new Book" button is clicked', async () => {
    render(<Collection />);
    fireEvent.click(screen.getByText('Add new Book'));
    expect(screen.getByText('Add new book to collection')).toBeDefined();
  });

  it('calls createCollection when new book is added', async () => {
    render(<Collection />);
    fireEvent.click(screen.getByText('Add new Book'));
    fireEvent.click(screen.getByText('Add Book'));
    expect(mockCreateCollection).toHaveBeenCalledWith({ title: 'New Book' });
  });

  it('calls deleteCollection when a book is deleted', () => {
    render(<Collection />);
    const deleteButtons = screen.getAllByText('Delete');
    fireEvent.click(deleteButtons[0]);
    expect(mockDeleteCollection).toHaveBeenCalledWith('1');
  });

  it('shows loading spinner when isLoading is true', () => {
    useCollections.mockReturnValueOnce({
      ...useCollections(),
      isLoading: true,
    });
    render(<Collection />);
    expect(screen.getByText('Loading...')).toBeDefined();
  });

  it('redirects to home if user is not logged in', () => {
    const mockNavigate = vi.fn();
    useNavigate.mockReturnValue(mockNavigate);
    useUser.mockReturnValueOnce({
      user: null,
      isLoading: false,
    });
    render(<Collection />);
    expect(mockNavigate).toHaveBeenCalledWith('/');
  });
});