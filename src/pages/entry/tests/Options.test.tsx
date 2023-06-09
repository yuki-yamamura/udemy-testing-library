import { render, screen } from 'test-utils/testing-library-utils';
import { OrderDetailsProvider } from 'contexts/OrderDetails';
import userEvent from '@testing-library/user-event';
import Options from '../Options';

test('displays image for each scoop option from server', async () => {
  render(<Options optionType="scoops" />, { wrapper: OrderDetailsProvider });

  const scoopImages = await screen.findAllByRole<HTMLImageElement>('img', {
    name: /scoop$/i,
  });
  const altText = scoopImages.map((scoopImage) => scoopImage.alt);

  expect(altText).toEqual(['Vanilla scoop', 'Chocolate scoop']);
});

test('displays image for each topping option from server', async () => {
  render(<Options optionType="toppings" />);

  const toppingImages = await screen.findAllByRole<HTMLImageElement>('img', {
    name: /topping$/i,
  });
  const altText = toppingImages.map((toppingImage) => toppingImage.alt);

  expect(altText).toEqual([
    'Cherries topping',
    'M&Ms topping',
    'Hot fudge topping',
  ]);
});

test('invalid input should not affect scoops total', async () => {
  render(<Options optionType="scoops" />);
  const user = userEvent.setup();

  const scoopsTotal = screen.getByText(/scoops total: \$/i);
  expect(scoopsTotal).toHaveTextContent('0.00');

  const vanillaInput = await screen.findByRole('spinbutton', {
    name: /vanilla/i,
  });
  await user.clear(vanillaInput);
  await user.type(vanillaInput, '-1');
  expect(scoopsTotal).toHaveTextContent('0.00');

  await user.clear(vanillaInput);
  await user.type(vanillaInput, '1');
  expect(scoopsTotal).toHaveTextContent('2.00');

  const chocolateInput = screen.getByRole('spinbutton', {
    name: /chocolate/i,
  });
  await user.clear(chocolateInput);
  await user.type(chocolateInput, '12');
  expect(scoopsTotal).toHaveTextContent('2.00');

  await user.clear(vanillaInput);
  await user.type(vanillaInput, '2.5');
  expect(scoopsTotal).toHaveTextContent('0.00');
});
