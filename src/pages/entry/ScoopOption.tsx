import { useOrderDetails } from 'contexts/OrderDetails';
import { Scoop } from 'types/Scoop';
import { useState } from 'react';

export type Props = { scoop: Scoop };

export default function ScoopOption({ scoop }: Props) {
  const initialValue = '0';
  const [inputValue, setInputValue] = useState(initialValue);
  const { updateItemCount } = useOrderDetails();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateItemCount(scoop.name, parseInt(e.target.value, 10), 'scoops');
    setInputValue(e.target.value);
  };
  const isValid =
    inputValue === initialValue ||
    (Number.parseInt(inputValue, 10) >= 1 &&
      Number.parseInt(inputValue, 10) <= 10 &&
      Number.isInteger(Number.parseFloat(inputValue)));

  return (
    <div>
      <label htmlFor={`${scoop.name}-count`}>{scoop.name}</label>
      <input
        id={`${scoop.name}-count`}
        type="number"
        value={inputValue}
        onChange={handleChange}
        role="spinbutton"
        className={`${!isValid ? 'is-invalid' : ''}`}
      />
      <img
        src={`http://localhost:3030/${scoop.imagePath}`}
        alt={`${scoop.name} scoop`}
      />
    </div>
  );
}
