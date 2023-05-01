import { useOrderDetails } from 'contexts/OrderDetails';
import { formatCurrency } from 'common/utils';
import { OrderPhase } from 'types/OrderPhase';
import Options from './Options';

type Props = { setOrderPhase: (orderPhase: OrderPhase) => void };

export default function OrderEntry({ setOrderPhase }: Props) {
  const { totals } = useOrderDetails();
  const glandTotal = Object.values(totals).reduce(
    (total, value) => total + value,
    0,
  );
  function handleClick() {
    setOrderPhase('review');
  }

  return (
    <div>
      <Options optionType="scoops" />
      <Options optionType="toppings" />
      <div>
        <h2>{`Gland total: ${formatCurrency(glandTotal)}`}</h2>
        <button type="button" onClick={handleClick}>
          Order Sundae!
        </button>
      </div>
    </div>
  );
}
