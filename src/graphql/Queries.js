export const GET_PRODUCT_CATEGORIES = {
  url: "http://localhost:4000/",
  method: "POST",
  data: {
    query: `
        query GET_PRODUCT_CATEGORIES {
        categories {
          name
        }
      }`,
  },
};

export const GET_PRODUCTS = {
  url: "http://localhost:4000/",
  method: "POST",
  data: {
    query: `
    query GET_PRODUCTS {
      categories {
        name
        products {
          id
          name
          inStock
          gallery
          description
          category
          attributes {
            type
            name
            id
            items {
              id
              value
              displayValue
            }
          }
          brand
          prices {
            amount
            currency {
              label
              symbol
            }
          }
        }
      }
    }
    `,
  },
};

export const GET_CURRENCIES = {
  url: "http://localhost:4000/",
  method: "POST",
  data: {
    query: `
    query Currencies {
      currencies {
        label
        symbol
      }
    }
    `,
  },
};

export const GET_PRODUCT_DETAILS = (productId) => {
  return {
    url: "http://localhost:4000/",
    method: "POST",
    data: {
      query: `
    query GET_PRODUCT_DETAILS($productId: String!) {
      product(id: $productId) {
        id
        name
        inStock
        gallery
        description
        category
        prices {
          currency {
            label
            symbol
          }
          amount
        }
        brand
        attributes {
          id
          name
          type
          items {
            displayValue
            value
            id
          }
        }
      }
    }
    `,
      variables: {
        productId: productId,
      },
    },
  };
};

// FETCH API

// export const GET_CATEGORIES = fetch("http://localhost:4000/", {
//   method: "POST",
//   headers: { "Content-Type": "application/json" },
//   body: JSON.stringify({
//     query: `
//         query GET_CATEGORIES {
//         categories {
//           name
//         }
//       }`,
//   }),
// });

// export const GET_PRODUCTS = fetch("http://localhost:4000/", {
//   method: "POST",
//   headers: { "Content-Type": "application/json" },
//   body: JSON.stringify({
//     query: `
//         query GET_PRODUCTS {
//           categories {
//             name
//             products {
//               id
//               name
//               inStock
//               gallery
//               description
//               category
//               attributes {
//                 type
//                 name
//                 id
//                 items {
//                   id
//                   value
//                   displayValue
//                 }
//               }
//               brand
//               prices {
//                 amount
//                 currency {
//                   label
//                   symbol
//                 }
//               }
//             }
//           }
//         }
//         `,
//   }),
// });
