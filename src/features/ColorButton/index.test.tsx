import { render, screen, fireEvent } from '@testing-library/react';
import ColorButton from '.';

describe('Button', () => {
  test('has correct initial text and color', () => {
    render(<ColorButton />);
    const button = screen.getByRole('button', { name: 'Change to blue' });

    expect(button).toHaveStyle({ backgroundColor: 'red' });
  });

  test('terns to blue and changes text when clicked once', () => {
    render(<ColorButton />);
    const button = screen.getByRole('button', { name: 'Change to blue' });

    expect(button).toHaveStyle({ backgroundColor: 'red' });

    fireEvent.click(button);

    expect(button).toHaveTextContent('Change to red');
    expect(button).toHaveStyle({ backgroundColor: 'blue' });
  });
});

describe('ColorButton', () => {
  test('have correct initial conditions', () => {
    render(<ColorButton />);
    const button = screen.getByRole('button', { name: 'Change to blue' });
    const checkbox = screen.getByRole('checkbox', {
      name: 'Disable button',
    });

    expect(button).toBeEnabled();
    expect(checkbox).not.toBeChecked();
  });

  test('terns to correct conditions', () => {
    render(<ColorButton />);
    const button = screen.getByRole('button', { name: 'Change to blue' });
    const checkbox = screen.getByRole('checkbox', {
      name: 'Disable button',
    });

    fireEvent.click(checkbox);
    expect(checkbox).toBeChecked();
    expect(button).toBeDisabled();

    fireEvent.click(checkbox);
    expect(checkbox).not.toBeChecked();
    expect(button).toBeEnabled();
  });

  describe('disabled button has gray background and reverts to red when enabled', () => {
    test('disabled button has gray background and reverts to previous color when enabled', () => {
      render(<ColorButton />);
      const button = screen.getByRole('button', { name: 'Change to blue' });
      const checkbox = screen.getByRole('checkbox', { name: 'Disable button' });

      fireEvent.click(checkbox);
      expect(button).toHaveStyle({ backgroundColor: 'gray' });

      fireEvent.click(checkbox);
      expect(button).toHaveStyle({ backgroundColor: 'red' });
    });

    test('disabled button has gray background and reverts to blue when enabled', () => {
      render(<ColorButton />);
      const button = screen.getByRole('button', { name: 'Change to blue' });
      const checkbox = screen.getByRole('checkbox', { name: 'Disable button' });

      fireEvent.click(button);
      expect(button).toHaveStyle({ backgroundColor: 'blue' });

      fireEvent.click(checkbox);
      expect(button).toHaveStyle({ backgroundColor: 'gray' });

      fireEvent.click(checkbox);
      expect(button).toHaveStyle({ backgroundColor: 'blue' });
    });
  });
});
