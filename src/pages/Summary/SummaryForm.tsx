import { ChangeEvent, useState } from 'react';

export default function SummaryForm() {
  const [isChecked, setIsChecked] = useState(false);
  const handleChange = (e: ChangeEvent<HTMLInputElement>) =>
    setIsChecked(e.target.checked);

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
          className="inline text-blue-400 hover:after:ml-4 hover:after:text-black hover:after:content-['No_ice_cream_will_actually_delivered']"
        >
          Terms and Conditions
        </label>
      </div>
      <button type="button" disabled={!isChecked}>
        Confirm order
      </button>
    </>
  );
}
