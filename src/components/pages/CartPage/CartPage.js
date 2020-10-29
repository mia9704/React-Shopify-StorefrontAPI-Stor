import React from 'react';
import { connect } from 'react-redux';
import LineItems from './LineItems';
import './CartPage.scss';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

const Cart = (props) => {
    function goToCheckout() {
        window.location.assign(props.checkout.webUrl);
    }

    return (
        props.checkout && props.checkout.lineItems && props.checkout.lineItems.edges && props.checkout.lineItems.edges.length !== 0 ? (
            <div className="cart-page">
                <div className="products" key="products">
                    <div className="product_grid">
                        <div className="checkout-title">
                            <h1 className="tt">Shopping Cart</h1>
                        </div>
                        <LineItems />
                    </div>
                </div>
                <div className="summary">
                    <div className="summary-table">
                        <div className="total">
                            <h4 className="total-title">Subtotal</h4>
                            <h4 className="summary-total">
                                <span className="summary-totalValue">
                                    {props.currency && props.currency.currencySymbol}
                                    {props.checkout.totalPriceV2 && props.checkout.totalPriceV2.amount}
                                </span>
                            </h4>
                        </div>
                    </div>
                    <div className="centered">
                        <Button
                            aria-label="Check Out"
                            onClick={goToCheckout}
                            className="checkout-button"
                            disabled={!props.checkout || props.checkout.lineItems.edges.length === 0}
                            variant="dark"
                        >CHECKOUT</Button>
                        <Link className="continue-shopping-link" to="/collections/all">Continue Shopping</Link>
                    </div>
                </div>
            </div>
        ) : (
            <div className="empty-text">
            <h3>Your cart is currently empty.</h3>
            </div>
        )
    );
};

const mapStateToProps = (state) => ({
    checkout: state.checkout,
    currency: state.currency,
});

export default connect(mapStateToProps)(Cart);
