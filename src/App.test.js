import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/Bruno Accorsi Bergoli/i);
  expect(linkElement).toBeInTheDocument();
});
