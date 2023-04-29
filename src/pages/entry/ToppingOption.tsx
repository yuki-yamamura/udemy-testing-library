import { Topping } from 'types/Topping';
import { useOrderDetails } from 'contexts/OrderDetails';

type Props = { topping: Topping };

function ToppingOption({ topping }: Props) {
  const { updateItemCount } = useOrderDetails();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const toppingCount = e.target.checked ? 1 : 0;
    updateItemCount(topping.name, toppingCount, 'toppings');
  };

  return (
    <div>
      <label htmlFor={topping.name}>{topping.name}</label>
      <input id={topping.name} type="checkbox" onChange={handleChange} />
      <img
        src={`http://localhost:3030/${topping.imagePath}`}
        alt={`${topping.name} topping`}
      />
    </div>
  );
}

export default ToppingOption;
