import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from 'App';

test('order phases for happy path', async () => {
  const { unmount } = render(<App />);
  const user = userEvent.setup();

  const vanillaScoopInput = await screen.findByRole('spinbutton', {
    name: /vanilla/i,
  });
  await user.clear(vanillaScoopInput);
  await user.type(vanillaScoopInput, '2');

  const hotFudgeTopping = await screen.findByRole('checkbox', {
    name: /hot fudge/i,
  });
  await user.click(hotFudgeTopping);

  const cherriesTopping = screen.getByRole('checkbox', {
    name: /cherries/i,
  });
  await user.click(cherriesTopping);

  const orderButton = screen.getByRole('button', { name: /order sundae/i });
  await user.click(orderButton);

  expect(screen.getByText(/^2 vanilla$/i)).toBeInTheDocument();
  expect(screen.getByText(/^hot fudge$/i)).toBeInTheDocument();
  expect(screen.getByText(/^cherries$/i)).toBeInTheDocument();

  expect(
    screen.getByRole('heading', { name: /scoops: \$4.00$/i }),
  ).toBeInTheDocument();
  expect(
    screen.getByRole('heading', { name: /toppings: \$3.00$/i }),
  ).toBeInTheDocument();

  const termsAndConditionsText = screen.getByRole('checkbox', {
    name: /terms and conditions/i,
  });
  await user.click(termsAndConditionsText);
  const confirmOrderButton = screen.getByRole('button', {
    name: /confirm order/i,
  });
  await user.click(confirmOrderButton);

  const loading = screen.getByText(/loading/i);
  expect(loading).toBeInTheDocument();

  const orderNumberText = await screen.findByText(/order number/i);
  expect(orderNumberText).toHaveTextContent(/\d+$/);

  const notLoading = screen.queryByText(/loading/i);
  expect(notLoading).not.toBeInTheDocument();

  const newOrderButton = screen.getByRole('button', {
    name: /create new order/i,
  });
  await user.click(newOrderButton);

  const scoopInputs = await screen.findAllByRole('spinbutton');
  scoopInputs.forEach((scoopInput) => {
    expect(scoopInput).toHaveValue(0);
  });

  const toppingInputs = await screen.findAllByRole('checkbox');
  toppingInputs.forEach((toppingInput) => {
    expect(toppingInput).not.toBeChecked();
  });

  expect(screen.getByText(/scoops total: \$0.00$/i)).toBeInTheDocument();
  expect(screen.getByText(/toppings total: \$0.00$/i)).toBeInTheDocument();
  expect(screen.getByText(/gland total: \$0.00$/i)).toBeInTheDocument();

  unmount();
});

test('no toppings for happy path', async () => {
  render(<App />);
  const user = userEvent.setup();

  const chocolateInput = await screen.findByRole('spinbutton', {
    name: /chocolate/i,
  });
  await user.clear(chocolateInput);
  await user.type(chocolateInput, '1');

  const orderButton = screen.getByRole('button', { name: /order sundae/i });
  await user.click(orderButton);

  expect(
    screen.getByRole('heading', { name: /scoops: \$2.00/i }),
  ).toBeInTheDocument();
  expect(
    screen.queryByRole('heading', { name: /toppings/i }),
  ).not.toBeInTheDocument();
});
