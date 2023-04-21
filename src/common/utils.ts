// eslint-disable-next-line import/prefer-default-export
export function replaceCameLWithSpaces(color: string): string {
  return color.replace(/\B([A-Z])\B/g, ' $1');
}
