import React from "react";
import AppContext from "../context/AppContext";

import uuid from "react-uuid";

import IconPrev from "../assets/icon_prev.svg";
import IconNext from "../assets/icon_next.svg";
import IconPlusSquare from "../assets/icon_plus-square.svg";
import IconMinusSquare from "../assets/icon_minus-square.svg";

class CartItem extends React.Component {
  static contextType = AppContext;

  state = {
    previewImageIndex: 0
  };

  getAttributeType = () => {
    //distinguish between size & capacity: find the property's index in attributes, then return the name of appropriate attribute
    return this.props.productDetails.attributes[
      this.props.productDetails.attributes.findIndex((items) => {
        switch (items.name) {
          case "Size":
            // console.log("attr type: " + items.name);
            return "Size";
          case "Capacity":
            // console.log("attr type: " + items.name);
            return "Capacity";
        }
      })
    ].name;
  };

  nextPreviewImage = () => {
    if (
      this.state.previewImageIndex <
      this.props.productDetails.gallery.length - 1
    ) {
      this.setState({
        previewImageIndex: this.state.previewImageIndex + 1,
      });
    } else {
      this.setState({
        previewImageIndex: 0,
      });
    }
  };

  prevPreviewImage = () => {
    if (this.state.previewImageIndex > 0) {
      this.setState({
        previewImageIndex: this.state.previewImageIndex - 1,
      });
    }
    if (this.state.previewImageIndex === 0)
      this.setState({
        previewImageIndex: this.props.productDetails.gallery.length - 1,
      });
  };

  render() {
    const productDetails = this.props.productDetails;

    return (
      <>
        {productDetails ? (
          <div className="cart-item">
            <hr />
            <div className="cart-item__contents">
              <div className="product-description__attributes">
                {/* <span>{productDetails.cartItemId}</span> */}
                <div className="product-description__attribute-name">
                  <span>{productDetails.brand}</span>
                </div>
                <div className="product-description__attribute-type">
                  <span>{productDetails.name}</span>
                </div>
                <div className="product-description__attributes-price">
                  <span className="product-description__attributes-price-amount">
                    {
                      productDetails.prices[
                        this.context.currencies
                          .map((element) => {
                            return element.symbol;
                          })
                          .indexOf(this.context.currency)
                      ].currency.symbol
                    }
                    {
                      productDetails.prices[
                        this.context.currencies
                          .map((element) => {
                            return element.symbol;
                          })
                          .indexOf(this.context.currency)
                      ].amount
                    }
                    {/* {JSON.stringify(productDetails.prices)} */}
                  </span>
                </div>

                {productDetails.attributes.length > 0 ? (
                  <div className="product-description__attributes-select-size">
                    <span className="product-description__attribute-category">
                      Size:
                    </span>
                    <div className="product-description__attributes-select-size-options">
                      {productDetails.attributes[
                        productDetails.attributes.findIndex((items) => {
                          switch (items.name) {
                            case "Size":
                              return "Size";
                            case "Capacity":
                              return "Capacity";
                          }
                        })
                      ].items.map((attribute) => {
                        return this.getAttributeType() === "Capacity" ? (
                          <div
                            key={uuid()}
                            className={
                              attribute.value !== undefined
                                ? attribute.value ===
                                  this.props.attributeSelectedCapacity
                                  ? "product-description__attributes-size product-description__attributes-size--selected"
                                  : "product-description__attributes-size"
                                : "product-description__attributes-size"
                            }
                          >
                            {attribute.value}
                          </div>
                        ) : (
                          <div
                            key={uuid()}
                            className={
                              attribute.value !== undefined
                                ? attribute.value ===
                                  this.props.attributeSelectedSize
                                  ? "product-description__attributes-size product-description__attributes-size--selected"
                                  : "product-description__attributes-size"
                                : "product-description__attributes-size"
                            }
                          >
                            {attribute.value}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ) : null}

                {productDetails.attributes.find((obj) => {
                  return obj.type === "swatch";
                }) ? (
                  <div className="product-description__attributes-select-color">
                    <span className="product-description__attribute-category">
                      Color:
                    </span>
                    <div className="product-description__attributes-select-color-options">
                      {productDetails.attributes[
                        productDetails.attributes.findIndex((items) => {
                          return items.type === "swatch";
                        })
                      ].items.map((colorOption) => {
                        return (
                          <div
                            key={uuid()}
                            className={
                              colorOption.value !== undefined
                                ? colorOption.value ===
                                  this.props.attributeSelectedColor
                                  ? "product-description__attributes-color product-description__attributes-color--selected"
                                  : "product-description__attributes-color"
                                : "product-description__attributes-color"
                            }
                            style={{ backgroundColor: `${colorOption.value}` }}
                          ></div>
                        );
                      })}
                    </div>
                  </div>
                ) : null}
              </div>
              <div className="cart-item__controls">
                <div className="cart-item__controls__quantity">
                  <div
                    className="cart-item__controls__quantity-button"
                    onClick={() => {
                      this.context.cartItemAddOne(productDetails.cartItemId);
                    }}
                  >
                    +
                  </div>
                  <div className="cart-item__controls__quantity-amount">
                    <span>{this.props.duplicateItemCount}</span>
                  </div>
                  <div
                    className="cart-item__controls__quantity-button cart-item__controls__quantity-button--minus"
                    onClick={() => {
                      this.context.cartItemSubtractOne(
                        productDetails.cartItemId
                      );
                    }}
                  >
                    -
                  </div>
                </div>
                <div className="cart-item__controls__preview">
                  <img
                    src={productDetails.gallery[this.state.previewImageIndex]}
                    alt="product preview"
                  />
                  {this.props.productDetails.gallery.length > 1 ? (
                    <div className="cart-item__controls__preview-buttons">
                      <div
                        className="cart-item__controls__preview-prev"
                        onClick={this.prevPreviewImage}
                      >
                        <img src={IconPrev} alt="view previous product" />
                      </div>
                      <div
                        className="cart-item__controls__preview-next"
                        onClick={this.nextPreviewImage}
                      >
                        <img src={IconNext} alt="view next product" />
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <span>Your cart is empty.</span>
        )}
      </>
    );
  }
}

export default CartItem;
