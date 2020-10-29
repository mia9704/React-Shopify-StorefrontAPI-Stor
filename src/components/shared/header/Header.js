import React from 'react';
import './Header.scss';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const Header = (props) => {
    return (
        <div className="header">
            <h1>Sample Store</h1>
            <Link to="/">Home</Link>
            <Link to="/collections/all">All</Link>
            <Link to="/collections/women">Women</Link>
            <Link to="/collections/men">Men</Link>
            <Link to="/cart" className="cart-button">Cart
            <div className="cart-quantity">
                    <span>{props.checkout && props.checkout.lineItems && props.checkout.lineItems.edges && props.checkout.lineItems.edges.length}</span>
                </div>
            </Link>
        </div>
    );
};

const mapStateToProps = (state) => ({
    checkout: state.checkout,
    currency: state.currency,
});

export default connect(mapStateToProps)(Header);