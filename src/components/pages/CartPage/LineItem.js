import React from 'react';
import { connect } from 'react-redux';
import Image from '../../shared/image';
import UpdateQuantity from './UpdateQuantity';
import { Link } from 'react-router-dom';

const LineItem = (props) => {
  return (
    props.lineItem && props.lineItem.node && props.lineItem.node.variant && props.lineItem.node.variant.presentmentPrices
      && props.lineItem.node.variant.presentmentPrices.edges
      && props.lineItem.node.variant.presentmentPrices.edges[0]
      && props.lineItem.node.variant.presentmentPrices.edges[0].node
      && props.lineItem.node.variant.presentmentPrices.edges[0].node.price ? (
        <tr>
          <td>
            <Link
              to={props.url}
              className="product-image"
            >
              <Image src={props.lineItem.node.variant.image.src} alt={props.lineItem.node.variant.image.altText} />
            </Link>
            <Link
              to={props.url}
              className="product-name"
            >
              {props.lineItem.node.title}
            </Link>
            <p>Size: {props.lineItem.node.variant.title}</p>
          </td>
          <td>{props.currency && props.currency.currencySymbol}{props.lineItem.node.variant.presentmentPrices.edges[0].node.price.amount}</td>
          <td><UpdateQuantity lineItem={props.lineItem} /></td>
        </tr>
      ) : null

  );
};

const mapStateToProps = (state) => ({
  checkout: state.checkout,
  currency: state.currency,
});

export default connect(mapStateToProps)(LineItem);
