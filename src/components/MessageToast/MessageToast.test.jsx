import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import MessageToast from './index';
import toast from 'react-hot-toast';

// Mock react-hot-toast
vi.mock('react-hot-toast', () => ({
  default: {
    dismiss: vi.fn(),
  },
}));

describe('MessageToast', () => {
  const mockProps = {
    title: 'Test Title',
    subtitle: 'Test Subtitle',
    t: { id: 'test-id' },
  };

  it('renders with correct title and subtitle', () => {
    render(<MessageToast {...mockProps} />);

    expect(screen.getByText('Test Title')).toBeTruthy();
    expect(screen.getByText('Test Subtitle')).toBeTruthy();
  });

  it('has correct CSS classes', () => {
    render(<MessageToast {...mockProps} />);

    const toastElement = screen.getByRole('alert');
    expect(toastElement.classList.contains('info')).toBe(true);
  });

  it('calls toast.dismiss with correct id when close button is clicked', () => {
    render(<MessageToast {...mockProps} />);

    const closeButton = screen.getByRole('button');
    fireEvent.click(closeButton);

    expect(toast.dismiss).toHaveBeenCalledWith('test-id');
  });

  it('renders icon wrapper and icon', () => {
    render(<MessageToast {...mockProps} />);

    expect(screen.getByTestId('icon-wrapper')).toBeTruthy();
    expect(screen.getByTestId('icon')).toBeTruthy();
  });

  it('renders close button', () => {
    render(<MessageToast {...mockProps} />);

    expect(screen.getByRole('button')).toBeTruthy();
  });
});