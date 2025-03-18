{/* import React, { useContext } from 'react';
import { BsCartX } from 'react-icons/bs';
import { calculateTotal, displayMoney } from '../helpers/utils';
import useDocTitle from '../hooks/useDocTitle';
import cartContext from '../contexts/cart/cartContext';
import CartItem from '../components/cart/CartItem';
import EmptyView from '../components/common/EmptyView';


const Cart = () => {

    useDocTitle('Carrito');

    const { cartItems } = useContext(cartContext);

    const cartQuantity = cartItems.length;

    // precio original total
    const cartTotal = cartItems.map(item => {
        return item.originalPrice * item.quantity;
    });

    const calculateCartTotal = calculateTotal(cartTotal);
    const displayCartTotal = displayMoney(calculateCartTotal);


    // descuento total
    const cartDiscount = cartItems.map(item => {
        return (item.originalPrice - item.finalPrice) * item.quantity;
    });

    const calculateCartDiscount = calculateTotal(cartDiscount);
    const displayCartDiscount = displayMoney(calculateCartDiscount);


    // importe total final
    const totalAmount = calculateCartTotal - calculateCartDiscount;
    const displayTotalAmount = displayMoney(totalAmount);


    return (
        <>
            <section id="cart" className="section">
                <div className="container">
                    {
                        cartQuantity === 0 ? (
                            <EmptyView
                                icon={<BsCartX />}
                                msg="Su carrito está vacío"
                                link="/all-products"
                                btnText="Empezar a comprar"
                            />
                        ) : (
                            <div className="wrapper cart_wrapper">
                                <div className="cart_left_col">
                                    {
                                        cartItems.map(item => (
                                            <CartItem
                                                key={item.id}
                                                {...item}
                                            />
                                        ))
                                    }
                                </div>

                                <div className="cart_right_col">
                                    <div className="order_summary">
                                        <h3>
                                            Resumen del pedido &nbsp;
                                            ( {cartQuantity} {cartQuantity > 1 ? 'items' : 'item'} )
                                        </h3>
                                        <div className="order_summary_details">
                                            <div className="price">
                                                <span>Precio original</span>
                                                <b>{displayCartTotal}</b>
                                            </div>
                                            <div className="discount">
                                                <span>Descuento</span>
                                                <b>- {displayCartDiscount}</b>
                                            </div>
                                            <div className="delivery">
                                                <span>Delivery</span>
                                                <b>Free</b>
                                            </div>
                                            <div className="separator"></div>
                                            <div className="total_price">
                                                <b><small>Precio total</small></b>
                                                <b>{displayTotalAmount}</b>
                                            </div>
                                        </div>
                                        <button type="button" className="btn checkout_btn">Pagar</button>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                </div>
            </section>
        </>
    );
};

export default Cart; */}

import React, { useContext } from 'react';
import { BsCartX } from 'react-icons/bs';
import { calculateTotal, displayMoney } from '../helpers/utils';
import useDocTitle from '../hooks/useDocTitle';
import cartContext from '../contexts/cart/cartContext';
import CartItem from '../components/cart/CartItem';
import EmptyView from '../components/common/EmptyView';

const Cart = () => {
    useDocTitle('Carrito');

    const { cartItems } = useContext(cartContext);

    const cartQuantity = cartItems.length;

    // precio original total
    const cartTotal = cartItems.map(item => {
        return item.originalPrice * item.quantity;
    });

    const calculateCartTotal = calculateTotal(cartTotal);
    const displayCartTotal = displayMoney(calculateCartTotal);

    // descuento total
    const cartDiscount = cartItems.map(item => {
        return (item.originalPrice - item.finalPrice) * item.quantity;
    });

    const calculateCartDiscount = calculateTotal(cartDiscount);
    const displayCartDiscount = displayMoney(calculateCartDiscount);

    // importe total final
    const totalAmount = calculateCartTotal - calculateCartDiscount;
    const displayTotalAmount = displayMoney(totalAmount);

    const handleCheckout = () => {
        const baseUrl = 'https://wa.me/584248433917';
        const message = cartItems.map(item => `\n- ${item.name}: ${item.url}`).join('');
        const whatsappUrl = `${baseUrl}?text=Hola%20me%20gustaría%20realizar%20una%20compra%20de:%20${encodeURIComponent(message)}`;
        window.location.href = whatsappUrl;
    };

    return (
        <>
            <section id="cart" className="section">
                <div className="container">
                    {
                        cartQuantity === 0 ? (
                            <EmptyView
                                icon={<BsCartX />}
                                msg="Su carrito está vacío"
                                link="/all-products"
                                btnText="Empezar a comprar"
                            />
                        ) : (
                            <div className="wrapper cart_wrapper">
                                <div className="cart_left_col">
                                    {
                                        cartItems.map(item => (
                                            <CartItem
                                                key={item.id}
                                                {...item}
                                            />
                                        ))
                                    }
                                </div>

                                <div className="cart_right_col">
                                    <div className="order_summary">
                                        <h3>
                                            Resumen del pedido &nbsp;
                                            ( {cartQuantity} {cartQuantity > 1 ? 'items' : 'item'} )
                                        </h3>
                                        <div className="order_summary_details">
                                            <div className="price">
                                                <span>Precio original</span>
                                                <b>{displayCartTotal}</b>
                                            </div>
                                            <div className="discount">
                                                <span>Descuento</span>
                                                <b>- {displayCartDiscount}</b>
                                            </div>
                                            <div className="delivery">
                                                <span>Delivery</span>
                                                <b>Free</b>
                                            </div>
                                            <div className="separator"></div>
                                            <div className="total_price">
                                                <b><small>Precio total</small></b>
                                                <b>{displayTotalAmount}</b>
                                            </div>
                                        </div>
                                        <button type="button" className="btn checkout_btn" onClick={handleCheckout}>Pagar</button>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                </div>
            </section>
        </>
    );
};

export default Cart;