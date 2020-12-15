import React, { useContext } from 'react';
import { DressContext } from '../contexts/DressContext';
import formatCurrency from '../util';

const Cart: React.FC = () => {
    const {cartItems, removeFromCart} = useContext(DressContext);

    // const totalPrice = formatCurrency(cartItems.reduce((acc, curr) => acc + curr.price, 0 ));

    return (
        <div>
            <div>
                {
                    cartItems.length === 0? <div className="cart cart-header">Cart is empty</div>
                    :
                    <div className="cart cart-header">You have{" "}
                     {cartItems.reduce((a, c) => a + c.count, 0)}{" "} 
                     items in Cart
                    </div>
                }
            </div>
            
            <div className="cart">
                <ul className="cart-items">
                    {
                        cartItems.map((item, Index) => {
                            return(
                                <li key={Index}>
                                   <div className="img-title"> 
                                        <img src={item.image} alt={item.title}/>

                                        {item.title}<br/>

                                        {item.count} x {formatCurrency(item.price)}
                                    </div>
                                    <button
                                        onClick={() => removeFromCart(item.id)}
                                        className="remove-button"
                                    >
                                        Remove
                                    </button>
                                    <hr/>
                                </li>
                            )
                        })
                        
                    }
                </ul>
            </div>
            
            {cartItems.length !== 0 && (
                <div className="cart">
                    <div className="total">
                        <div>
                            Total: {" "}
                            {
                                formatCurrency(cartItems.reduce((a, c) => a + c.price * c.count, 0))
                            }
                        </div>
                        <div className="button primary">Proceed</div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Cart;
