import { useState } from 'react';
import { replaceCameLWithSpaces } from 'common/utils';
import styles from './Button.module.css';

type Props = { disabled: boolean };

export default function Button({ disabled }: Props) {
  const [color, setColor] = useState<'MediumVioletRed' | 'MidnightBlue'>(
    'MediumVioletRed',
  );
  const nextColor =
    color === 'MediumVioletRed' ? 'MidnightBlue' : 'MediumVioletRed';

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={() => setColor(nextColor)}
      style={{ color: 'white', backgroundColor: disabled ? 'gray' : color }}
      className={styles.btn}
    >
      Change to {replaceCameLWithSpaces(nextColor)}
    </button>
  );
}
