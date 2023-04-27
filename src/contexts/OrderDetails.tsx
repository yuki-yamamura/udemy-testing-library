import {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
} from 'react';
import { pricePerItem } from 'common/constants';

const optionTypes = ['scoops', 'toppings'] as const;
type OptionType = (typeof optionTypes)[number];

type ContextType = {
  optionCounts: {
    scoops: { [scoop: string]: number };
    toppings: { [topping: string]: number };
  };
  totals: { scoops: number; toppings: number };
  updateItemCount: (
    itemName: string,
    newItemCount: number,
    optionType: OptionType,
  ) => void;
  resetOrders: () => void;
};

const OrderDetail = createContext<ContextType | null>(null);

export function useOrderDetails() {
  const contextValue = useContext(OrderDetail);
  if (contextValue === null) {
    throw new Error(
      'useOrderDetails must be called from within an OrderDetailProvider.',
    );
  }

  return contextValue;
}

type Props = {
  children: React.ReactNode;
};

export function OrderDetailsProvider({ children }: Props) {
  const initialOrders = useMemo(() => ({ scoops: {}, toppings: {} }), []);
  const [optionCounts, setOptionCounts] = useState(initialOrders);

  const calculateTotal = useCallback(
    (optionType: OptionType) => {
      const totalCounts = Object.values<number>(
        optionCounts[optionType],
      ).reduce((total, value) => total + value, 0);

      return totalCounts * pricePerItem[optionType];
    },
    [optionCounts],
  );

  const totals = useMemo(
    () => ({
      scoops: calculateTotal('scoops'),
      toppings: calculateTotal('toppings'),
    }),
    [calculateTotal],
  );

  const updateItemCount = useCallback(
    (itemName: string, newItemCount: number, optionType: OptionType) => {
      const newOptionCounts = {
        scoops:
          optionType === 'scoops'
            ? {
                ...optionCounts.scoops,
                [itemName]: Number.isNaN(newItemCount) ? 0 : newItemCount,
              }
            : optionCounts.scoops,
        toppings:
          optionType === 'toppings'
            ? { ...optionCounts.toppings, [itemName]: newItemCount }
            : optionCounts.toppings,
      };

      setOptionCounts(newOptionCounts);
    },
    [optionCounts],
  );

  const resetOrders = useCallback(
    () => setOptionCounts(initialOrders),
    [initialOrders],
  );

  const value = useMemo(
    () => ({ optionCounts, totals, updateItemCount, resetOrders }),
    [optionCounts, resetOrders, totals, updateItemCount],
  );

  return <OrderDetail.Provider value={value}>{children}</OrderDetail.Provider>;
}
