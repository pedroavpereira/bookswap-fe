import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { useChats } from '../../contexts/ChatsContext';
import ChatHeader from './index';

// Mock the useChats hook
vi.mock('../../contexts/ChatsContext', () => ({
  useChats: vi.fn(),
}));

describe('ChatHeader', () => {
  it('renders Chat Rooms header when no room is selected', () => {
    useChats.mockReturnValue({ selectedRoom: null });
    const onCloseChat = vi.fn();
    
    render(<ChatHeader onCloseChat={onCloseChat} />);
    
    expect(screen.getByText('Chat Rooms')).to.exist;
    expect(screen.queryByText('Chat Window')).to.not.exist;
    
    fireEvent.click(screen.getByText('Chat Rooms'));
    expect(onCloseChat).toHaveBeenCalledTimes(1);
  });

  it('renders chat window header when a room is selected', () => {
    const selectedRoom = {
      user: { first_name: 'John', last_name: 'Doe' }
    };
    useChats.mockReturnValue({ selectedRoom });
    const onCloseRoom = vi.fn();
    const onCloseChat = vi.fn();
    
    render(<ChatHeader onCloseRoom={onCloseRoom} onCloseChat={onCloseChat} />);
    
    expect(screen.getByText('John Doe')).to.exist;
    expect(screen.queryByText('Chat Rooms')).to.not.exist;
    
    fireEvent.click(screen.getByTestId('back-arrow'));
    expect(onCloseRoom).toHaveBeenCalledTimes(1);
    
    fireEvent.click(screen.getByTestId('close-chat'));
    expect(onCloseChat).toHaveBeenCalledTimes(1);
  });
});