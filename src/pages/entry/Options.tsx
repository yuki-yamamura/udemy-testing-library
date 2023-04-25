import axios from 'axios';
import { useEffect, useState } from 'react';
import ScoopOption, { Scoop } from './ScoopOption';
import ToppingOption from './ToppingOption';

type Props = { optionType: 'scoops' | 'toppings' };

export default function Options({ optionType }: Props) {
  const [items, setItems] = useState<Scoop[]>([]);

  useEffect(() => {
    axios
      .get(`http://localhost:3030/${optionType}`)
      .then((res) => setItems(res.data as Scoop[]))
      .catch((error) => {
        // TODO: handle error
        console.log(error);
      });
  }, [optionType]);

  // TODO: replace null to ToppingOption
  const ItemComponent = optionType === 'scoops' ? ScoopOption : ToppingOption;

  return (
    <>
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
