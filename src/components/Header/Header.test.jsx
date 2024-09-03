import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import Header from './index';  // Import the actual Header component

// Mock the UserContext
const mockUseUser = vi.fn();
vi.mock('../../contexts/UserContext', () => ({
  useUser: () => mockUseUser(),
}));

// Mock the logo import
vi.mock('../../assets/logo.png', () => ({
  default: 'mocked-logo.png'
}));

describe('Header Component', () => {
  const mockLogout = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  const renderHeader = (user = null) => {
    mockUseUser.mockReturnValue({ user, logout: mockLogout });
    return render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );
  };

  it('renders Home link for all users', () => {
    renderHeader();
    expect(screen.getByText('Home')).toBeInTheDocument();
  });

  it('renders Login and Signup links when user is not authenticated', () => {
    renderHeader();
    expect(screen.getByText('Login')).toBeInTheDocument();
    expect(screen.getByText('Signup')).toBeInTheDocument();
  });

  it('renders Swap, Collection, and Logout links when user is authenticated', () => {
    renderHeader({ id: '1', name: 'Test User' });
    expect(screen.getByText('Swap')).toBeInTheDocument();
    expect(screen.getByText('Collection')).toBeInTheDocument();
    expect(screen.getByText('Logout')).toBeInTheDocument();
  });

  it('does not render Login and Signup links when user is authenticated', () => {
    renderHeader({ id: '1', name: 'Test User' });
    expect(screen.queryByText('Login')).not.toBeInTheDocument();
    expect(screen.queryByText('Signup')).not.toBeInTheDocument();
  });

  it('calls logout function when Logout is clicked', () => {
    renderHeader({ id: '1', name: 'Test User' });
    const logoutLink = screen.getByText('Logout');
    fireEvent.click(logoutLink);
    expect(mockLogout).toHaveBeenCalledTimes(1);
  });
});