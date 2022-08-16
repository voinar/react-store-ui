import React from "react";
// import { ApolloProvider, useQuery, gql } from '@apollo/client'
import { GET_PRODUCTS } from "../graphql/Queries";
import ProductCard from "./ProductCard";
import ProductCartAdd from "../assets/icon_add-to-cart.svg";

class Products extends React.Component {
    state = {
      loading: true,
      categories: null,
    };


  renderProducts = async () => {
    try {
      const res = await GET_PRODUCTS;
      const data = await res.clone().json();

      this.setState({
        loading: false,
        data: data.data,
      });
    } catch (err) {
      console.log(err);
    }
    // console.log('fetch successful')
    // console.log(this.props.category.indexOf(this.props.category))
  };

  render() {
    const { data } = this.state || null;

    const categoryIndex = this.props.categoryIndex;
    // const categoryIndex = this.props.categoryIndex;
    // console.log((window.location.pathname).substring(9))
    // console.log(this.state.data)
    return (
      <div>
        {this.state.loading || !this.state.data ? (
          <div>loading...</div>
        ) : (
          <div className="product-listing__cards-container">
            {data.categories[categoryIndex].products.map((obj) => {
              return <ProductCard
              key={obj.id}
              productUrl={obj.id}
              name={obj.name}
              image={obj.gallery[0]}
              priceSymbol={obj.prices[0].currency.symbol}
              priceAmount={obj.prices[0].amount}
              />;
            })}
          </div>
        )}
      </div>
    );
  }

  // (window.location.pathname).substring(1)

  componentDidMount() {
    this.renderProducts();
    console.log("mounted");
  }

  componentDidUpdate() {
    this.renderProducts();
    // console.log('updated')
  }
}

export default Products;

{
  /* <div className="product-card" key={obj.name}>
                  <img src={obj.gallery[0]} alt="product" />
                  <div className="product-card__content">
                    <h2 className="product-card__content-title">{obj.name}</h2>
                    <span className="product-card__content-price">
                      {obj.prices[0].currency.symbol}
                      {obj.prices[0].amount}
                    </span>
                  </div>
                  <div className="product-card__cart-add">
                    <img src={ProductCartAdd} alt="add product to cart" />
                  </div>
                  <div className="product-card__out-of-stock">
                    <span>Out of stock</span>
                  </div>
                </div> */
}

// APOLLO
// export default function Products() {
//   const { error, data, loading } = useQuery(GET_PRODUCTS)
//   console.log({ error, data, loading })

//   if (loading) return <div>Loading...</div>
//   if (error) return <div>Something went wrong..</div>
//   return (
//     <>
//     {data.categories[0].products.map(obj => {
//     return <div className="product-card">
//             <img src={obj.gallery[0]} alt="product" />
//             <div className="product-card__content">
//                 <h2 className="product-card__content-title">{obj.name}</h2>
//                 <span className="product-card__content-price">{obj.prices[0].amount}</span>
//             </div>
//             <div className="product-card__cart-add">
//                 <img src={ProductCartAdd} alt="add product to cart" />
//             </div>
//             <div className="product-card__out-of-stock">
//                 <span>Out of stock</span>
//             </div>
//         </div>
//       })
//     }
//     </>
//   )
// }
