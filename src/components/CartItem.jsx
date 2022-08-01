import React from "react";
import ProductImage from "../assets/product-image.png";
import IconPrev from "../assets/icon_prev.svg";
import IconNext from "../assets/icon_next.svg";
import IconPlusSquare from "../assets/icon_plus-square.svg";
import IconMinusSquare from "../assets/icon_minus-square.svg";

class CartItem extends React.Component {
  render() {
    return (
      <div className="cart-item">
        <hr />
        <div className="cart-item__contents">
          <div className="product-description__attributes">
            <div className="product-description__attribute-name">
              <span>Apollo</span>
            </div>
            <div className="product-description__attribute-type">
              <span>Running Short</span>
            </div>
            <div className="product-description__attributes-price">
              <span className="product-description__attributes-price-amount">
                $50.00
              </span>
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
              <img src={ProductImage} alt="product preview" />
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
    );
  }
}

export default CartItem;
