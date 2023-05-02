import { useState } from 'react';
import { OrderPhase } from 'types/OrderPhase';

type Props = { setOrderPhase: (orderPhase: OrderPhase) => void };

export default function SummaryForm({ setOrderPhase }: Props) {
  const [isChecked, setIsChecked] = useState(false);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(e.target.checked);
  };
  const handleClick = () => setOrderPhase('completed');

  return (
    <>
      <div>
        <input
          id="terms-and-conditions"
          type="checkbox"
          checked={isChecked}
          onChange={handleChange}
        />
        I agree{' '}
        <label
          htmlFor="terms-and-conditions"
          className="ml-2 inline  text-blue-600 hover:after:ml-4 hover:after:text-black hover:after:content-['No_ice_cream_will_actually_delivered']"
        >
          Terms and Conditions
        </label>
      </div>
      <button
        type="button"
        disabled={!isChecked}
        onClick={handleClick}
        className="btn"
      >
        Confirm order
      </button>
    </>
  );
}
