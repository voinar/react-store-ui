
// import React from 'react';
// import AppContext from '../context/AppContext';

const toggleModalOverlayMask = () => {
    this.setState({
      cartOverlayVisibility: !this.state.cartOverlayVisibility,
    });
    this.setState({
      modalOverlayMaskVisibility: !this.state.modalOverlayMaskVisibility,
    });
  };

export default toggleModalOverlayMask