import React, { useContext } from 'react';
import { Dress, DressContext } from '../contexts/DressContext';
import formatCurrency from '../util';

const DressItem: React.FC<{dress: Dress}> = ({dress}) => {
    const {cartItems, setCartItems} = useContext(DressContext);

    const myDress = {
         id: dress.id, image: dress.image,
         price: dress.price, count: dress.count,
         title: dress.title, avaibleSize: dress.availableSizes,
         description: dress.description, 
    };

    const addToCart = (product: Dress) => {
        let alreadyInCart = false;
        cartItems.forEach(item => {
            if(item.id === product.id) {
                item.count++;
                alreadyInCart = true;
                setCartItems([...cartItems]);
            }
        });
        if(!alreadyInCart) {
            setCartItems([...cartItems, myDress]);
        }
    }

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
                
                <button onClick={() => addToCart(dress)} className="button primary">Add To Cart</button>
            </div>
        </div>
    );
}

export default DressItem;
