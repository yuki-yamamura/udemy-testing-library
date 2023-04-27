import { useOrderDetails } from 'contexts/OrderDetails';
import { Scoop } from 'types/Scoop';

export type Props = { scoop: Scoop };

export default function ScoopOption({ scoop }: Props) {
  const { updateItemCount } = useOrderDetails();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    updateItemCount(scoop.name, parseInt(e.target.value, 10), 'scoops');

  return (
    <div>
      <label htmlFor={`${scoop.name}-count`}>{scoop.name}</label>
      <input
        id={`${scoop.name}-count`}
        type="number"
        value="0"
        onChange={handleChange}
        role="spinbutton"
      />
      <img
        src={`http://localhost:3030/${scoop.imagePath}`}
        alt={`${scoop.name} scoop`}
      />
    </div>
  );
}
