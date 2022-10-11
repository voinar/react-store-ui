import React from 'react';
import AppContext from '../context/AppContext';
import { Link } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';

class ProductCategories extends React.Component {
  static contextType = AppContext;

  render() {
    const { productCategories } = this.context;

    return (
      <>
        <div>
          {this.context.loading || !this.context.productCategories ? (
            <div>
              <LoadingSpinner />
              Choose a category
            </div>
          ) : (
            <div>
              <ul className="navbar-categories">
                {productCategories.map((category) => {
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
  }
}

export default ProductCategories;
