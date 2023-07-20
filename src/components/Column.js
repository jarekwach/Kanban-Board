import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import Task from './Task';
import { TasksContext } from '../context/context';

const Column = function (props) {
    const { id, name, limit } = props;
    const { tasks, moveLeft, moveRight } = useContext(TasksContext);

    const taskList = tasks.map((task) => {
        if (id === task.idColumn) {
            return (
                <Task
                    key={task.id}
                    id={task.id}
                    name={task.name}
                    idColumn={task.idColumn}
                    user={task.user}
                    moveLeft={moveLeft}
                    moveRight={moveRight}
                />
            );
        }
        return null;
    });

    return (
        <div className="kanban__column column" id={id}>
            <header className="column__header">
                <h2 className="column__title">{name}</h2>
                <p className="column__limit">{limit}</p>
            </header>
            <ul className="column__tasks task">{taskList}</ul>
        </div>
    );
};

Column.propTypes = {
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    limit: PropTypes.number.isRequired,
};

export default Column;
