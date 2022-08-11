import { gql } from "@apollo/client";

export const GET_CATEGORIES = fetch("http://localhost:4000/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: `
        query GET_CATEGORIES {
        categories {
          name
        }
      }`,
    }),
  });

export const GET_PRODUCTS = fetch("http://localhost:4000/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
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
    }),
  });

// export const GET_CURRENCIES = gql`
//     currencies {
//         label
//         symbol
//     }
// `


// export const GET_PRODUCTS = gql`
//   query GET_PRODUCTS {
//     categories {
//       name
//       products {
//         id
//         name
//         inStock
//         gallery
//         description
//         category
//         attributes {
//           type
//           name
//           id
//           items {
//             id
//             value
//             displayValue
//           }
//         }
//         brand
//         prices {
//           amount
//           currency {
//             label
//             symbol
//           }
//         }
//       }
//     }
//   }
// `;

// export const GET_CURRENCIES = gql`
//     currencies {
//         label
//         symbol
//     }
// `
