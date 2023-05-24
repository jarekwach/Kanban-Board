import React from 'react';
import PropTypes from 'prop-types';

const Task = function (props) {
    // eslint-disable-next-line no-unused-vars
    const { id, name, idColumn, user, moveLeft, moveRight } = props;

    return (
        <li>
            <header>
                <p>{name}</p>
                <p>Created by {user}</p>
            </header>
            <footer>
                <button type="button" onClick={() => moveLeft(id)}>
                    left
                </button>
                <button type="button" onClick={() => moveRight(id)}>
                    right
                </button>
            </footer>
        </li>
    );
};

Task.propTypes = {
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    idColumn: PropTypes.number.isRequired,
    user: PropTypes.string.isRequired,
    moveLeft: PropTypes.func.isRequired,
    moveRight: PropTypes.func.isRequired,
};

export default Task;
