import React from "react";
import ProductCard from "../../components/ProductCard";
// import { data } from '../../data/data.js'
import Products from "../../components/Products";

// const ProductsListLocalData = data.map((obj) => <ProductCard {...obj} key={obj.count} />)

class ProductListing extends React.Component {
  render() {


    return (
      <div className="product-listing section-container">
        <header>
          <h1>{this.props.category}</h1>
        </header>

        <div className="product-listing__cards-container">
          {/* {ProductsListLocalData} */}
          <Products
            category={this.props.category}
            categoryIndex={this.props.categoryIndex}
            loadProducts={this.props.loadProducts}
          />
        </div>
      </div>
    );
  }
}

export default ProductListing;
