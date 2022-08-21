import React from "react";

import { Link } from "react-router-dom";

class ProductCategories extends React.Component {
  render() {
    const { categories } = this.props || null;
    return (
      <>
        <div>
          {this.props.loading || !this.props.categories ? (
            <div>loading...</div>
          ) : (
            <div>
              <ul className="navbar-categories">
                {categories.categories.map((obj) => {
                  return (
                    <Link key={obj.name} to={`${obj.name}`}>
                      <li onClick={this.props.loadProducts}>{obj.name}</li>
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
}

export default ProductCategories;
