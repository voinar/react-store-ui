import React from "react";
// import { ApolloProvider, useQuery, gql } from '@apollo/client'
import { GET_PRODUCTS } from '../Queries';
import ProductListingCard from "../../components/ProductCard";
import ProductCartAdd from "../../assets/icon_add-to-cart.svg";


class Products extends React.Component {
  state = {
    loading: true,
    data: null,
  };

  componentDidMount() {
    this.renderProducts();
  }



  renderProducts = async () => {
    try {
      const res = await GET_PRODUCTS;
      const data = await res.json();

      this.setState({
        data: data.data,
        loading: false
      });

    } catch (err) {
      console.log(err);
    }
  };

  render() {
    // console.log(this.state)

    const { data } = this.state || null;
    console.log(data);
    return (
      <>
        <div>
          {this.state.loading || !this.state.data ? (
            <div>loading...</div>
          ) : (
            <div className="product-listing__cards-container">
              {/* {this.state.data.categories[0].name}&nbsp;
              {this.state.data.categories[0].products[0].id} */}
              {data.categories[0].products.map((obj) => {
                return (
                  <div className="product-card" key={obj.name}>
                    <img src={obj.gallery[0]} alt="product" />
                    <div className="product-card__content">
                      <h2 className="product-card__content-title">
                        {obj.name}
                      </h2>
                      <span className="product-card__content-price">
                        {obj.prices[0].amount}
                      </span>
                    </div>
                    <div className="product-card__cart-add">
                      <img src={ProductCartAdd} alt="add product to cart" />
                    </div>
                    <div className="product-card__out-of-stock">
                      <span>Out of stock</span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </>
    );
  }

  componentDidUpdate() {
    this.renderProducts();
  }
}

export default Products;

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
