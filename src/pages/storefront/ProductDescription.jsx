import React from "react";
import ProductImage from "../../assets/product-image.png";

// const GET_PRODUCT_DESCRIPTION = fetch("http://localhost:4000/", {
//   signal: signal,
//   method: "POST",
//   headers: { "Content-Type": "application/json" },
//   body: JSON.stringify({
//     query: `
//       query GET_PRODUCTS($productId: String!) {
//         product(id: $productId) {
//           id
//           name
//           inStock
//           gallery
//           description
//           category
//           prices {
//             currency {
//               label
//               symbol
//             }
//             amount
//           }
//           brand
//         }
//       }
//     `,
//     variables: {
//       productId: productId
//     }
//   }),
// });

const fetchController = new AbortController();

class ProductDescription extends React.Component {
  state = {
    loading: true,
    product: null,
  };
  // productId = window.location.pathname.substring(9) //get product id w/o '/product/' prefix for use in database query

  getProductDescription = async () => {
    const { signal } = fetchController;
    try {
      const res = await fetch("http://localhost:4000/", {
        signal: signal,
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: `query GET_PRODUCT_DEATILS($productId: String!) {
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
            productId: window.location.pathname.substring(9),
          },
        }),
      });
      const data = await res.json();
      this.setState({
        loading: false,
        product: data.data,
      });
      // this.fetchController?.abort();
    } catch (err) {
      console.log(err);
    }

    console.log("getProductDescription: " + JSON.stringify(this.state));
  };

  render() {
    // console.log("product state: " + JSON.stringify(this.state.product));
    // console.log("product url: " + `${window.location.pathname.substring(1)}`);
    console.log("fetched");
    // this.fetchController.abort();

    return (
      <>
        {this.state.product ? (
          <div className="product-description section-container">
            <div className="product-description__images">
              <div className="product-description__images-small">
                <div className="product-description__image-small">
                  <img
                    src={this.state.product.product.gallery[0]}
                    alt="product"
                  />
                </div>
                <div className="product-description__image-small">
                  <img
                    src={this.state.product.product.gallery[1]}
                    alt="product"
                  />
                </div>
                <div className="product-description__image-small">
                  <img
                    src={this.state.product.product.gallery[2]}
                    alt="product"
                  />
                </div>
              </div>
              <div className="product-description__image-large">
                <img src={this.state.product.product.gallery} alt="product" />
              </div>
            </div>
            <div className="product-description__attributes">
              <div className="product-description__attribute-name">
                <span>{this.state.product.product.name}</span>
              </div>
              <div className="product-description__attribute-type">
                <span>{this.state.product.product.brand}</span>
              </div>
              <div className="product-description__attributes-select-size">
                <span className="product-description__attribute-category">
                  Size:
                </span>
                <div className="product-description__attributes-select-size-options">
                  <div className="product-description__attributes-size">XS</div>
                  <div className="product-description__attributes-size">S</div>
                  <div className="product-description__attributes-size">M</div>
                  <div className="product-description__attributes-size">L</div>
                </div>
              </div>
              <div className="product-description__attributes-select-color">
                <span className="product-description__attribute-category">
                  Color:
                </span>
                <div className="product-description__attributes-select-color-options">
                  <div className="product-description__attributes-color">1</div>
                  <div className="product-description__attributes-color">2</div>
                  <div className="product-description__attributes-color">3</div>
                </div>
              </div>
              <div className="product-description__attributes-price">
                <span className="product-description__attribute-category">
                  Price:
                </span>
                <span className="product-description__attributes-price-amount">
                  {this.state.product.product.prices.amount}
                </span>
              </div>
              <button className="product-description__button">
                Add to cart
              </button>
              <div className="product-description__contents">
                <span>{this.state.product.product.description}</span>
              </div>
            </div>
          </div>
        ) : (
          <h2>loading product description...</h2>
        )}
      </>
    );
  }

  componentDidMount() {
    this.getProductDescription();
    console.log("getting product description");
    console.log(JSON.stringify(this.state));
    // this.fetchController.abort();
  }

  componentWillUnmount() {
    // this.setState = null;
    // console.log(JSON.stringify(this.state));

    //   console.log("unmounting + abort controller");
    //   this.setState(null);
    console.log("unmounting: " + JSON.stringify(this.state));
    // console.log("res: " + this.res)
    this.setState(null);
    console.log("unmounted: " + JSON.stringify(this.state));
  }
}

export default ProductDescription;
