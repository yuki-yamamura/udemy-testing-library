import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SummaryForm from '../SummaryForm';

describe('SummaryForm', () => {
  test('has correct initial conditions', () => {
    render(<SummaryForm setOrderPhase={jest.fn()} />);
    const checkbox = screen.getByRole('checkbox', {
      name: /terms and conditions/i,
    });
    const button = screen.getByRole('button', { name: /confirm order/i });

    expect(checkbox).not.toBeChecked();
    expect(button).toBeDisabled();
  });

  test('checkbox enables button on first click, and disables on second click', async () => {
    render(<SummaryForm setOrderPhase={jest.fn()} />);
    const user = userEvent.setup();
    const checkbox = screen.getByRole('checkbox', {
      name: /terms and conditions/i,
    });
    const button = screen.getByRole('button', { name: /confirm order/i });

    expect(button).toBeDisabled();

    await user.click(checkbox);
    expect(button).toBeEnabled();

    await user.click(checkbox);
    expect(button).toBeDisabled();
  });
});
