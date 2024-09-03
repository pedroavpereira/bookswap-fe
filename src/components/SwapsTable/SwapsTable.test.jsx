import React from 'react'; // Import React for JSX usage
import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import SwapsTable from './index'; // Adjust the import path as necessary

describe('SwapsTable component', () => {
  it('renders the table correctly with the provided onRender content', () => {
    // Create some mock content to render inside the table
    const mockContent = <tr><td>Test Content</td></tr>;

    // Render the SwapsTable component with the mock content passed to onRender
    const { getByText } = render(<SwapsTable onRender={mockContent} />);

    // Check if the mock content is rendered correctly
    expect(getByText('Test Content')).to.exist; // Chai assertion
  });
});
