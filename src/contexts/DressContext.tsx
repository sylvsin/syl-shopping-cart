import React, { ChangeEvent, createContext, useCallback, useContext, useEffect, useState } from "react";
import { AppContext } from "./AppContext";
// import { products } from "../data";
// import { count } from "console";

export class Dress {
  _id!: number;
  image!: string;
  title!: string;
  description!: string;
  availableSizes!: string[];
  price!: number;
  count!: number;
}

export interface IDressContext {
  products: Dress[];
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
  products: [],
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
  const [products, setProducts] = useState<Dress[]>([]);
  const [size, setSize] = useState<string>("");
  const [sort, setSort] = useState<string>("");
  const [cartItems, setCartItems] = useState<Dress[]>(myDresses);
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [ product, setProduct ] = useState<Dress>()
  const { api } = useContext(AppContext);

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems))
  }, [cartItems]);

  const removeFromCart = (id: number) => {
    setCartItems(cartItems.filter(item => item._id !== id));
  }

  const fetchProduct = useCallback(() => {
    if (api) {
      api
        .get("products")
        .then((response) => {
          return response.data;
        })
        .then((data) => {
          setProducts(data);
          console.log(data);
        });
    }
  }, [api] );

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

    const doesExist = cartItems.find(item => item._id === product._id);

    if(!doesExist) {
      setCartItems([...cartItems, ...[{...product, count:1}]]);
    } else {
      const pos = cartItems.findIndex(item => item._id === product._id)
      if(pos!==-1)
      setCartItems([...cartItems.slice(0, pos), ...[{...cartItems[pos], count:cartItems[pos].count+1}], ...cartItems.slice(pos+1)]);
    }
  }

  const sortDresses = ({target: { value }, 
  }: ChangeEvent<HTMLSelectElement>) => {
    // imp
    if (value === "") {
      setSort(value);
    } else {
      setSort(value);
      setProducts(
        products.slice().sort((a, b) => (
          value === "lowest"
          ? a.price > b.price
            ? 1
            : -1
          : value === "highest"
          ? a.price < b.price
            ? 1
            : -1
          : a._id < b._id
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
      if(api){
        api
        .get("products")
        .then((response) => {
          return response.data;
        })
        .then((data) => {
          setProducts(data);
          console.log(data);
        });
        api.get('products').then(result=>result.data).then((products:Dress[])=>{
          setProducts(
            products.filter((dress) =>
              value === "ALL" ? true : dress.availableSizes.indexOf(value) >= 0
            )
          );

        })
      }
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [fetchProduct]);

  return (
    <div>
      <DressContext.Provider
        value={{ products, size, sort, email, name, address, setProduct, cartItems, removeFromCart, createOrderItems, addToCart, setCartItems, sortDresses, filterDresses }}
      >
        {children}
      </DressContext.Provider>
    </div>
  );
};

export default DressContextPovider;
