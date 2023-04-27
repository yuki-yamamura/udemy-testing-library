export function replaceCameLWithSpaces(color: string): string {
  return color.replace(/\B([A-Z])\B/g, ' $1');
}

export function formatCurrency(currency: number) {
  return new Intl.NumberFormat('en-us', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(currency);
}
