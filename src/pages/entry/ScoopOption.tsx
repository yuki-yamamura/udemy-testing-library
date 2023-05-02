import { useOrderDetails } from 'contexts/OrderDetails';
import { Scoop } from 'types/Scoop';
import { useState } from 'react';

export type Props = { scoop: Scoop };

export default function ScoopOption({ scoop }: Props) {
  const [inputValue, setInputValue] = useState('0');
  const { updateItemCount } = useOrderDetails();

  const isValid = (value: string) =>
    Number.parseInt(value, 10) >= 0 &&
    Number.parseInt(value, 10) <= 10 &&
    Number.isInteger(Number.parseFloat(value));

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    updateItemCount(
      scoop.name,
      parseInt(isValid(value) ? value : '0', 10),
      'scoops',
    );
    setInputValue(value);
  };

  return (
    <div>
      <label htmlFor={`${scoop.name}-count`}>{scoop.name}</label>
      <input
        id={`${scoop.name}-count`}
        type="number"
        value={inputValue}
        onChange={handleChange}
        role="spinbutton"
        className={`${!isValid(inputValue) ? 'is-invalid' : ''}`}
      />
      <img
        src={`http://localhost:3030/${scoop.imagePath}`}
        alt={`${scoop.name} scoop`}
      />
    </div>
  );
}
