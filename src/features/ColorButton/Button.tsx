import { useState } from 'react';
import styles from './Button.module.css';

type Props = { disabled: boolean };

export default function Button({ disabled }: Props) {
  const [color, setColor] = useState<'red' | 'blue'>('red');
  const nextColor = color === 'red' ? 'blue' : 'red';

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={() => setColor(nextColor)}
      style={{ color: 'white', backgroundColor: color }}
      className={styles.btn}
    >
      Change to {nextColor}
    </button>
  );
}
