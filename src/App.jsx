import React from 'react';
import AppContext, { AppProvider } from './context/AppContext';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import axios from 'axios';

import Navbar from './components/Navbar';
import CategoryRoutes from './components/CategoryRoutes';
import ProductListing from './pages/storefront/ProductListing';
import ProductDescription from './pages/storefront/ProductDescription';
import Cart from './pages/storefront/Cart';
import LoadingSpinner from './components/LoadingSpinner';

import { serverUrl } from './graphql/Queries';

import './styles/style.css';

class App extends React.Component {
  static contextType = AppContext;

  render() {
    return (
      <>
        <AppProvider>
          <BrowserRouter>
            <Navbar />
            <CategoryRoutes />
          </BrowserRouter>
        </AppProvider>
      </>
    );
  }
}

export default App;
