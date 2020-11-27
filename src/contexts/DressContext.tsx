/* */
import React, { createContext, useState } from 'react';
import { products } from '../data';

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
}

export const DressContext = createContext<IDressContext>({
    dresses: [],
}); 

const DressContextPovider: React.FC = ({children}) => {
    const [dresses, setDress] = useState(products);

    return (
        <div>
            <DressContext.Provider value={{ dresses }}>
                {children}
            </DressContext.Provider>
        </div>
    );
}

export default DressContextPovider;
