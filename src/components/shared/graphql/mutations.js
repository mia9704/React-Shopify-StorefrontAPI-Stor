import gql from 'graphql-tag';

export const createCheckout = gql`
  mutation checkoutCreate($input: CheckoutCreateInput!, $currencyCode: CurrencyCode!) {
    checkoutCreate(input: $input) {
      userErrors {
        message
        field
      }
      checkout {
        id
        webUrl
        totalTax
        subtotalPriceV2 {
          amount
        }
        totalPriceV2 {
          amount
        }
        lineItems(first: 250) {
          edges {
            node {
              id
              title
              variant {
                id
                title
                sku
                quantityAvailable
                image {
                  altText
                  src
                }
                selectedOptions {
                  name
                  value
                }
                presentmentPrices(first: 1, presentmentCurrencies: [$currencyCode]) {
                  edges {
                    node {
                      compareAtPrice {
                        amount
                        currencyCode
                      }
                      price {
                        amount
                        currencyCode
                      }
                    }
                  }
                }
                product {
                  id
                  handle
                  title
                  productType
                  tags
                  variants(first: 100) {
                    edges {
                      node {
                        id
                        title
                        quantityAvailable
                        availableForSale
                        selectedOptions {
                          name
                          value
                        }
                      }
                    }
                  }
                }
              }
              quantity
            }
          }
        }
      }
    }
  }
`;

export const checkoutLineItemsReplace = gql`
  mutation checkoutLineItemsReplace(
    $lineItems: [CheckoutLineItemInput!]!
    $checkoutId: ID!
    $currencyCode: CurrencyCode!
  ) {
    checkoutLineItemsReplace(lineItems: $lineItems, checkoutId: $checkoutId) {
      userErrors {
        code
        field
        message
      }
      checkout {
        id
        webUrl
        totalTax
        subtotalPriceV2 {
          amount
        }
        totalPriceV2 {
          amount
        }
        lineItems(first: 250) {
          edges {
            node {
              id
              title
              variant {
                id
                title
                sku
                quantityAvailable
                image {
                  altText
                  src
                }
                selectedOptions {
                  name
                  value
                }
                presentmentPrices(first: 1, presentmentCurrencies: [$currencyCode]) {
                  edges {
                    node {
                      compareAtPrice {
                        amount
                        currencyCode
                      }
                      price {
                        amount
                        currencyCode
                      }
                    }
                  }
                }
                product {
                  id
                  handle
                  title
                  productType
                  tags
                  variants(first: 100) {
                    edges {
                      node {
                        id
                        title
                        quantityAvailable
                        availableForSale
                        selectedOptions {
                          name
                          value
                        }
                      }
                    }
                  }
                }
              }
              quantity
            }
          }
        }
      }
    }
  }
`;