/* */
import React from 'react';
import { Dress } from '../contexts/DressContext';
import formatCurrency from '../util';

const DressItem: React.FC<{dress: Dress}> = ({dress}) => {
  return (
    <div className="product">
        <a href={'#' + dress.id}>
            <img src={dress.image} alt={dress.title} />
            <p>
                { dress.title }
            </p>
        </a>
        
        <div className="product-price">
            <div>
                { formatCurrency(dress.price) }
            </div>
            
            <button className="button primary">Add To Cart</button>
        </div>
    </div>
  );
}

export default DressItem;
