import React from "react";
import AppContext, { AppProvider } from "../context/AppContext";

import axios from "axios";
import { GET_PRODUCT_DETAILS } from "../graphql/Queries";

import ProductImage from "../assets/product-image.png";
import IconPrev from "../assets/icon_prev.svg";
import IconNext from "../assets/icon_next.svg";
import IconPlusSquare from "../assets/icon_plus-square.svg";
import IconMinusSquare from "../assets/icon_minus-square.svg";

class CartItem extends React.Component {
  static contextType = AppContext;

  state = {
    productDetails: null,
  };

  getProductDescription = async () => {
    const productId = this.props.productId;
    try {
      const getProductDetails = await axios(GET_PRODUCT_DETAILS(productId)).then(
        (response) => {
          this.setState({
            productDetails: response.data.data.product,
          });
          // console.log("got" + JSON.stringify(response.data.data));
        }
      );
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    const productDetails = this.state.productDetails;

    return (
      <>
        {productDetails !== null ? (
          <div className="cart-item">
            <hr />
            <div className="cart-item__contents">
              <div className="product-description__attributes">
                {/* <span>{this.props.productId}</span> */}
                <br />
                <div className="product-description__attribute-name">
                  <span>{productDetails.brand}</span>
                </div>
                <div className="product-description__attribute-type">
                  <span>{productDetails.name}</span>
                </div>
                <div className="product-description__attributes-price">
                  <span className="product-description__attributes-price-amount">
                  {productDetails.prices[0].currency.symbol}{productDetails.prices[0].amount}
                  </span>
                </div>
                <div className="product-description__attributes-select-size">
                  <span className="product-description__attribute-category">
                    Size:
                  </span>
                  <div className="product-description__attributes-select-size-options">
                  {console.log(productDetails.attributes[0].name)}
                    <div className="product-description__attributes-size">
                      XS
                    </div>
                    <div className="product-description__attributes-size">
                      S
                    </div>
                    <div className="product-description__attributes-size">
                      M
                    </div>
                    <div className="product-description__attributes-size">
                      L
                    </div>
                  </div>
                </div>
                <div className="product-description__attributes-select-color">
                  <span className="product-description__attribute-category">
                    Color:
                  </span>
                  <div className="product-description__attributes-select-color-options">
                    <div className="product-description__attributes-color">
                      1
                    </div>
                    <div className="product-description__attributes-color">
                      2
                    </div>
                    <div className="product-description__attributes-color">
                      3
                    </div>
                  </div>
                </div>
              </div>
              <div className="cart-item__controls">
                <div className="cart-item__controls__quantity">
                  <div className="cart-item__controls__quantity-button">
                    <img src={IconPlusSquare} alt="add one more item" />
                  </div>
                  <div className="cart-item__controls__quantity-amount">
                    <span>1</span>
                  </div>
                  <div className="cart-item__controls__quantity-button">
                    <img src={IconMinusSquare} alt="remove one item" />
                  </div>
                </div>
                <div className="cart-item__controls__preview">
                  <img src={this.state.productDetails.gallery} alt="product preview" />
                  <div className="cart-item__controls__preview-buttons">
                    <div className="cart-item__controls__preview-prev">
                      <img src={IconPrev} alt="view previous product" />
                    </div>
                    <div className="cart-item__controls__preview-next">
                      <img src={IconNext} alt="view next product" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <span>loading products...</span>
        )}
      </>
    );
  }

  componentDidMount() {
    this.getProductDescription();
    console.log("item cart local state: " + JSON.stringify(this.state));
  }
}

export default CartItem;
