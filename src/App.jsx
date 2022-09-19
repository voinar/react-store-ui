import React from 'react';
import AppContext, { AppProvider } from './context/AppContext';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import axios from 'axios';

import Navbar from './components/Navbar';
import ProductListing from './pages/storefront/ProductListing';
import ProductDescription from './pages/storefront/ProductDescription';
import Cart from './pages/storefront/Cart';
import LoadingSpinner from './components/LoadingSpinner';

import { serverUrl }  from './graphql/Queries'

import './styles/style.css';

class App extends React.Component {
  static contextType = AppContext;

  state = {
    loading: true,
    productCategories: [],
  };

  getProductCategories = () => {
    try {
      axios({
        url: serverUrl,
        method: 'POST',
        data: {
          query: `
          query GET_CATEGORIES {
            categories {
              name
            }
          }
          `,
        },
      }).then((result) => {
        this.setState({
          loading: false,
          productCategories: result.data.data.categories,
        });
      });
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    return (
      <>
        {this.state.loading === true ? (
          <LoadingSpinner />
        ) : (
          <AppProvider>
            <BrowserRouter>
              <Navbar />
              <Routes>
                <Route
                  path="/"
                  element={<ProductListing category={'Welcome'} />}
                />
                {this.state.productCategories.map((category) => {
                  return (
                    <Route
                      key={`${category.name}`}
                      path={`${category.name}`}
                      element={<ProductListing category={`${category.name}`} />}
                    />
                  );
                })}
                <Route
                  path="/product/:productId"
                  element={<ProductDescription />}
                />
                <Route path="/cart" element={<Cart />} />
              </Routes>
            </BrowserRouter>
          </AppProvider>
        )}
      </>
    );
  }

  componentDidMount() {
    this.getProductCategories();
  }
}

export default App;
