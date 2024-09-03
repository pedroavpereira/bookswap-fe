import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { expect as chaiExpect } from 'chai';
import HomePage from './index';

// Mock the SearchForm component
vi.mock('../../components/SearchForm', () => ({
  default: () => <div data-testid="search-form">SearchForm</div>,
}));

describe('HomePage', () => {
  it('renders without crashing', () => {
    render(<HomePage />);
    expect(screen.getByText('Book Nest')).toBeDefined();
  });

  it('displays the correct header and subheader', () => {
    render(<HomePage />);
    
    const header = screen.getByText('Book Nest');
    const subheader = screen.getByText('Find Books. Swap Stories');

    chaiExpect(header).to.exist;
    chaiExpect(subheader).to.exist;
    chaiExpect(header.tagName).to.equal('H1');
    chaiExpect(subheader.tagName).to.equal('H2');
  });

  it('includes the SearchForm component', () => {
    render(<HomePage />);
    const searchForm = screen.getByTestId('search-form');
    chaiExpect(searchForm).to.exist;
  });

  it('has the correct CSS classes', () => {
    const { container } = render(<HomePage />);
    const homepageDiv = container.firstChild;

    chaiExpect(homepageDiv.className).to.include('homepage-background');
    chaiExpect(homepageDiv.querySelector('.homepage-headers-container')).to.exist;
    chaiExpect(homepageDiv.querySelector('.homepage-header')).to.exist;
    chaiExpect(homepageDiv.querySelector('.homepage-subheader')).to.exist;
  });
});