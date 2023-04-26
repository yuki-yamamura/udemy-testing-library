import axios from 'axios';
import { useEffect, useState } from 'react';
import AlertBanner from 'common/AlertBanner';
import ScoopOption, { Scoop } from './ScoopOption';
import ToppingOption from './ToppingOption';

type Props = { optionType: 'scoops' | 'toppings' };

export default function Options({ optionType }: Props) {
  const [items, setItems] = useState<Scoop[]>([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    axios
      .get(`http://localhost:3030/${optionType}`)
      .then((res) => setItems(res.data as Scoop[]))
      .catch((_) => {
        setError(true);
      });
  }, [optionType]);

  const ItemComponent = optionType === 'scoops' ? ScoopOption : ToppingOption;

  return (
    <>
      {error && <AlertBanner />}
      {items.map((item) => (
        <ItemComponent
          name={item.name}
          imagePath={item.imagePath}
          key={item.name}
        />
      ))}
    </>
  );
}
