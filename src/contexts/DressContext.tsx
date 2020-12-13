import React, { ChangeEvent, createContext, useState } from "react";
import { products } from "../data";

export class Dress {
  id!: number;
  image!: string;
  title!: string;
  description!: string;
  availableSizes!: string[];
  price!: number;
}

export interface IDressContext {
  dresses: Dress[];
  size: string;
  sort: string;
  sortDresses: (sort: any) => void;
  filterDresses: (size: any) => void;
}

export const DressContext = createContext<IDressContext>({
  dresses: [],
  size: "",
  sort: "",
  sortDresses: (sort: any) => {},
  filterDresses: (size: any) => {},
});

const DressContextPovider: React.FC = ({ children }) => {
  const [dresses, setDress] = useState<Dress[]>(products);
  const [size, setSize] = useState<string>("");
  const [sort, setSort] = useState<string>("");

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
        value={{ dresses, size, sort, sortDresses, filterDresses }}
      >
        {children}
      </DressContext.Provider>
    </div>
  );
};

export default DressContextPovider;
