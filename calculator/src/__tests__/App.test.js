import { render, screen, fireEvent } from '@testing-library/react';
import App from '../App';

test('renders display and keypad', () => {
  render(<App />);
  expect(screen.getAllByText(/History/i)[0]).toBeInTheDocument();
  expect(screen.getAllByText('0')[0]).toBeInTheDocument();
});

test('performs addition correctly', () => {
  render(<App />);
  fireEvent.click(screen.getByText('2'));
  fireEvent.click(screen.getByText('+'));
  fireEvent.click(screen.getByText('3'));
  fireEvent.click(screen.getByText('='));
  expect(screen.getByText('5')).toBeInTheDocument();
});
