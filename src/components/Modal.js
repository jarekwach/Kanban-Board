import React from 'react';
import PropTypes from 'prop-types';

function Modal(props) {
    const { onClose, text } = props;

    return (
        <div className="kanban__modal modal">
            <div className="modal__item">
                <button className="modal__btn" type="button" onClick={onClose}>
                    X
                </button>
                <h2 className="modal__text">{text}</h2>
            </div>
        </div>
    );
}

Modal.propTypes = {
    onClose: PropTypes.func.isRequired,
    text: PropTypes.string.isRequired,
};

export default Modal;
