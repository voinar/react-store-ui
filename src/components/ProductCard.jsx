import React from 'react';
import ProductImage from '../assets/product-image.png';
import ProductCartAdd from '../assets/icon_add-to-cart.svg';

class ProductCard extends React.Component {
    render() {
        return <>
        <div className="product-card">
            {/* <img src={ProductImage} alt="product" /> */}
            <img src={this.props.img} alt="product" />
            <div className="product-card__content">
                {/* <h2 className="product-listing__content-title">Apollo Running Short</h2> */}
                <h2 className="product-card__content-title">{this.props.name}</h2>
                <span className="product-card__content-price">$50.00</span>
            </div>
            <div className="product-card__cart-add">
                <img src={ProductCartAdd} alt="add product to cart" />
            </div>
            <div className="product-card__out-of-stock">
                <span>Out of stock</span>
            </div>
        </div>
        </>
    }
}

export default ProductCard;