import axios from 'axios';
import { useEffect, useState } from 'react';
import ScoopOption, { Scoop } from './ScoopOption';

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
  const ItemComponent = optionType === 'scoops' ? ScoopOption : null;

  return (
    <>
      {items.map((item) => {
        const { name, imagePath } = item;

        // TODO: remove ternary expression
        return ItemComponent === null ? null : (
          <ItemComponent name={name} imagePath={imagePath} key={name} />
        );
      })}
    </>
  );
}
