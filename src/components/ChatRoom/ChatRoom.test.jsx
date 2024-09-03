import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import { useUser } from '../../contexts/UserContext';
import ChatRoom from './index';

// Mock the UserContext
vi.mock('../../contexts/UserContext', () => ({
  useUser: vi.fn(),
}));

// Mock react-icons
vi.mock('react-icons/fa6', () => ({
  FaCircleUser: () => <div data-testid="mock-user-icon" />,
}));

describe('ChatRoom', () => {
  const mockOnClick = vi.fn();
  const mockUser = { user_id: 'user1' };

  beforeEach(() => {
    vi.clearAllMocks();
    useUser.mockReturnValue({ user: mockUser });
  });

  it('renders the chat room with user name', () => {
    const room = {
      room_id: 'room1',
      user: { first_name: 'John', last_name: 'Doe' },
    };

    const { getByText } = render(<ChatRoom room={room} onClick={mockOnClick} />);

    expect(getByText('John Doe')).toBeTruthy();
  });

  it('displays the last message when available', () => {
    const room = {
      room_id: 'room1',
      user: { first_name: 'John', last_name: 'Doe' },
      last_message: { message: 'Hello there!' },
    };

    const { getByText } = render(<ChatRoom room={room} onClick={mockOnClick} />);

    expect(getByText('Hello there!')).toBeTruthy();
  });

  it('shows unread indicator for unread messages not sent by the current user', () => {
    const room = {
      room_id: 'room1',
      user: { first_name: 'John', last_name: 'Doe' },
      last_message: { message: 'New message', read: false, user_sent: 'user2' },
    };

    const { container } = render(<ChatRoom room={room} onClick={mockOnClick} />);

    expect(container.querySelector('.unread-icon')).toBeTruthy();
  });

  it('does not show unread indicator for read messages', () => {
    const room = {
      room_id: 'room1',
      user: { first_name: 'John', last_name: 'Doe' },
      last_message: { message: 'Read message', read: true, user_sent: 'user2' },
    };

    const { container } = render(<ChatRoom room={room} onClick={mockOnClick} />);

    expect(container.querySelector('.unread-icon')).toBeFalsy();
  });

  it('calls onClick with room_id when clicked', () => {
    const room = {
      room_id: 'room1',
      user: { first_name: 'John', last_name: 'Doe' },
    };

    const { container } = render(<ChatRoom room={room} onClick={mockOnClick} />);

    fireEvent.click(container.firstChild);

    expect(mockOnClick).toHaveBeenCalledWith('room1');
  });
});