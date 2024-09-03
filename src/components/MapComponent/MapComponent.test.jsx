import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import MapComponent from './index';
import { useBookSwap } from '../../contexts/BookSwapContext';
import { useJsApiLoader } from '@react-google-maps/api';

// Mock the contexts and external libraries
vi.mock('../../contexts/BookSwapContext');
vi.mock('@react-google-maps/api', async () => {
  const actual = await vi.importActual('@react-google-maps/api');
  return {
    ...actual,
    useJsApiLoader: vi.fn(),
    GoogleMap: ({ children, onLoad }) => (
      <div data-testid="google-map" onClick={() => onLoad && onLoad(mockMap)}>
        {children}
      </div>
    ),
    Marker: () => <div data-testid="marker" />,
    Circle: () => <div data-testid="circle" />,
  };
});

const mockMap = {
  setCenter: vi.fn(),
  setZoom: vi.fn(),
};

describe('MapComponent', () => {
  const mockObfuscatedLocations = {
    user1: { lat: 40, lng: -74 },
    user2: { lat: 41, lng: -75 },
  };

  beforeEach(() => {
    useBookSwap.mockReturnValue({
      obfuscatedLocations: mockObfuscatedLocations,
      setSelectedUser: vi.fn(),
    });

    useJsApiLoader.mockReturnValue({
      isLoaded: true,
      loadError: null,
    });

    // Clear mock function calls
    mockMap.setCenter.mockClear();
    mockMap.setZoom.mockClear();
  });

  it('renders loading state when map is not loaded', () => {
    useJsApiLoader.mockReturnValue({
      isLoaded: false,
      loadError: null,
    });

    render(<MapComponent />);
    expect(screen.getByText('Loading maps...')).toBeTruthy();
  });

  it('renders error state when there is a load error', () => {
    useJsApiLoader.mockReturnValue({
      isLoaded: false,
      loadError: new Error('Failed to load'),
    });

    render(<MapComponent />);
    expect(screen.getByText('Error loading maps: Failed to load')).toBeTruthy();
  });

  it('renders the map when loaded successfully', () => {
    render(<MapComponent latitude={40} longitude={-74} />);
    expect(screen.getByTestId('google-map')).toBeTruthy();
  });

  it('renders markers and circles for obfuscated locations', () => {
    render(<MapComponent latitude={40} longitude={-74} />);
    
    const markers = screen.getAllByTestId('marker');
    const circles = screen.getAllByTestId('circle');
    expect(markers.length).toBe(2); // One for each obfuscated location
    expect(circles.length).toBe(3); // One for current location, two for obfuscated locations
  });

  it('does not render markers or circles when latitude and longitude are undefined', () => {
    render(<MapComponent />);
    
    const markers = screen.queryAllByTestId('marker');
    const circles = screen.queryAllByTestId('circle');
    expect(markers.length).toBe(2); // Only obfuscated locations
    expect(circles.length).toBe(2); // Only obfuscated locations
  });

  it('centers the map when latitude and longitude are provided', () => {
    render(<MapComponent latitude={40} longitude={-74} />);
    
    const googleMap = screen.getByTestId('google-map');
    fireEvent.click(googleMap); // Simulate the onLoad event

    expect(mockMap.setCenter).toHaveBeenCalledWith({ lat: 40, lng: -74 });
    expect(mockMap.setZoom).toHaveBeenCalledWith(15);
  });
});