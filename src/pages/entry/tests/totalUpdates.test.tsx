import { render, screen } from 'test-utils/testing-library-utils';
import userEvent from '@testing-library/user-event';
import Options from '../Options';
import OrderEntry from '../OrderEntry';

test('update scoop subtotal when scoops change', async () => {
  render(<Options optionType="scoops" />);

  const user = userEvent.setup();

  const scoopsSubtotal = screen.getByText('Scoops total: $', { exact: false });
  expect(scoopsSubtotal).toHaveTextContent('0.00');

  const vanillaInput = await screen.findByRole('spinbutton', {
    name: /vanilla/i,
  });
  await user.clear(vanillaInput);
  await user.type(vanillaInput, '1');
  expect(scoopsSubtotal).toHaveTextContent('2.00');

  const chocolateInput = await screen.findByRole('spinbutton', {
    name: /chocolate/i,
  });
  await user.clear(chocolateInput);
  await user.type(chocolateInput, '2');
  expect(scoopsSubtotal).toHaveTextContent('6.00');
});

test('update topping subtotal when toppings change', async () => {
  render(<Options optionType="toppings" />);
  const user = userEvent.setup();

  const toppingSubtotal = screen.getByText('Toppings total: $', {
    exact: false,
  });
  expect(toppingSubtotal).toHaveTextContent('$0.00');

  const cherriesCheckbox = await screen.findByRole('checkbox', {
    name: /cherries/i,
  });
  await user.click(cherriesCheckbox);
  expect(toppingSubtotal).toHaveTextContent('$1.50');

  const hotFudgeCheckbox = await screen.findByRole('checkbox', {
    name: /hot fudge/i,
  });
  await user.click(hotFudgeCheckbox);
  expect(toppingSubtotal).toHaveTextContent('$3.00');

  await user.click(cherriesCheckbox);
  expect(toppingSubtotal).toHaveTextContent('$1.50');
});

describe('grand total', () => {
  test('starts at $0.00', () => {
    const { unmount } = render(<OrderEntry />);

    const glandTotal = screen.getByRole('heading', {
      name: /Gland total: \$/,
    });
    expect(glandTotal).toHaveTextContent('$0.00');

    unmount();
  });

  test('updates properly if scoop is added first', async () => {
    render(<OrderEntry />);
    const user = userEvent.setup();
    const glandTotal = screen.getByRole('heading', {
      name: /Gland total: \$/,
    });

    const chocolateScoop = await screen.findByRole('spinbutton', {
      name: /chocolate/i,
    });
    await user.clear(chocolateScoop);
    await user.type(chocolateScoop, '1');
    expect(glandTotal).toHaveTextContent('$2.00');

    const MandMsTopping = await screen.findByRole('checkbox', {
      name: /M&Ms/i,
    });

    await user.click(MandMsTopping);
    expect(glandTotal).toHaveTextContent('$3.50');
  });
  test('updates properly if topping is added first', async () => {
    render(<OrderEntry />);
    const user = userEvent.setup();
    const glandTotal = screen.getByRole('heading', {
      name: /Gland total: \$/,
    });

    const cherriesTopping = await screen.findByRole('checkbox', {
      name: /cherries/i,
    });
    await user.click(cherriesTopping);
    expect(glandTotal).toHaveTextContent('$1.50');

    const vanillaScoop = await screen.findByRole('spinbutton', {
      name: /vanilla/i,
    });
    await user.clear(vanillaScoop);
    await user.type(vanillaScoop, '2');
    expect(glandTotal).toHaveTextContent('$5.50');
  });

  test('updates property if item is removed', async () => {
    render(<OrderEntry />);
    const user = userEvent.setup();
    const glandTotal = screen.getByRole('heading', {
      name: /Gland total: \$/,
    });

    const chocolateScoop = await screen.findByRole('spinbutton', {
      name: /chocolate/i,
    });
    await user.clear(chocolateScoop);
    await user.type(chocolateScoop, '2');
    expect(glandTotal).toHaveTextContent('$4.00');

    const vanillaScoop = await screen.findByRole('spinbutton', {
      name: /vanilla/i,
    });
    await user.clear(vanillaScoop);
    await user.type(vanillaScoop, '1');
    expect(glandTotal).toHaveTextContent('$6.00');

    const cherriesTopping = await screen.findByRole('checkbox', {
      name: /cherries/i,
    });
    await user.click(cherriesTopping);
    expect(glandTotal).toHaveTextContent('$7.50');

    await user.clear(chocolateScoop);
    await user.type(chocolateScoop, '0');
    expect(glandTotal).toHaveTextContent('$3.50');

    await user.clear(vanillaScoop);
    await user.type(vanillaScoop, '3');
    expect(glandTotal).toHaveTextContent('$7.50');

    await user.click(cherriesTopping);
    expect(glandTotal).toHaveTextContent('$6.00');

    const hotFudgeCheckbox = await screen.findByRole('checkbox', {
      name: /hot fudge/i,
    });
    await user.click(hotFudgeCheckbox);
    expect(glandTotal).toHaveTextContent('$7.50');

    await user.click(cherriesTopping);
    expect(glandTotal).toHaveTextContent('$9.00');
  });
});
