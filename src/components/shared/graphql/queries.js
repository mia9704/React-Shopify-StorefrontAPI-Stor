import gql from 'graphql-tag';

export const getCollectionByHandle = gql`
  query getCollectionByHandle($handle: String!, $currencyCode: CurrencyCode!) {
    collectionByHandle(handle: $handle) {
      id
      title
      description
      handle
      products(first: 50) {
        edges {
          node {
            id
            title
            handle
            availableForSale
            images(first: 1) {
              edges {
                node {
                  id
                  altText
                  originalSrc
                }
              }
            }
            variants(first: 1) {
              edges {
                node {
                  id
                  title
                  quantityAvailable
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
                }
              }
            }
          }
        }
      }
    }
  }
`;


export const getCollectionByHandleFirst5 = gql`
  query getCollectionByHandle($handle: String!, $currencyCode: CurrencyCode!) {
    collectionByHandle(handle: $handle) {
      id
      title
      description
      handle
      products(first: 5) {
        edges {
          node {
            id
            title
            handle
            availableForSale
            images(first: 1) {
              edges {
                node {
                  id
                  altText
                  originalSrc
                }
              }
            }
            variants(first: 1) {
              edges {
                node {
                  id
                  title
                  quantityAvailable
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
                }
              }
            }
          }
        }
      }
    }
  }
`;


export const getProductByHandle = gql`
  query getProductByHandle($handle: String!, $currencyCode: CurrencyCode!) {
    productByHandle(handle: $handle) {
      availableForSale
      createdAt
      description
      descriptionHtml
      id
      handle
      tags
      title
      vendor
      productType
      options(first: 100) {
        id
        name
        values
      }
      images(first: 20) {
        edges {
          node {
            altText
            originalSrc
          }
        }
      }
      description
      descriptionHtml
      priceRange {
        minVariantPrice {
          amount
          currencyCode
        }
        maxVariantPrice {
          amount
          currencyCode
        }
      }
      variants(first: 100) {
        edges {
          node {
            quantityAvailable
            sku
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
            id
            availableForSale
            selectedOptions {
              name
              value
            }
            sku
            title
          }
        }
      }
    }
  }
`;

export const getCheckout = gql`
  query($id: ID!, $currencyCode: CurrencyCode!) {
    node(id: $id) {
      id
      ... on Checkout {
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

export const getProductsByHandle = gql`
  query getProducts($productIds: [ID!]!, $currencyCode: CurrencyCode!) {
    nodes(ids: $productIds) {
      ... on Product {
        availableForSale
        createdAt
        description
        id
        handle
        title
        options(first: 100) {
          id
          name
          values
        }
        images(first: 20) {
          edges {
            node {
              altText
              originalSrc
            }
          }
        }
        variants(first: 100) {
          edges {
            node {
              id
              title
              availableForSale
              quantityAvailable
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
              selectedOptions {
                name
                value
              }
            }
          }
        }
      }
    }
  }
`;