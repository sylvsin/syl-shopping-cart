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

interface Order{
  name:string
  email:string
  address:string
  cartItems:Dress[]
  total:number
  _id:string
  createdAt:string
  updatedAt:string
}
export interface IDressContext {
  products: Dress[];
  size: string;
  sort: string;
  cartItems: Dress[];
  order?: Order
  createOrderItems: (item: any) => void;
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
  cartItems: [],
  createOrderItems: (item: any) => {},
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
  const [ product, setProduct ] = useState<Dress>()
  const { api } = useContext(AppContext);
  const [order, setOrder] = useState<Order>()

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
        _id: item._id,
        name: item.name,
        email: item.email,
        address: item.address,
        cartItems: cartItems,
        total: cartItems.reduce((a,b) => a + b.price*b.count, 0),
    };
    createOrderItems2(order);   
  }

  const createOrderItems2 = (order:any) => {
    // alert("Need to save order for " + name);
    console.log("Sending data", order)
    if(api) {
      api
      .post("orders", order,{
        headers: {
            "Content-Type": "application/json"
        },
      })
    
      .then(res=>res)
      .then(data=>{
        console.log(data.data)
        setOrder(data.data)
        localStorage.clear();
      })}
  };

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
        value={{ order,products, size, sort, setProduct, cartItems, removeFromCart, createOrderItems, addToCart, setCartItems, sortDresses, filterDresses }}
      >
        {children}
      </DressContext.Provider>
    </div>
  );
};

export default DressContextPovider;
