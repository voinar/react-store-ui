import React from "react";
import { Link } from "react-router-dom";
import AppContext from "../context/AppContext";

import ProductCartAdd from "../assets/icon_add-to-cart.svg";

class ProductCard extends React.Component {
  static contextType = AppContext

  render() {
    return (

        <div className="product-card" key={this.props.id}>
        <Link to={`/product/${this.props.productUrl}`}>
          <img src={this.props.image} alt="product" />
          <div className="product-card__content">
            <h2 className="product-card__content-title">{this.props.name}</h2>
            <span className="product-card__content-price">
              {this.props.priceSymbol}
              {this.props.priceAmount}
            </span>
          </div>
          </Link>

          <div className="product-card__cart-add" onClick={()=>this.context.addToCartFromPLP(this.props.id)}>
            <img src={ProductCartAdd} alt="add product to cart" />
          </div>

          <div
            className={
              this.props.inStock ? "" : `${"product-card__out-of-stock"}`
            }
          >
            {this.props.inStock ? "" : <span>Out of stock</span>}
          </div>
        </div>
    );
  }
}

export default ProductCard;
