import { Topping } from 'types/Topping';

type Props = { topping: Topping };

function ToppingOption({ topping }: Props) {
  return (
    <img
      src={`http://localhost:3030/${topping.imagePath}`}
      alt={`${topping.name} topping`}
    />
  );
}

export default ToppingOption;
