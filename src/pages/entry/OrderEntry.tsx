import { useOrderDetails } from 'contexts/OrderDetails';
import { formatCurrency } from 'common/utils';
import { OrderPhase } from 'types/OrderPhase';
import Options from './Options';

type Props = { setOrderPhase: (orderPhase: OrderPhase) => void };

export default function OrderEntry({ setOrderPhase }: Props) {
  const { totals, optionCounts } = useOrderDetails();
  const glandTotal = Object.values(totals).reduce(
    (total, value) => total + value,
    0,
  );
  const hasScoop = Object.values(optionCounts.scoops).some(
    (scoopCount) => scoopCount > 0,
  );
  function handleClick() {
    setOrderPhase('review');
  }

  return (
    <div>
      <h1>Order Your Sundae!</h1>
      <Options optionType="scoops" />
      <Options optionType="toppings" />
      <div>
        <h2 className="mb-4 text-2xl">{`Gland total: ${formatCurrency(
          glandTotal,
        )}`}</h2>
        <button
          type="button"
          onClick={handleClick}
          disabled={!hasScoop}
          className="btn"
        >
          Order Sundae!
        </button>
      </div>
    </div>
  );
}
