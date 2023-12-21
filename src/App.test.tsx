import { render, screen } from '@testing-library/react';
import App from './App';
import 'jest-canvas-mock';

test('renders strand canvas component', () => {
  render(<App />);
  const strandCanvasElement = screen.getByTestId("strand-canvas");
  expect(strandCanvasElement).toBeInTheDocument();
});
