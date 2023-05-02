import { useEffect, useState } from 'react';
import { useOrderDetails } from 'contexts/OrderDetails';
import axios from 'axios';
import Loading from 'common/Loading';
import { OrderPhase } from 'types/OrderPhase';
import AlertBanner from 'common/AlertBanner';

type Props = { setOrderPhase: (orderPhase: OrderPhase) => void };

export default function OrderConfirmation({ setOrderPhase }: Props) {
  const [orderNumber, setOrderNumber] = useState<number | null>(null);
  const [error, setError] = useState(false);
  const { resetOrders } = useOrderDetails();
  function handleClick() {
    setOrderPhase('inProgress');
    resetOrders();
  }
  useEffect(() => {
    const controller = new AbortController();
    axios
      .post('http://localhost:3030/order', {
        signal: controller.signal,
      })
      .then((res) =>
        setOrderNumber((res.data as { orderNumber: number }).orderNumber),
      )
      .catch((err: Error) => {
        if (err.name !== 'CanceledError') {
          setError(true);
        }
      });
  }, []);

  if (error) return <AlertBanner />;

  return (
    <div>
      {orderNumber === null ? (
        <Loading />
      ) : (
        <>
          <h1>Thank you!</h1>
          <p>Your order number is {orderNumber}</p>
          <p>as per our terms and conditions, nothing will happen now</p>
          <button type="button" onClick={handleClick}>
            Create new order
          </button>
        </>
      )}
    </div>
  );
}
