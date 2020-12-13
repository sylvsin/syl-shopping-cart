import React, { useContext } from 'react';
import DressItem from './DressItem';
import { DressContext } from '../contexts/DressContext';


const DressList: React.FC = () => {
    const { dresses } = useContext(DressContext);

    return (
        <div>
            <ul className="products">
                {
                    dresses.map((dress) => {
                        return(
                            <DressItem dress={dress} key={dress.id} />
                        )
                    })
                }
            </ul>
            
        </div>
    );
}

export default DressList;
