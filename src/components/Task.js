import React from 'react';
import PropTypes from 'prop-types';

const Task = function (props) {
    // eslint-disable-next-line no-unused-vars
    const { id, name, idColumn, user } = props;

    return (
        <li>
            <p>{name}</p>
            <p>{user}</p>
        </li>
    );
};

Task.propTypes = {
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    idColumn: PropTypes.number.isRequired,
    user: PropTypes.string.isRequired,
};

export default Task;
