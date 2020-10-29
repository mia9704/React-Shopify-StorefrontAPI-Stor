import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import store from './components/shared/store/store';
import { Provider } from 'react-redux';
import { setContext } from 'apollo-link-context';
import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';

const httpLink = createHttpLink({
	uri: 'https://'+process.env.REACT_APP_SHOPIFY_STORE_URL+'/api/2020-10/graphql.json'
});
const middlewareLink = setContext(() => ({
	headers: {
		'X-Shopify-Storefront-Access-Token': process.env.REACT_APP_SHOPIFY_STOREFRONT_API_KEY
	}
}));

const client = new ApolloClient({
	link: middlewareLink.concat(httpLink),
	cache: new InMemoryCache()
});


ReactDOM.render(
  <Provider store={store}>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </Provider>,
  document.getElementById('root')
);

reportWebVitals();
