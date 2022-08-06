import React from 'react';

class ModalOverlayMask extends React.Component {
    render() {
        return <div className="modal-overlay-mask" onClick={this.props.toggleCartOverlay}></div>
    }
}

export default ModalOverlayMask