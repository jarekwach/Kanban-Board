/* eslint-disable no-unused-vars */
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import Board from './Board';
import Form from './Form';

// eslint-disable-next-line no-unused-vars
import { initialColumns, initialTasks } from '../initialData';
import { ColumnsContext, TasksContext } from '../context/context';
import taskFormFields from '../taskFormFields';
import formValidation from '../formValidation';
import useStorage from '../hooks';

const App = function () {
    const [getItem, setItem] = useStorage();

    const columnsFromLocalStorage = getItem('columns');
    const tasksFromLocalStorage = getItem('tasks');

    if (columnsFromLocalStorage === null) {
        setItem('columns', initialColumns);
    }

    if (tasksFromLocalStorage === null) {
        setItem('tasks', initialTasks);
    }
    const [columns, setColumns] = useState(columnsFromLocalStorage);
    const [tasks, setTasks] = useState(tasksFromLocalStorage);
    const [formErrors, setFormErrors] = useState([]);

    // useEffect(() => {
    //     setItem('columns', columns);
    //     setItem('tasks', tasks);
    // });

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const handleLimitColumn = (idColumn) => {
        const getColumnLimit = () => {
            const columnLimit = columns.find((column) => column.id === idColumn);
            return columnLimit.limit;
        };

        const getNumberOfTasksInColumn = () => {
            const numberOfTasksInColumn = tasks.filter((task) => task.idColumn === idColumn);
            return numberOfTasksInColumn.length;
        };

        if (getColumnLimit(idColumn) > getNumberOfTasksInColumn(idColumn)) {
            return true;
        }
        return false;
    };

    const moveLeft = useCallback(
        (id) => {
            const taskToUpdate = tasks.map((task) => {
                if (id === task.id) {
                    const prevColumn = task.idColumn - 1;

                    if (task.idColumn > 1 && handleLimitColumn(prevColumn)) {
                        return { ...task, idColumn: task.idColumn - 1 };
                    }
                }
                return task;
            });
            setTasks(taskToUpdate);
        },
        [tasks, handleLimitColumn],
    );

    const moveRight = useCallback(
        (id) => {
            const taskToUpdate = tasks.map((task) => {
                if (id === task.id) {
                    const nextColumn = task.idColumn + 1;

                    if (task.idColumn < columns.length && handleLimitColumn(nextColumn)) {
                        return { ...task, idColumn: task.idColumn + 1 };
                    }
                }
                return task;
            });
            setTasks(taskToUpdate);
        },
        [tasks, columns, handleLimitColumn],
    );

    const tasksOptions = useMemo(
        () => ({
            tasks,
            moveLeft,
            moveRight,
        }),
        [tasks, moveLeft, moveRight],
    );

    const handleAddTask = (e) => {
        e.preventDefault();
        const [taskName, userName] = e.target.elements;
        const nextId = tasks.length + 1;
        const newTask = { id: nextId, name: taskName.value, idColumn: 1, user: userName.value };
        const errors = formValidation(newTask, taskFormFields);

        if (errors.length === 0) {
            if (handleLimitColumn(newTask.idColumn)) {
                setTasks([...tasks, newTask]);
                setFormErrors([]);
                taskName.value = '';
                userName.value = '';
            }
        }
        setFormErrors(errors);
    };

    return (
        <ColumnsContext.Provider value={columns}>
            <TasksContext.Provider value={tasksOptions}>
                <section>
                    <h1>Kanban Board</h1>
                    <Form fields={taskFormFields} onSubmit={handleAddTask} formErrors={formErrors} />
                    <Board />
                </section>
            </TasksContext.Provider>
        </ColumnsContext.Provider>
    );
};

export default App;
