import OrderEntry from 'pages/entry/OrderEntry';
import OrderSummary from 'pages/summary/OrderSummary';
import OrderConfirmation from 'pages/confirmation/OrderConfirmation';
import { OrderDetailsProvider } from 'contexts/OrderDetails';
import { useState } from 'react';
import { OrderPhase } from 'types/OrderPhase';

export default function App() {
  const [orderPhase, setOrderPhase] = useState<OrderPhase>('inProgress');

  return (
    <OrderDetailsProvider>
      {orderPhase === 'inProgress' && (
        <OrderEntry setOrderPhase={setOrderPhase} />
      )}
      {orderPhase === 'review' && (
        <OrderSummary setOrderPhase={setOrderPhase} />
      )}
      {orderPhase === 'completed' && (
        <OrderConfirmation setOrderPhase={setOrderPhase} />
      )}
    </OrderDetailsProvider>
  );
}
