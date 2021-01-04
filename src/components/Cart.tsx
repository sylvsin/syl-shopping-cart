import React, { ChangeEvent, useContext, useState } from 'react';
import { DressContext } from '../contexts/DressContext';
import formatCurrency from '../util';
import { Fade } from "react-awesome-reveal";
import Modal from 'react-modal'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from '@fortawesome/free-solid-svg-icons';
library.add(fas);

const customStyles = {
    content : {
      top                   : "21.5rem",
      left                  : "52rem",
      right                 : "54rem",
      bottom                : "auto",
      width                 : "60%",
      height                : "50%",
      transform             : 'translate(-50%, -50%)'
    }
};


const Cart: React.FC = () => {
    const {cartItems, order, createOrderItems, removeFromCart} = useContext(DressContext);
    const [showCheckout, setShowCheckout] = useState<Boolean>(false);
    const [_id, set_id] = useState<string>();
    const [email, setEmail] = useState<string>("");
    const [name, setName] = useState<string>("");
    const [address, setAddress] = useState<string>("");
    const [createdAt, setCreatedAt] = useState<string>("");
    const [ product, setProduct ] = useState(null);
    const [modalState, setModalState] = useState(false);

    const isOpen = (product: any) => {
        setProduct(product);
    };
    
    const closeModal = ():void => {
        setProduct(product);
        setModalState(false)
    }

    const createOrder = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        createOrderItems({
            _id: _id,
            name: name,
            email: email,
            address: address,
            createdAt: createdAt,
            cartItems: cartItems,
            total: cartItems.reduce((a, c) => a + (c.price*c.count), 0),
        });  
    }

    return (
        <div>
            <div>
                {
                    cartItems.length === 0? <div className="cart cart-header">
                        <FontAwesomeIcon className="fas fa-cart-plus" icon='cart-plus'/> Cart is empty </div>
                    :
                    <div className="cart cart-header">
                        <FontAwesomeIcon className="fas fa-cart-plus" icon='cart-plus'/> You have{" "}
                        <strong>{cartItems.reduce((a, c) => a + c.count, 0)}{" "} 
                         items</strong> in Cart
                    </div>
                }
            </div> 
            
            {
                product && (
                    <Modal 
                        isOpen={modalState}
                        onRequestClose={closeModal}
                        style={customStyles}
                        contentLabel="Example Modal"
                    >
                        <button className="close-modal" onClick={closeModal}>x</button>
                        <div className="order-details">
                            <h3 className="success-message">Your order has been placed.</h3>
                            Order: <strong> {order?._id}</strong>
                            <ul>
                                <li>
                                    <div>Name:</div>
                                    <div>{order?.name}</div>
                                </li>
                                <li>
                                    <div>Email:</div>
                                    <div>{order?.email}</div>
                                </li>
                                <li>
                                    <div>Address:</div>
                                    <div>{order?.address}</div>
                                </li>
                                <li>
                                    <div>Date:</div>
                                    <div>{order?.createdAt}</div>
                                </li>
                                <li>
                                    <div>Total:</div>
                                    <div>{formatCurrency(order?.total??0)}</div>
                                </li>
                                <li>
                                    <div>Cart Items:</div>
                                    <div>{order?.cartItems.map((x, i) => {
                                        return <div key={x._id}>{x.count} {" x "} {x.title}</div>
                                    })}</div>
                                </li>
                            </ul>
                        </div>
                    </Modal>
                )
            }

            <div className="cart">
                <Fade direction="left">
                    <ul className="cart-items">
                        {
                            cartItems.map((item, i) => {
                                return(
                                    <li key={`${item._id}-${item.title}-${i}`}>
                                        <div className="img-title"> 
                                            <img src={item.image} alt={item.title}/>

                                            {item.title}<br/>

                                            {item.count} x {formatCurrency(item.price)}
                                        </div>
                                        <button
                                            onClick={() => removeFromCart(item._id)}
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
                </Fade>
            </div>
            
            {cartItems.length !== 0 && (
                <div>
                    <div className="cart">
                        <div className="total">
                            <div>
                                Total: {" "}
                                <strong>
                                    {
                                        formatCurrency(cartItems.reduce((a, c) => a + c.price * c.count, 0))
                                    }
                                </strong>
                            </div>
                            <div onClick={() => {setShowCheckout(true)}} className="button primary">Proceed</div>
                        </div>
                    </div>

                    {
                        showCheckout && (
                            <Fade direction="right">
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
                                                <button className="button primary" type="submit"
                                                    onClick={(product: any) => {isOpen(product);
                                                        setModalState(true)}}
                                                >
                                                    Checkout
                                                </button>
                                            </li>
                                        </ul>

                                    </form>
                                </div>
                            </Fade>
                    )}
                </div>
            )}
        </div>
    );
}

export default Cart;
