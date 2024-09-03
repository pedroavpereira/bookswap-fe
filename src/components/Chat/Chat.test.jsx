import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { useChats } from '../../contexts/ChatsContext';
import Chat from './index';

// Mock the useChats hook
vi.mock('../../contexts/ChatsContext', () => ({
  useChats: vi.fn(),
}));

// Mock the child components
vi.mock('../ChatRoom', () => ({
  default: ({ room, onClick }) => (
    <div data-testid={`chat-room-${room.room_id}`} onClick={() => onClick(room)}>
      Mock ChatRoom
    </div>
  ),
}));

vi.mock('../ChatHeader', () => ({
  default: ({ onCloseChat, onCloseRoom }) => (
    <div data-testid="chat-header">
      <button onClick={onCloseChat}>Close Chat</button>
      <button onClick={onCloseRoom}>Close Room</button>
    </div>
  ),
}));

vi.mock('../ChatWindow', () => ({
  default: () => <div data-testid="chat-window">Mock ChatWindow</div>,
}));

// Mock the react-icons
vi.mock('react-icons/hi2', () => ({
  HiMiniChatBubbleOvalLeftEllipsis: () => <div>Mock Icon</div>,
}));

describe('Chat Component', () => {
  const mockRooms = [
    { room_id: '1', name: 'Room 1' },
    { room_id: '2', name: 'Room 2' },
  ];

  const mockUseChats = {
    rooms: mockRooms,
    onRoomSelected: vi.fn(),
    selectedRoom: null,
    resetMessages: vi.fn(),
  };

  beforeEach(() => {
    useChats.mockReturnValue(mockUseChats);
  });

  it('calls onRoomSelected when a chat room is clicked', () => {
    render(<Chat />);
    fireEvent.click(screen.getByText('Chat Now'));
    const chatRoom = screen.getByTestId('chat-room-1');
    fireEvent.click(chatRoom);
    expect(mockUseChats.onRoomSelected).toHaveBeenCalledWith(mockRooms[0]);
  });

  it('closes the chat when the close button is clicked', () => {
    render(<Chat />);
    fireEvent.click(screen.getByText('Chat Now'));
    const closeButton = screen.getByText('Close Chat');
    fireEvent.click(closeButton);
    expect(screen.queryByTestId('chat-header')).toBeNull();
    expect(screen.getByText('Chat Now')).toBeDefined();
  });

  it('resets messages and selected room when closing the chat', () => {
    render(<Chat />);
    fireEvent.click(screen.getByText('Chat Now'));
    const closeButton = screen.getByText('Close Chat');
    fireEvent.click(closeButton);
    expect(mockUseChats.onRoomSelected).toHaveBeenCalledWith(null);
    expect(mockUseChats.resetMessages).toHaveBeenCalled();
  });

  it('closes the current room when the close room button is clicked', () => {
    useChats.mockReturnValue({ ...mockUseChats, selectedRoom: mockRooms[0] });
    render(<Chat />);
    fireEvent.click(screen.getByText('Chat Now'));
    const closeRoomButton = screen.getByText('Close Room');
    fireEvent.click(closeRoomButton);
    expect(mockUseChats.onRoomSelected).toHaveBeenCalledWith(null);
    expect(mockUseChats.resetMessages).toHaveBeenCalled();
  });
});