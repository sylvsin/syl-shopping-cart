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
                        products.map((dress) => {
                            return(
                                <DressItem dress={dress} key={dress._id} />
                            )
                        })
                    }
                </ul>
            </Fade>
        </div>
    );
}

export default DressList;
