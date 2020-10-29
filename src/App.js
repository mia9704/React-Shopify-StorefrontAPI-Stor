import './App.css';
import React, { useEffect, useCallback } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import CartPage from './components/pages/CartPage/CartPage';
import CollectionPage from './components/pages/CollectionPage/CollectionPage';
import ProductPage from './components/pages/ProductPage/ProductPage';
import HomePage from './components/pages/HomePage/HomePage';
import Header from './components/shared/header/Header';
import store from './components/shared/store/store';
import { createCheckout, checkoutLineItemsReplace } from './components/shared/graphql/mutations';
import { getCheckout } from './components/shared/graphql/queries';
import { useMutation, useLazyQuery } from '@apollo/client';
import { connect } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';

function App(props) {

  const [createCheckoutMutation, { data: createCheckoutMutationData, error: createCheckoutMutationError }] = useMutation(createCheckout);
  const [getCheckoutQuery, { data: getCheckoutData, error: getCheckoutError }] = useLazyQuery(getCheckout);
  const [
    checkoutLineItemsReplaceMutation,
    {
      data: checkoutLineItemsReplaceMutationData,
      loading: checkoutLineItemsReplaceLoading,
      error: checkoutLineItemsReplaceError,
    },
  ] = useMutation(checkoutLineItemsReplace);

  const callCreateCheckout = useCallback(() => {
    if (props.currency && props.currency.currencyCode) {
      let input = {};
      input = {
        presentmentCurrencyCode: props.currency.currencyCode,
      };
      createCheckoutMutation({
        variables: {
          input,
          currencyCode: props.currency.currencyCode,
        },
      });
    }
  }, [createCheckoutMutation, props.currency]);

  useEffect(() => {
    store.dispatch({
      type: "CURRENCY_INIT"
    });
  }, []);

  useEffect(() => {
    store.dispatch({
      type: 'CHECKOUT_LINEITEMS_REPLACE_MUTATION_INIT',
      payload: {
        checkoutLineItemsReplaceMutation,
        checkoutLineItemsReplaceLoading,
      },
    });
  }, [checkoutLineItemsReplaceMutation, checkoutLineItemsReplaceLoading]);

  useEffect(() => {
    if (!props.checkout_id || props.checkout_id === '') {
      callCreateCheckout();
    }
  }, [callCreateCheckout, props.checkout_id]);

  useEffect(() => {
    if (props.checkout_id && props.checkout_id !== '' && props.currency && props.currency.currencyCode && !props.checkout) {
      getCheckoutQuery({
        variables: {
          id: props.checkout_id,
          currencyCode: props.currency.currencyCode,
        },
      });
    }

  }, [getCheckoutQuery, props.checkout_id, props.checkout, props.currency]);

  useEffect(() => {
    if (createCheckoutMutationError) {
      console.log(createCheckoutMutationError);
    }
    if (createCheckoutMutationData) {
      const checkoutData = createCheckoutMutationData.checkoutCreate.checkout;

      store.dispatch({
        type: 'CHECKOUT_INIT',
        payload: {
          checkout: checkoutData
        },
      });
    }
  }, [createCheckoutMutationData, createCheckoutMutationError]);

  useEffect(() => {
    if (getCheckoutError) {
      console.log(getCheckoutError);
    }
    if (getCheckoutData) {
      if (getCheckoutData.node && !getCheckoutData.node.completedAt && getCheckoutData.node.lineItems) {
        try {
          store.dispatch({
            type: 'CHECKOUT_INIT',
            payload: {
              checkout: getCheckoutData.node
            },
          });
        } catch (e) {
          callCreateCheckout();
        }
      } else if (getCheckoutData.node && getCheckoutData.node.completedAt) {
        callCreateCheckout();
      }
    }
  }, [getCheckoutData, getCheckoutError, callCreateCheckout]);

  useEffect(() => {
    if (checkoutLineItemsReplaceError) {
      console.log(checkoutLineItemsReplaceError);
    } else if (checkoutLineItemsReplaceMutationData) {
      try {
        store.dispatch({
          type: 'CHECKOUT_INIT',
          payload: {
            checkout: checkoutLineItemsReplaceMutationData.checkoutLineItemsReplace.checkout,
          },
        });
      } catch (e) {
        console.log(e);
      }
    }
  }, [checkoutLineItemsReplaceMutationData, checkoutLineItemsReplaceError]);

  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path="/" component={HomePage} />
      </Switch>
      <Switch>
        <Route exact path="/cart" component={CartPage} />
      </Switch>
      <Switch>
        <Route exact path="/collections/:handle" component={CollectionPage} />
      </Switch>
      <Switch>
        <Route exact path="/products/:handle" component={ProductPage} />
      </Switch>
    </Router>
  );
}

const mapStateToProps = (state) => ({
  checkout: state.checkout,
  currency: state.currency,
  checkout_id: state.checkout_id
});

export default connect(mapStateToProps)(App);
