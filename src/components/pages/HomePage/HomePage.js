import React from 'react';
import { connect } from 'react-redux';
import './HomePage.scss';
import { Link } from 'react-router-dom';
import CollectionSection from './CollectionSection';

const HomePage = () => {
    return (
        <div className="home-page">
            <h2>Collections</h2>
            <Link to="/collections/women">Women</Link>
            <CollectionSection collectionHandle="women"/>
            <Link to="/collections/men">Men</Link>
            <CollectionSection collectionHandle="men"/>
        </div>
    );
};

const mapStateToProps = (state) => ({
    checkout: state.checkout,
    currency: state.currency,
});

export default connect(mapStateToProps)(HomePage);
