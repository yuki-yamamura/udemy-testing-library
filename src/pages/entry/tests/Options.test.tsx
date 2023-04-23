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
