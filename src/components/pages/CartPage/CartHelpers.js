import store from '../../shared/store/store';

/**
 * Adds given variant to the cart
 *
 * @param variant the variant (object) to be added
 *
 * @return true if successfully added. false if add was unsuccessful
 */
export function addToCart(variant) {
  const variantId = variant.id;
  const { quantityAvailable } = variant;
  let cartQuantity = 0;
  let items = [];

  if (store.getState().checkout &&
    store.getState().checkout.lineItems &&
    store.getState().checkout.lineItems.edges &&
    store.getState().checkout.lineItems.edges) {
    for (let lineItem of store.getState().checkout.lineItems.edges) {
      if (lineItem.node.variant.id === variantId) {
        cartQuantity = lineItem.node.quantity;
      }
      items.push({
        variantId: lineItem.node.variant.id,
        quantity: parseInt(lineItem.node.quantity),
      });
    }
  }
  if (cartQuantity < quantityAvailable) {
    items.push({
      variantId,
      quantity: 1,
    });
  }
  const variables = {
    checkoutId: store.getState().checkout.id,
    lineItems: items,
    currencyCode: store.getState().currency.currencyCode,
  };
  store.getState().checkoutLineItemsReplaceMutation({
    variables,
  });
}

/**
 * Updates the quantity of the given lineItem to the cart
 *
 * @param lineItem the lineItem (object) to update quantity of
 * @param newQuantity the new quantity of the lineItem
 *
 * @return true if successfully updated. false if update was unsuccessful
 */
export function updateQuantityInCart(lineItem, newQuantity) {
  const { quantityAvailable } = lineItem.variant;
  const variantId = lineItem.variant.id;
  if (newQuantity <= quantityAvailable) {
    updateLineItem(variantId, newQuantity);
  }
}

/**
 * Updates the lineItem in the cart
 *
 * @param variantId the variantId of the lineItem to update
 * @param quantity the new quantity of the lineItem
 *
 * @return none
 */
export function updateLineItem(variantId, quantity) {
  let items = [];

  if (store.getState().checkout &&
    store.getState().checkout.lineItems &&
    store.getState().checkout.lineItems.edges &&
    store.getState().checkout.lineItems.edges) {
    for (let lineItem of store.getState().checkout.lineItems.edges) {
      if (lineItem.node && lineItem.node.variant) {
        if (variantId === lineItem.node.variant.id) {
          if (quantity > 0) {
            items.push({
              variantId: lineItem.node.variant.id,
              quantity: parseInt(quantity),
            });
          }
        } else {
          items.push({
            variantId: lineItem.node.variant.id,
            quantity: parseInt(lineItem.node.quantity),
          });
        }
      }
    }
  }
  const variables = {
    checkoutId: store.getState().checkout.id,
    lineItems: items,
  };
  if (store.getState().currency && store.getState().currency.currencyCode) {
    variables.currencyCode = store.getState().currency.currencyCode;
  }
  store.getState().checkoutLineItemsReplaceMutation({
    variables,
  });
}