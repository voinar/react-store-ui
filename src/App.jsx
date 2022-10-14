import React from 'react';
import AppContext, { AppProvider } from './context/AppContext';
import { BrowserRouter } from 'react-router-dom';

import Navbar from './components/Navbar';
import CategoryRoutes from './components/CategoryRoutes';

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
