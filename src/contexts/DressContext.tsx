import React, { ChangeEvent, createContext, useEffect, useState } from "react";
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
  email: string;
  name: string;
  address: string;
  cartItems: Dress[];
  createOrderItems: (item: string) => void;
  setCartItems: (cartItems: any) => void;
  setProduct: (product: Dress) => void;
  addToCart: (dress: Dress) => void;
  sortDresses: (sort: any) => void;
  filterDresses: (size: any) => void;
  removeFromCart: (id: number) => void;
}

export const DressContext = createContext<IDressContext>({
  dresses: [],
  size: "",
  sort: "",
  email: "",
  name: "",
  address: "",
  cartItems: [],
  createOrderItems: (item: string) => {},
  setCartItems: (cartItems: Dress[]) => {},
  setProduct: (product: Dress) => {},
  addToCart: (dress: Dress) => {},
  sortDresses: (sort: any) => {},
  filterDresses: (size: any) => {},
  removeFromCart: (id: number) => {},
});

const myDresses = () => {
  const localData = localStorage.getItem('cartItems');
  return localData ? JSON.parse(localData) : [];
}

const DressContextPovider: React.FC = ({ children }) => {
  const [dresses, setDresses] = useState<Dress[]>(products);
  const [size, setSize] = useState<string>("");
  const [sort, setSort] = useState<string>("");
  const [cartItems, setCartItems] = useState<Dress[]>(myDresses);
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [ product, setProduct ] = useState<Dress>()

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems))
  }, [cartItems]);

  const removeFromCart = (id: number) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  }

  let createOrderItems = (item: any) => {
    const order = {
        name: name,
        email: email,
        address: address,
        cartItems: cartItems,
    };
    createOrderItems(order);   
  }

  createOrderItems = (name: string) => {
    alert("Need to save order for " + name);
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
  }

  const sortDresses = ({target: { value }, 
  }: ChangeEvent<HTMLSelectElement>) => {
    // imp
    if (value === "") {
      setSort(value);
    } else {
      setSort(value);
      setDresses(
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
      setDresses(
        products.filter((dress) =>
          value === "ALL" ? true : dress.availableSizes.indexOf(value) >= 0
        )
      );
    }
  };

  return (
    <div>
      <DressContext.Provider
        value={{ dresses, size, sort, email, name, address, setProduct, cartItems, removeFromCart, createOrderItems, addToCart, setCartItems, sortDresses, filterDresses }}
      >
        {children}
      </DressContext.Provider>
    </div>
  );
};

export default DressContextPovider;
