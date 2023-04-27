import { useOrderDetails } from 'contexts/OrderDetails';
import { formatCurrency } from 'common/utils';
import SummaryForm from './SummaryForm';

export default function OrderSummary() {
  const { totals, optionCounts } = useOrderDetails();

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
        <h2>Toppings: {formatCurrency(totals.toppings)}</h2>
        <ul>{toppingList}</ul>
      </div>
      <div>Total: {formatCurrency(total)}</div>
      <SummaryForm />
    </>
  );
}
