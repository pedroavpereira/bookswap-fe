import React from 'react';
import { describe, it, vi, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Login from './index';
import { useUser } from '../../contexts/UserContext';
import { useNavigate } from 'react-router-dom';

// Mock dependencies
vi.mock('../../contexts/UserContext');
vi.mock('react-router-dom', () => ({
  useNavigate: vi.fn(),
}));
vi.mock('../../components/FullPageSpinner', () => ({
  default: () => <div data-testid="full-page-spinner">Loading...</div>,
}));

describe('Login Component', () => {
  const mockLogin = vi.fn();
  const mockNavigate = vi.fn();

  beforeEach(() => {
    vi.mocked(useUser).mockReturnValue({
      user: null,
      login: mockLogin,
      isLoading: false,
    });
    vi.mocked(useNavigate).mockReturnValue(mockNavigate);
  });

  it('renders login form correctly', () => {
    render(<Login />);
    expect(screen.getByPlaceholderText('Email')).toBeDefined();
    expect(screen.getByPlaceholderText('Password')).toBeDefined();
    expect(screen.getByRole('button', { name: 'Login' })).toBeDefined();
  });

  it('handles input changes', () => {
    render(<Login />);
    const emailInput = screen.getByPlaceholderText('Email');
    const passwordInput = screen.getByPlaceholderText('Password');

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    expect(emailInput.value).toBe('test@example.com');
    expect(passwordInput.value).toBe('password123');
  });

  it('submits the form and calls login function', () => {
    render(<Login />);
    const emailInput = screen.getByPlaceholderText('Email');
    const passwordInput = screen.getByPlaceholderText('Password');
    const submitButton = screen.getByRole('button', { name: 'Login' });

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(submitButton);

    expect(mockLogin).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: 'password123',
    });
  });

  it('displays loading spinner when isLoading is true', () => {
    vi.mocked(useUser).mockReturnValue({
      user: null,
      login: mockLogin,
      isLoading: true,
    });

    render(<Login />);
    expect(screen.getByTestId('full-page-spinner')).toBeDefined();
  });

  it('navigates to home page when user is logged in', () => {
    vi.mocked(useUser).mockReturnValue({
      user: { id: 1, email: 'test@example.com' },
      login: mockLogin,
      isLoading: false,
    });

    render(<Login />);
    expect(mockNavigate).toHaveBeenCalledWith('/');
  });
});