import { render, screen } from 'test-utils/testing-library-utils';
import userEvent from '@testing-library/user-event';
import ScoopOption from '../ScoopOption';

const dummyScoop = {
  name: 'Vanilla',
  imagePath: 'http://localhost:3030/vanilla.png',
};

test('should not turn to red if user types valid value', async () => {
  render(<ScoopOption scoop={dummyScoop} />);
  const user = userEvent.setup();

  const input = await screen.findByRole('spinbutton', { name: /vanilla/i });
  expect(input).not.toHaveClass('is-invalid');

  await user.clear(input);
  await user.type(input, '9');
  expect(input).not.toHaveClass('is-invalid');
});

test('turns to red if user types negative value', async () => {
  render(<ScoopOption scoop={dummyScoop} />);
  const user = userEvent.setup();

  const input = await screen.findByRole('spinbutton', { name: /vanilla/i });
  expect(input).not.toHaveClass('is-invalid');

  await user.clear(input);
  await user.type(input, '-9');
  expect(input).toHaveClass('is-invalid');
});

test('turns red if user types decimal value', async () => {
  render(<ScoopOption scoop={dummyScoop} />);
  const user = userEvent.setup();

  const input = await screen.findByRole('spinbutton', { name: /vanilla/i });
  expect(input).not.toHaveClass('is-invalid');

  await user.clear(input);
  await user.type(input, '1.5');
  expect(input).toHaveClass('is-invalid');
});

test('turns red if user types more than or equals 10', async () => {
  render(<ScoopOption scoop={dummyScoop} />);
  const user = userEvent.setup();

  const input = await screen.findByRole('spinbutton', { name: /vanilla/i });
  expect(input).not.toHaveClass('is-invalid');

  await user.clear(input);
  await user.type(input, '11');
  expect(input).toHaveClass('is-invalid');
});

test('turns to default style from red if user extracts invalid value', async () => {
  render(<ScoopOption scoop={dummyScoop} />);
  const user = userEvent.setup();

  const input = await screen.findByRole('spinbutton', { name: /vanilla/i });
  await user.clear(input);
  await user.type(input, '-2');
  expect(input).toHaveClass('is-invalid');

  await user.clear(input);
  await user.type(input, '2');
  expect(input).not.toHaveClass('is-invalid');
});
