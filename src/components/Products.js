import { GET_PRODUCTS } from "../graphql/Queries";
import axios from "axios";
import ProductCard from "./ProductCard";

import React from "react";

import AppContext, { AppProvider } from "../context/AppContext";

//------------------------------
// AXIOS + CONTEXT API
//------------------------------

class Products extends React.Component {
  static contextType = AppContext;

  render() {
    // console.log('currency: ' + this.context.currency)
    // console.log('computed currency: ' + this.context.currency)

    const { productsData } = this.context || null;

    const productCategoryIndex = this.context.productCategoryIndex;
    const currencySelectedIndex = this.context.currencies.map(element => {return element.symbol}).indexOf(this.context.currency);

    return (
      <div>
        {this.context.productsDataLoading || !this.context.productsData ? (
          <div>loading...</div>
        ) : (
          <div className="product-listing__cards-container">
            {productsData.categories[productCategoryIndex].products.map((product) => {
              return (
                <ProductCard
                  key={product.id}
                  productUrl={product.id}
                  name={product.name}
                  image={product.gallery[0]}
                  priceSymbol={product.prices[currencySelectedIndex].currency.symbol}
                  priceAmount={product.prices[currencySelectedIndex].amount}
                  // priceSymbol={product.prices[0].currency.symbol}
                  // priceAmount={product.prices[0].amount}
                />
              );
            })}
          </div>
        )}
      </div>
    );
  }

  componentDidMount() {
    this.context.getProducts();
    // console.log("mounted");
  }
}

export default Products;

// //------------------------------
// // AXIOS
// //------------------------------

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
