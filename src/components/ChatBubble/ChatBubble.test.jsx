import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import ChatBubble from './index';

describe('ChatBubble', () => {
  it('renders the message correctly', () => {
    const message = 'Hello, world!';
    render(<ChatBubble message={message} isSelf={false} />);
    expect(screen.getByText(message)).to.exist;
  });

  it('has the correct class for user message', () => {
    render(<ChatBubble message="User message" isSelf={false} />);
    const chatBubble = screen.getByText('User message').closest('.chat-msg');
    expect(chatBubble.classList.contains('user')).to.be.true;
    expect(chatBubble.classList.contains('self')).to.be.false;
  });

  it('has the correct class for self message', () => {
    render(<ChatBubble message="Self message" isSelf={true} />);
    const chatBubble = screen.getByText('Self message').closest('.chat-msg');
    expect(chatBubble.classList.contains('self')).to.be.true;
    expect(chatBubble.classList.contains('user')).to.be.false;
  });
});