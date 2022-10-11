import React from 'react';
import AppContext from '../context/AppContext';
import LoadingSpinner from '../components/LoadingSpinner';
import ProductCard from './ProductCard';

//------------------------------
// AXIOS + CONTEXT API
//------------------------------

class Products extends React.Component {
  static contextType = AppContext;

  render() {
    const { productsData } = this.context || null;
    this.context.productsDataLoading && this.context.getProductCategory() //fetch product data on first render

    //load all products [0 index] if root route, else find category index by route pathname substring
    const productCategoryIndex =
      window.location.pathname.length === 1
        ? 0
        : this.context.productCategories
            .map((category) => category.name)
            .indexOf(String(window.location.pathname.substring(1)));

    //load display currency from state
    const currencySelectedIndex = this.context.currencies
      .map((element) => {
        return element.symbol;
      })
      .indexOf(this.context.currency);

    return (
      <div>
        {
          !this.context.productsData ? (
          <div>
            {/* <LoadingSpinner /> */}
            Please select a product category from the list above
          </div>
        ) :
        (
          <div className="product-listing__cards-container">
            {productsData.map(
              (product) => {
                return (
                  <ProductCard
                    key={product.id}
                    id={product.id}
                    productUrl={product.id}
                    name={product.name}
                    brand={product.brand}
                    image={product.gallery[0]}
                    priceSymbol={
                      product.prices[currencySelectedIndex].currency.symbol
                    }
                    priceAmount={product.prices[currencySelectedIndex].amount}
                    selectableAttributes={product.attributes.length !== 0}
                    inStock={product.inStock}
                  />
                );
              }
            )}
          </div>
        )}
      </div>
    );
  }

  componentDidMount() {
    // this.context.getProducts();
    // console.log('pathname ' +  window.location.pathname.substring(1))
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
