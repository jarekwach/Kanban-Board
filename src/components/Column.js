import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import Task from './Task';
import { TasksContext } from '../context/context';

const Column = function (props) {
    const { id, name, limit } = props;
    const [...tasks] = useContext(TasksContext);

    const taskList = tasks.map((task) => {
        // eslint-disable-next-line no-console
        if (id === task.idColumn) {
            return <Task key={task.id} id={task.id} name={task.name} idColumn={task.idColumn} user={task.user} />;
        }
        return null;
    });

    return (
        <div id={id}>
            <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2>{name}</h2>
                <p>{limit}</p>
            </header>
            <ul>{taskList}</ul>
        </div>
    );
};

Column.propTypes = {
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    limit: PropTypes.number.isRequired,
};

export default Column;
