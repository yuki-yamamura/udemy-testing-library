import { render, screen, fireEvent } from '@testing-library/react';
import ColorButton from '.';

describe('Button', () => {
  test('has correct initial text and color', () => {
    render(<ColorButton />);
    const button = screen.getByRole('button', {
      name: 'Change to Midnight Blue',
    });

    expect(button).toHaveStyle({ backgroundColor: 'MediumVioletRed' });
  });

  test('terns to Midnight Blue and changes text when clicked once', () => {
    render(<ColorButton />);
    const button = screen.getByRole('button', {
      name: 'Change to Midnight Blue',
    });

    expect(button).toHaveStyle({ backgroundColor: 'MediumVioletRed' });

    fireEvent.click(button);

    expect(button).toHaveTextContent('Change to Medium Violet Red');
    expect(button).toHaveStyle({ backgroundColor: 'MidnightBlue' });
  });
});

describe('ColorButton', () => {
  test('have correct initial conditions', () => {
    render(<ColorButton />);
    const button = screen.getByRole('button', {
      name: 'Change to Midnight Blue',
    });
    const checkbox = screen.getByRole('checkbox', {
      name: 'Disable button',
    });

    expect(button).toBeEnabled();
    expect(checkbox).not.toBeChecked();
  });

  test('terns to correct conditions', () => {
    render(<ColorButton />);
    const button = screen.getByRole('button', {
      name: 'Change to Midnight Blue',
    });
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

  describe('disabled button has gray background and reverts to Medium Violet Red when enabled', () => {
    test('disabled button has gray background and reverts to previous color when enabled', () => {
      render(<ColorButton />);
      const button = screen.getByRole('button', {
        name: 'Change to Midnight Blue',
      });
      const checkbox = screen.getByRole('checkbox', { name: 'Disable button' });

      fireEvent.click(checkbox);
      expect(button).toHaveStyle({ backgroundColor: 'gray' });

      fireEvent.click(checkbox);
      expect(button).toHaveStyle({ backgroundColor: 'Midnight Blue' });
    });

    test('disabled button has gray background and reverts to Midnight Blue when enabled', () => {
      render(<ColorButton />);
      const button = screen.getByRole('button', {
        name: 'Change to Midnight Blue',
      });
      const checkbox = screen.getByRole('checkbox', { name: 'Disable button' });

      fireEvent.click(button);
      expect(button).toHaveStyle({ backgroundColor: 'MidnightBlue' });

      fireEvent.click(checkbox);
      expect(button).toHaveStyle({ backgroundColor: 'gray' });

      fireEvent.click(checkbox);
      expect(button).toHaveStyle({ backgroundColor: 'MidnightBlue' });
    });
  });
});
