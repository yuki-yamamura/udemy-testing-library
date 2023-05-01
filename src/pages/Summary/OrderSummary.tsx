import { useOrderDetails } from 'contexts/OrderDetails';
import { formatCurrency } from 'common/utils';
import { OrderPhase } from 'types/OrderPhase';
import SummaryForm from './SummaryForm';

type Props = { setOrderPhase: (orderPhase: OrderPhase) => void };

export default function OrderSummary({ setOrderPhase }: Props) {
  const { totals, optionCounts } = useOrderDetails();
  const hasToppings = totals.toppings === 0;

  const scoopList = Object.entries(optionCounts.scoops).map(([key, value]) => (
    <li key={key}>{`${value} ${key}`}</li>
  ));
  const toppingList = Object.keys(optionCounts.toppings).map((key) => (
    <li key={key}>{key}</li>
  ));
  const total = Object.values(totals).reduce((sum, value) => sum + value, 0);

  return (
    <>
      <h1>Order Summary</h1>
      <div>
        <h2>Scoops: {formatCurrency(totals.scoops)}</h2>
        <ul>{scoopList}</ul>
      </div>
      <div>
        {!hasToppings && (
          <>
            <h2>Toppings: {formatCurrency(totals.toppings)}</h2>
            <ul>{toppingList}</ul>
          </>
        )}
      </div>
      <div>Total: {formatCurrency(total)}</div>
      <SummaryForm setOrderPhase={setOrderPhase} />
    </>
  );
}
