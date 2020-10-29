import React from 'react';
import { updateQuantityInCart } from './CartHelpers';
import { Button } from 'react-bootstrap';

export default function UpdateQuantity(props) {
  function decrementQuantity(lineItem) {
    updateQuantityInCart(lineItem, lineItem.quantity - 1);
  }

  function incrementQuantity(lineItem) {
    updateQuantityInCart(lineItem, lineItem.quantity + 1);
  }

  return (
    <div className="quantity">
      <div className="q_name">
        <span>{props.lineItem.node.quantity}</span>
      </div>
      <div className="quantity_grid">
        <Button
          className="decrement"
          aria-label="decrement quantity"
          onClick={() => decrementQuantity(props.lineItem.node)}
          variant="dark"
        >-
          </Button>
          <Button
            className="increment"
            aria-label="increment quantity"
            onClick={() => {incrementQuantity(props.lineItem.node)}}
            disabled={props.lineItem.node.quantity >= props.lineItem.node.variant.quantityAvailable}
            variant="dark"
          >+
          </Button>
      </div>
    </div>
  );
}
