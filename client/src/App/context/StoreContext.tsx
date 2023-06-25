import { PropsWithChildren, createContext, useContext, useState } from "react";
import { Basket } from "../models/basket";

// creates an interface
interface StoreContextValue {
  basket: Basket | null;
  setBasket: (basket: Basket) => void;
  removeItem: (productId: number, quantity: number) => void;
}

// create the context, with type StoreContextValue or undefined.
export const StoreContext = createContext<StoreContextValue | undefined>(
  undefined
);

// custom hook used to be able to use StoreContext
export const useStoreContext = () => {
  const context = useContext(StoreContext);

  if (context === undefined) {
    throw Error("Oops - we do not seem to be inside the provider");
  }

  return context;
};

// create the StoreProvider
export const StoreProvider = ({ children }: PropsWithChildren<any>) => {
  const [basket, setBasket] = useState<Basket | null>(null);

  const removeItem = (productId: number, quantity: number) => {
    if (!basket) return;

    const items = [...basket.items];
    const itemIndex = items.findIndex((i) => i.productId === productId);

    if (itemIndex < 0) {
      return;
    }

    items[itemIndex].quantity -= quantity;
    if (items[itemIndex].quantity === 0) items.splice(itemIndex, 1);

    setBasket((prevState) => {
      return { ...prevState!, items };
    });
  };

  return (
    <StoreContext.Provider value={{ basket, setBasket, removeItem }}>
      {children}
    </StoreContext.Provider>
  );
};
