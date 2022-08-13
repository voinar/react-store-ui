import React from "react";
import ProductImage from "../assets/product-image.png";
import ProductCartAdd from "../assets/icon_add-to-cart.svg";

class ProductCard extends React.Component {
  render() {
    return (
      <>
        <div className="product-card">
          <img src={this.props.obj.gallery[0]} alt="product" />
          <div className="product-card__content">
            <h2 className="product-card__content-title">{this.props.obj.name}</h2>
            <span className="product-card__content-price">
              {this.props.obj.prices[0].amount}
            </span>
          </div>
          <div className="product-card__cart-add">
            <img src={ProductCartAdd} alt="add product to cart" />
          </div>
          <div className="product-card__out-of-stock">
            <span>Out of stock</span>
          </div>
        </div>
      </>
    );
  }
}

export default ProductCard;
