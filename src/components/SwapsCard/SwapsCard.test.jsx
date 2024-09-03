import React from 'react'; // Import React for JSX usage
import { render } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import SwapsCard from './index'; // Adjust the path as necessary

// Mock the useUser hook from UserContext
vi.mock('../../contexts/UserContext', () => ({
  useUser: () => ({
    user: {
      user_id: 1,
    },
  }),
}));

describe('SwapsCard component', () => {
  const swap = {
    user_offered: 1,
    bookOffered: {
      title: 'Offered Book Title',
      image: 'path/to/offered-image.jpg',
    },
    bookRequested: {
      title: 'Requested Book Title',
      image: 'path/to/requested-image.jpg',
    },
  };

  it('renders the book title and image when type is "accepted"', () => {
    const { getByText, getByAltText } = render(
      <SwapsCard swap={swap} type="accepted" />
    );

    expect(getByText(swap.bookOffered.title)).to.exist; // Chai assertion
    expect(getByAltText('Spinning glass cube').src).to.contain(swap.bookOffered.image); // Chai assertion
  });

  it('renders the requested book title and image when type is "pending"', () => {
    const { getByText, getByAltText } = render(
      <SwapsCard swap={swap} type="pending" />
    );

    expect(getByText(swap.bookRequested.title)).to.exist; // Chai assertion
    expect(getByAltText('Spinning glass cube').src).to.contain(swap.bookRequested.image); // Chai assertion
  });

  it('renders children correctly', () => {
    const { getByText } = render(
      <SwapsCard swap={swap} type="pending">
        <div>Test Child</div>
      </SwapsCard>
    );

    expect(getByText('Test Child')).to.exist; // Chai assertion
  });
});
