import React, { useContext } from 'react';
import DressItem from './DressItem';
import { DressContext } from '../contexts/DressContext';
import { Fade } from "react-awesome-reveal";


const DressList: React.FC = () => {
    const { products } = useContext(DressContext);

    return ( 
        <div>
            <Fade direction="down">
                <ul className="products">
                    {
                        products.map((dress, i) => {
                            return(
                                <DressItem dress={dress} key={`${dress._id}-${dress.title}-${i}`} />
                            )
                        })
                    }
                </ul>
            </Fade>
        </div>
    );
}

export default DressList;
