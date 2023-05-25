import React from 'react';
import PropTypes from 'prop-types';

const Task = function (props) {
    // eslint-disable-next-line no-unused-vars
    const { id, name, idColumn, user, moveLeft, moveRight } = props;

    return (
        <li className="task__item">
            <header className="task__header">
                <p className="task__name">{name}</p>
                <p className="task__author">Created by {user}</p>
            </header>
            <footer className="task__buttons">
                <button className=" task__btn task__btn--left" type="button" onClick={() => moveLeft(id)}>
                    left
                </button>
                <button className="task__btn task__btn--right" type="button" onClick={() => moveRight(id)}>
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
