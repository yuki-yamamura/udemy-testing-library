import OrderEntry from 'pages/entry/OrderEntry';
import { OrderDetailsProvider } from 'contexts/OrderDetails';

export default function App() {
  return (
    <OrderDetailsProvider>
      <OrderEntry />;
    </OrderDetailsProvider>
  );
}
