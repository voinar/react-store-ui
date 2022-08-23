import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";

import { GET_CATEGORIES } from "./graphql/Queries";

import "./styles/style.css";

import Navbar from "./components/Navbar";
import ProductListing from "./pages/storefront/ProductListing";
import ProductDescription from "./pages/storefront/ProductDescription";
import Cart from "./pages/storefront/Cart";
import Counter from "./components/Counter";

import context from "./context/AppContext";
import AppContext, { AppProvider } from "./context/AppContext";

class App extends React.Component {
  static contextType = AppContext;

  state = {
    loading: true,
    productCategories: {
      categories: [],
    },
    categoryIndex: 0,
  };


  getCategories = async () => {
    try {
      const query = await axios({
        url: "http://localhost:4000",
        method: "POST",
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
          productCategories: result.data.data,
        });
      });
    } catch (err) {
      console.log(err);
    }
  };

  render() {

    return (
      <>
        <AppProvider>
          <BrowserRouter>
            <Navbar
              // handleCurrencyChange={this.handleCurrencyChange}
            />
            {/* <Counter /> */}
            <Routes>
              <Route
                path="/"
                element={
                  <ProductListing
                    category={''}
                  />
                }
              />
              {this.state.productCategories.categories.map((category) => {
                return (
                  <Route
                    key={`${category.name}`}
                    path={`${category.name}`}
                    element={
                      <ProductListing
                        category={`${category.name}`}
                      />
                    }
                  />
                );
              })}
              {/* <Route
              path="/product/description"
              element={<ProductDescription />}
            /> */}
              <Route
                path="/product/:productId"
                element={<ProductDescription />}
              />
              <Route path="/cart" element={<Cart />} />
            </Routes>
            {/* <div>
          {this.state.loading || !this.state.categories ? (
            <div>loading...</div>
          ) : (
            <div>
              <ul>
                {categories.categories.map(obj => {
                  return (
                      <li key={obj.name}>{obj.name}</li>
                  );
                })}
              </ul>
            </div>
          )}
        </div> */}
          </BrowserRouter>
        </AppProvider>
      </>
    );
  }

  componentDidMount() {
    this.getCategories();
    // this.context.getProductCategories();
  }

}

export default App;
