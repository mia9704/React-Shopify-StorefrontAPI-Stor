import React from 'react';
import './CartPage.scss';
import { connect } from 'react-redux';
import LineItem from './LineItem';
import { Table } from 'react-bootstrap';

const LineItems = (props) => {
  const grid = [];

  if (props.checkout &&
    props.checkout.lineItems &&
    props.checkout.lineItems.edges &&
    props.checkout.lineItems.edges) {
    for (let index in props.checkout.lineItems.edges) {
      let lineItem = props.checkout.lineItems.edges[index];
      let url = '';
      if (lineItem.node && lineItem.node.variant && lineItem.node.variant.product && lineItem.node.variant.product.handle) {
        url = `/products/${lineItem.node.variant.product.handle}`;
      }

      grid.push(
        <LineItem
          key={index}
          lineItem={lineItem}
          url={url}
          currency={props.currency}
        />,
      );
    }
  }

  return (<Table responsive>
    <thead>
      <tr>
        <th>Product</th>
        <th>Price</th>
        <th>Quantity</th>
      </tr>
    </thead>
    <tbody>
      {grid && grid.map((gridItem, index) => {
        return (gridItem);
      })}
    </tbody>
  </Table>);
};

const mapStateToProps = (state) => ({
  checkout: state.checkout,
  currency: state.currency,
});

export default connect(mapStateToProps)(LineItems);
