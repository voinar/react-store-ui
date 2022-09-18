import React from 'react';

class LoadingSpinner extends React.Component {
  render() {
    return (
      <div className="loading-spinner__container">
        <div className="loading-spinner">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    );
  }

  componentDidMount() {}
}

export default LoadingSpinner;
