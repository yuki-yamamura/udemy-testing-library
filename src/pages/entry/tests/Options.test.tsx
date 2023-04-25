import { render, screen } from '@testing-library/react';
import Options from '../Options';

test('displays image for each scoop option from server', async () => {
  render(<Options optionType="scoops" />);

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
