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
      <img
        src={`http://localhost:3030/${scoop.imagePath}`}
        alt={`${scoop.name} scoop`}
        className="mb-4 h-60 w-60"
      />
      <div className="flex justify-center gap-x-4">
        <label htmlFor={`${scoop.name}-count`} className="">
          {scoop.name}
        </label>
        <input
          id={`${scoop.name}-count`}
          type="number"
          value={inputValue}
          onChange={handleChange}
          role="spinbutton"
          className={`w-20 rounded text-black ${
            !isValid(inputValue) ? 'is-invalid' : ''
          }`}
        />
      </div>
    </div>
  );
}
