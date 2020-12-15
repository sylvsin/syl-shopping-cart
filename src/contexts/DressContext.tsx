import React, { ChangeEvent, createContext, useState } from "react";
import { products } from "../data";

export class Dress {
  id!: number;
  image!: string;
  title!: string;
  description!: string;
  availableSizes!: string[];
  price!: number;
  count!: number;
}

export interface IDressContext {
  dresses: Dress[];
  size: string;
  sort: string;
  cartItems: Dress[];
  setCartItems: (cartItems: any) => void;
  addToCart: (dress: Dress) => void;
  sortDresses: (sort: any) => void;
  filterDresses: (size: any) => void;
  removeFromCart: (id: number) => void;
}

export const DressContext = createContext<IDressContext>({
  dresses: [],
  size: "",
  sort: "",
  cartItems: [],
  setCartItems: (cartItems: Dress[]) => {},
  addToCart: (dress: Dress) => {},
  sortDresses: (sort: any) => {},
  filterDresses: (size: any) => {},
  removeFromCart: (id: number) => {},
});

const DressContextPovider: React.FC = ({ children }) => {
  const [dresses, setDress] = useState<Dress[]>(products);
  const [size, setSize] = useState<string>("");
  const [sort, setSort] = useState<string>("");
  const [cartItems, setCartItems] = useState<Dress[]>([]);

  const removeFromCart = (id: number) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  }

  const addToCart = (product: Dress) => {
    let alreadyInCart = false;
    cartItems.forEach(item => {
      if(item.id === product.id) {
        item.count++;
        alreadyInCart = true;
      }
    });
    if(!alreadyInCart) {
      cartItems.push({...product, count: 1})
    }
    setCartItems(cartItems);
    console.log(cartItems);
  }

  const sortDresses = ({target: { value }, 
  }: ChangeEvent<HTMLSelectElement>) => {
    // imp
    if (value === "") {
      setSort(value);
    } else {
      setSort(value);
      setDress(
        products.slice().sort((a, b) => (
          value === "lowest"
          ? a.price > b.price
            ? 1
            : -1
          : value === "highest"
          ? a.price < b.price
            ? 1
            : -1
          : a.id < b.id
            ? 1
            : -1
        ))
      );
    }
  };

  const filterDresses = ({
    target: { value },
  }: ChangeEvent<HTMLSelectElement>) => {
    // imp
    if (value === "") {
      setSize(value);
    } else {
      setSize(value);
      setDress(
        products.filter((dress) =>
          value === "ALL" ? true : dress.availableSizes.indexOf(value) >= 0
        )
      );
    }
  };

  return (
    <div>
      <DressContext.Provider
        value={{ dresses, size, sort, cartItems, addToCart, removeFromCart, setCartItems, sortDresses, filterDresses }}
      >
        {children}
      </DressContext.Provider>
    </div>
  );
};

export default DressContextPovider;
