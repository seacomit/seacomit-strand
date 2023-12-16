import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders strand canvas component', () => {
  render(<App />);
  const strandCanvasElement = screen.getByTestId("strand-canvas");
  expect(strandCanvasElement).toBeInTheDocument();
});
