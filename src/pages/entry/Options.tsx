import axios from 'axios';
import { useEffect, useState } from 'react';
import AlertBanner from 'common/AlertBanner';
import { pricePerItem } from 'common/constants';
import { formatCurrency } from 'common/utils';
import { useOrderDetails } from 'contexts/OrderDetails';
import { Scoop } from 'types/Scoop';
import ScoopOption from './ScoopOption';
import ToppingOption from './ToppingOption';

type Props = { optionType: 'scoops' | 'toppings' };

export default function Options({ optionType }: Props) {
  const { totals } = useOrderDetails();
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

  const title = optionType[0].toUpperCase() + optionType.slice(1).toLowerCase();

  return (
    <>
      {error && <AlertBanner />}
      <h2>{title}</h2>
      <p>{formatCurrency(pricePerItem[optionType])} each</p>
      <p>{`${title} total: ${formatCurrency(totals[optionType])}`}</p>
      <ul>
        {items.map((item) =>
          optionType === 'scoops' ? (
            <ScoopOption scoop={item} key={item.name} />
          ) : (
            <ToppingOption topping={item} key={item.name} />
          ),
        )}
      </ul>
    </>
  );
}
