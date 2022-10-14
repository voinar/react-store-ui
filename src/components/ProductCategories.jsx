import React from 'react';
import AppContext from '../context/AppContext';
import { Link } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';

class ProductCategories extends React.Component {
  static contextType = AppContext;

  render() {
    const { productCategories } = this.context;

    const loadProductCategory = () => {
      this.context.contextReducer(this.state, {
        type: 'LOAD_PRODUCT_CATEGORY',
      });
    };

    return (
      <>
        <div>
          {this.context.loading || !this.context.productCategories ? (
            <div>
              <LoadingSpinner />
            </div>
          ) : (
            <div>
              <ul className="navbar-categories">
                {productCategories.map((category) => {
                  return (
                    <Link key={category.name} to={`${category.name}`}>
                      <li onClick={loadProductCategory}>{category.name}</li>
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
    this.context.contextReducer(this.state, {
      type: 'GET_PRODUCT_CATEGORIES',
    });
  }
}

export default ProductCategories;
