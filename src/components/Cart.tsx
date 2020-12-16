import React, { ChangeEvent, useContext, useState } from 'react';
import { DressContext } from '../contexts/DressContext';
import formatCurrency from '../util';

const Cart: React.FC = () => {
    const {cartItems, createOrderItems, removeFromCart} = useContext(DressContext);
    const [showCheckout, setShowCheckout] = useState<Boolean>(false);
    const [email, setEmail] = useState<string>("");
    const [name, setName] = useState<string>("");
    const [address, setAddress] = useState<string>("");

    const createOrder = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        createOrderItems(e);  
    }

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
                <div>
                    <div className="cart">
                        <div className="total">
                            <div>
                                Total: {" "}
                                {
                                    formatCurrency(cartItems.reduce((a, c) => a + c.price * c.count, 0))
                                }
                            </div>
                            <div onClick={() => {setShowCheckout(true)}} className="button primary">Proceed</div>
                        </div>
                    </div>

                    {
                        showCheckout && (
                            <div className="cart">
                                <form onSubmit={createOrder}>
                                    <ul className="form-container">
                                        <li>
                                            <label>Email</label>
                                            <input
                                                name="email" 
                                                type="email" 
                                                required
                                                value={email} onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                                            ></input>
                                        </li>
                                        <li>
                                            <label>Name</label>
                                            <input 
                                                name="name"
                                                type="text" 
                                                required
                                                value={name} onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                                            ></input>
                                        </li>
                                        <li>
                                            <label>Address</label>
                                            <input 
                                                name="address"
                                                type="text" 
                                                required
                                                value={address} onChange={(e: ChangeEvent<HTMLInputElement>) => setAddress(e.target.value)}
                                            ></input>
                                        </li>
                                        <li>
                                            <button className="button primary" type="submit">
                                                Checkout
                                            </button>
                                        </li>
                                    </ul>

                                </form>
                            </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default Cart;
