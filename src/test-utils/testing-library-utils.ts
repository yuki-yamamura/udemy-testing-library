import { RenderOptions, render } from '@testing-library/react';
import { OrderDetailsProvider } from 'contexts/OrderDetails';

const renderWithContext = (ui: React.ReactElement, options?: RenderOptions) =>
  render(ui, { wrapper: OrderDetailsProvider, ...options });

export * from '@testing-library/react';
export { renderWithContext as render };
