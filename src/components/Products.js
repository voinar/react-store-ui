import React from "react";
import { connect } from "react-redux";
import { loadProducts } from "../redux/reducers/products";
import axios from "axios";
import { qgl } from '@apollo/client'

import { GET_PRODUCTS } from "../graphql/Queries";
import ProductCard from "./ProductCard";


class Products extends React.Component {
  state = {
    loading: true,
    categories: null,
  };

  renderProducts = async () => {
    try {
      const query = await axios({
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
      }).then((result) => {
        console.log(result.data.data);
        this.setState({
          loading: false,
          data: result.data.data,
        });
      });
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    const { data } = this.state || null;

    const categoryIndex = this.props.categoryIndex;
    return (
      <div>
        {this.state.loading || !this.state.data ? (
          <div>loading...</div>
        ) : (
          <div className="product-listing__cards-container">
            {data.categories[categoryIndex].products.map((obj) => {
              return (
                <ProductCard
                  key={obj.id}
                  productUrl={obj.id}
                  name={obj.name}
                  image={obj.gallery[0]}
                  priceSymbol={obj.prices[0].currency.symbol}
                  priceAmount={obj.prices[0].amount}
                />
              );
            })}
          </div>
        )}
      </div>
    );
  }

  componentDidMount() {
    this.renderProducts();
    console.log("mounted");
  }
}

export default Products;

//------------------------------
// AXIOS
//------------------------------

// class Products extends React.Component {
//   state = {
//     loading: true,
//     categories: null,
//   };

//   renderProducts = async () => {
//     try {
//       const query = await axios({
//         url: "http://localhost:4000/",
//         method: "POST",
//         data: {
//           query: `
//           query GET_PRODUCTS {
//             categories {
//               name
//               products {
//                 id
//                 name
//                 inStock
//                 gallery
//                 description
//                 category
//                 attributes {
//                   type
//                   name
//                   id
//                   items {
//                     id
//                     value
//                     displayValue
//                   }
//                 }
//                 brand
//                 prices {
//                   amount
//                   currency {
//                     label
//                     symbol
//                   }
//                 }
//               }
//             }
//           }
//           `,
//         },
//       }).then((result) => {
//         console.log(result.data.data);
//         this.setState({
//           loading: false,
//           data: result.data.data,
//         });
//       });
//     } catch (err) {
//       console.log(err);
//     }
//     // console.log('fetch successful')
//     // console.log(this.props.category.indexOf(this.props.category))
//   };

//   render() {
//     const { data } = this.state || null;

//     const categoryIndex = this.props.categoryIndex;
//     return (
//       <div>
//         {this.state.loading || !this.state.data ? (
//           <div>loading...</div>
//         ) : (
//           <div className="product-listing__cards-container">
//             {data.categories[categoryIndex].products.map((obj) => {
//               return (
//                 <ProductCard
//                   key={obj.id}
//                   productUrl={obj.id}
//                   name={obj.name}
//                   image={obj.gallery[0]}
//                   priceSymbol={obj.prices[0].currency.symbol}
//                   priceAmount={obj.prices[0].amount}
//                 />
//               );
//             })}
//           </div>
//         )}
//       </div>
//     );
//   }

//   componentDidMount() {
//     this.renderProducts();
//     console.log("mounted");
//   }
// }

// export default Products;

//------------------------------
// FETCH API
//------------------------------

// class Products extends React.Component {
//     state = {
//       loading: true,
//       categories: null,
//     };

//   renderProducts = async () => {
//     try {
//       const res = await GET_PRODUCTS;
//       const data = await res.clone().json();

//       this.setState({
//         loading: false,
//         data: data.data,
//       });
//     } catch (err) {
//       console.log(err);
//     }
//     // console.log('fetch successful')
//     // console.log(this.props.category.indexOf(this.props.category))
//   };

//   render() {
//     const { data } = this.state || null;

//     const categoryIndex = this.props.categoryIndex;
//     return (
//       <div>
//         {this.state.loading || !this.state.data ? (
//           <div>loading...</div>
//         ) : (
//           <div className="product-listing__cards-container">
//             {data.categories[categoryIndex].products.map((obj) => {
//               return <ProductCard
//               key={obj.id}
//               productUrl={obj.id}
//               name={obj.name}
//               image={obj.gallery[0]}
//               priceSymbol={obj.prices[0].currency.symbol}
//               priceAmount={obj.prices[0].amount}
//               />;
//             })}
//           </div>
//         )}
//       </div>
//     );
//   }

//   componentDidMount() {
//     this.renderProducts();
//     console.log("mounted");
//   }

//   // componentDidUpdate() {
//   //   this.renderProducts();
//   //   // console.log('updated')
//   // }
// }

// export default Products;
