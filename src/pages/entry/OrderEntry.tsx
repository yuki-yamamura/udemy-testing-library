import { useOrderDetails } from 'contexts/OrderDetails';
import { formatCurrency } from 'common/utils';
import Options from './Options';

export default function OrderEntry() {
  const { totals } = useOrderDetails();
  const glandTotal = Object.values(totals).reduce(
    (total, value) => total + value,
    0,
  );

  return (
    <div>
      <Options optionType="scoops" />
      <Options optionType="toppings" />
      <div>
        <h2>{`Gland total: ${formatCurrency(glandTotal)}`}</h2>
        <button type="button">Order Sundae!</button>
      </div>
    </div>
  );
}
