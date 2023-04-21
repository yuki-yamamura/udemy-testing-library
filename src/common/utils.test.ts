import { replaceCameLWithSpaces } from './utils';

describe('spaces before camel-case capital letters', () => {
  test('works for no inner capital letters', () => {
    expect(replaceCameLWithSpaces('Red')).toBe('Red');
  });
  test('works for one inner capital letter', () => {
    expect(replaceCameLWithSpaces('MidnightBlue')).toBe('Midnight Blue');
  });
  test('works for multiple inner capital letters', () => {
    expect(replaceCameLWithSpaces('MediumVioletRed')).toBe('Medium Violet Red');
  });
});
