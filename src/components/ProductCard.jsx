import React from "react";
import { Link } from "react-router-dom";

import ProductCartAdd from "../assets/icon_add-to-cart.svg";

class ProductCard extends React.Component {
  render() {
    return (
      <Link to={`/product/${this.props.productUrl}` }>
        <div className="product-card" key={this.props.id}>
          <img src={this.props.image} alt="product" />
          <div className="product-card__content">
            <h2 className="product-card__content-title">{this.props.name}</h2>
            <span className="product-card__content-price">
              {this.props.priceSymbol}
              {this.props.priceAmount}
            </span>
          </div>
          <div className="product-card__cart-add">
            <img src={ProductCartAdd} alt="add product to cart" />
          </div>
          <div className="product-card__out-of-stock">
            <span>Out of stock</span>
          </div>
        </div>
      </Link>
    );
  }
}

export default ProductCard;
