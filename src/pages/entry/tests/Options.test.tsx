import { render, screen } from 'test-utils/testing-library-utils';
import { OrderDetailsProvider } from 'contexts/OrderDetails';
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
