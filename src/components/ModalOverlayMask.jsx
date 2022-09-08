import React from 'react';
import AppContext from "../context/AppContext";

class ModalOverlayMask extends React.Component {
    static contextType = AppContext

    render() {
        return <>
            <div className="modal-overlay-mask" onClick={this.context.toggleModalOverlayMask}/>
        </>
    }
}

export default ModalOverlayMask