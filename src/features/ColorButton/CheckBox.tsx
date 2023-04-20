import { ChangeEvent } from 'react';

type Props = {
  clickHandler: (e: ChangeEvent<HTMLInputElement>) => void;
};

export default function CheckBox({ clickHandler }: Props) {
  const id = 'disable-button-checkbox';

  return (
    <label htmlFor={id}>
      Disable button
      <input id={id} type="checkbox" onChange={clickHandler} />
    </label>
  );
}
