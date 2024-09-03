import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { expect } from 'chai';
import { describe, it, beforeEach, vi } from 'vitest';
import { MemoryRouter, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useUser } from '../../contexts/UserContext';
import Register from './index';
import FullPageSpinner from '../../components/FullPageSpinner';

// Correctly partially mock react-router-dom
vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useNavigate: vi.fn(), // Mock only the useNavigate function
  };
});

// Mock axios
vi.mock('axios');

// Mock useUser hook
vi.mock('../../contexts/UserContext', () => ({
  useUser: vi.fn(),
}));

// Mock FullPageSpinner component
vi.mock('../../components/FullPageSpinner', () => ({
  default: () => <div>Loading...</div>,
}));

describe('Register Component', () => {
  let mockNavigate;
  const mockRegister = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();

    // Reinitialize mockNavigate before each test
    mockNavigate = vi.fn();

    // Ensure useNavigate returns our mockNavigate function
    useNavigate.mockReturnValue(mockNavigate);

    // Provide default return value for useUser hook
    useUser.mockReturnValue({
      user: null,
      register: mockRegister,
      isLoading: false,
    });
  });

  it('renders the registration form', () => {
    render(
      <MemoryRouter>
        <Register />
      </MemoryRouter>
    );

    expect(screen.getByPlaceholderText('First Name')).to.exist;
    expect(screen.getByPlaceholderText('Last Name')).to.exist;
    expect(screen.getByPlaceholderText('Email')).to.exist;
    expect(screen.getByPlaceholderText('Password')).to.exist;
    expect(screen.getByPlaceholderText('Postcode')).to.exist;
    expect(screen.getByRole('button', { name: /register/i })).to.exist;
  });

  it('shows loading spinner when isLoading is true', () => {
    useUser.mockReturnValueOnce({
      user: null,
      register: mockRegister,
      isLoading: true,
    });

    render(
      <MemoryRouter>
        <Register />
      </MemoryRouter>
    );

    expect(screen.getByText('Loading...')).to.exist;
  });

  it('redirects to home if user is already logged in', () => {
    useUser.mockReturnValueOnce({
      user: { id: 1 },
      register: mockRegister,
      isLoading: false,
    });

    render(
      <MemoryRouter>
        <Register />
      </MemoryRouter>
    );

    expect(mockNavigate).toHaveBeenCalledWith('/');
  });

  it('handles registration submission with correct data', async () => {
    const postcode = '12345';
    const mockCoordinates = { lat: 51.509865, lng: -0.118092 };

    axios.get.mockResolvedValueOnce({
      data: {
        status: 200,
        result: {
          latitude: mockCoordinates.lat,
          longitude: mockCoordinates.lng,
        },
      },
    });

    render(
      <MemoryRouter>
        <Register />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText('First Name'), {
      target: { value: 'John' },
    });
    fireEvent.change(screen.getByPlaceholderText('Last Name'), {
      target: { value: 'Doe' },
    });
    fireEvent.change(screen.getByPlaceholderText('Email'), {
      target: { value: 'john.doe@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('Password'), {
      target: { value: 'password123' },
    });
    fireEvent.change(screen.getByPlaceholderText('Postcode'), {
      target: { value: postcode },
    });

    fireEvent.click(screen.getByRole('button', { name: /register/i }));

    await waitFor(() =>
      expect(axios.get).toHaveBeenCalledWith(`https://api.postcodes.io/postcodes/${postcode}`)
    );
    await waitFor(() =>
      expect(mockRegister).toHaveBeenCalledWith({
        email: 'john.doe@example.com',
        password: 'password123',
        first_name: 'John',
        last_name: 'Doe',
        lat: mockCoordinates.lat,
        lng: mockCoordinates.lng,
      })
    );

    expect(mockNavigate).toHaveBeenCalledWith('/');
  });

  it('handles postcode conversion error gracefully', async () => {
    axios.get.mockRejectedValueOnce(new Error('Failed to fetch'));

    render(
      <MemoryRouter>
        <Register />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText('Postcode'), {
      target: { value: 'invalid' },
    });

    fireEvent.click(screen.getByRole('button', { name: /register/i }));

    await waitFor(() => expect(axios.get).toHaveBeenCalledTimes(1));
    await waitFor(() =>
      expect(mockRegister).toHaveBeenCalledWith({
        email: '',
        password: '',
        first_name: '',
        last_name: '',
        lat: 0,
        lng: 0,
      })
    );

    expect(mockNavigate).toHaveBeenCalledWith('/');
  });
});
