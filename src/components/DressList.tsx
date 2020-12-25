import React, { useContext } from 'react';
import DressItem from './DressItem';
import { DressContext } from '../contexts/DressContext';
import { Fade } from "react-awesome-reveal";


const DressList: React.FC = () => {
    const { dresses } = useContext(DressContext);

    return ( 
        <div>
            <Fade direction="down">
                <ul className="products">
                    {
                        dresses.map((dress) => {
                            return(
                                <DressItem dress={dress} key={dress.id} />
                            )
                        })
                    }
                </ul>
            </Fade>
        </div>
    );
}

export default DressList;
