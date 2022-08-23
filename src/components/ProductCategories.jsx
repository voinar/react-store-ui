import React from "react";

import { Link } from "react-router-dom";
import AppContext, { AppProvider } from "../context/AppContext";

class ProductCategories extends React.Component {
  static contextType = AppContext;

  render() {
    const { productCategories } = this.context || null;

    return (
      <>
        <div>
          {this.context.loading || !this.context.productCategories ? (
            <div>loading...</div>
          ) : (
            <div>
              <ul className="navbar-categories">
                {productCategories.categories.map((category) => {
                  return (
                    <Link key={category.name} to={`${category.name}`}>
                      <li onClick={this.context.loadProductCategory}>
                        {category.name}
                      </li>
                    </Link>
                  );
                })}
              </ul>
            </div>
          )}
        </div>
      </>
    );
  }
  componentDidMount() {
    this.context.getProductCategories();
    // console.log("mounted");
  }
}

export default ProductCategories;
