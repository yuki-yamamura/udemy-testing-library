import { useState } from 'react';
import Button from './Button';
import CheckBox from './CheckBox';

export default function ColorButton() {
  const [disabled, setDisabled] = useState(false);
  const clickHandler = (e: React.ChangeEvent<HTMLInputElement>) =>
    setDisabled(e.target.checked);

  return (
    <>
      <Button disabled={disabled} />
      <CheckBox clickHandler={clickHandler} />
    </>
  );
}
