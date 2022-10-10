import React from 'react';
import AppContext from '../context/AppContext';
import { Route, Routes } from 'react-router-dom';
import ProductListing from '../pages/storefront/ProductListing';
import ProductDescription from '../pages/storefront/ProductDescription';
import Cart from '../pages/storefront/Cart';

class CategoryRoutes extends React.Component {
  static contextType = AppContext;

  render() {
    return (
      <Routes>
        <Route path="/" element={<ProductListing category={'Welcome'} />} />
        {this.context.productCategories.map((category) => {
          return (
            <Route
              key={`${category.name}`}
              path={`${category.name}`}
              element={<ProductListing category={`${category.name}`} />}
            />
          );
        })}
        <Route path="/product/:productId" element={<ProductDescription />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    );
  }
}

export default CategoryRoutes;
