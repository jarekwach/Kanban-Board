/* eslint-disable no-unused-vars */
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import Board from './Board';
import Form from './Form';
import Modal from './Modal';
import { initialColumns, initialTasks } from '../initialData';
import { ColumnsContext, TasksContext } from '../context/context';
import taskFormFields from '../taskFormFields';
import columnFormFields from '../columnFormFields';
import formValidation from '../formValidation';
import useStorage from '../hooks';
import '../styles/css/reset.css';
import '../styles/css/main.css';

const Kanban = function () {
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
    const [taskFormErrors, setTaskFormErrors] = useState([]);
    const [columnFormErrors, setColumnFormErrors] = useState([]);
    const [taskFormDisplay, setTaskFormDisplay] = useState('none');
    const [columnFormDisplay, setColumnFormDisplay] = useState('none');
    const [limitError, setLimitError] = useState(false);

    useEffect(() => {
        setItem('columns', columns);
        setItem('tasks', tasks);
    });

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

        setLimitError(true);
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
                setTaskFormErrors([]);
                taskName.value = '';
                userName.value = '';
                setTaskFormDisplay('none');
            }
            setTaskFormDisplay('none');
        }
        setTaskFormErrors(errors);
    };

    const handleAddColumn = (e) => {
        e.preventDefault();
        const [columnName, columnLimit] = e.target.elements;
        const nextId = columns.length + 1;
        const newColumn = { id: nextId, name: columnName.value, limit: parseFloat(columnLimit.value) };
        const errors = formValidation(newColumn, columnFormFields);

        if (errors.length === 0) {
            setColumns([...columns, newColumn]);
            setColumnFormErrors([]);
            columnName.value = '';
            columnLimit.value = '';
            setColumnFormDisplay('none');
        }
        setColumnFormErrors(errors);
    };

    const renderLimitError = () => {
        if (limitError) {
            return <Modal onClose={() => setLimitError(false)} text="Colum is full!" />;
        }
        return null;
    };

    return (
        <ColumnsContext.Provider value={columns}>
            <TasksContext.Provider value={tasksOptions}>
                <section className="kanban">
                    <header className="kanban__header header">
                        <h1 className="header__title">Kanban Board</h1>
                        <div className="header__buttons">
                            <button
                                className="header__btn"
                                onClick={() => {
                                    setTaskFormDisplay('flex');
                                    setColumnFormDisplay('none');
                                    setTaskFormErrors([]);
                                }}
                                type="button"
                            >
                                New task
                            </button>
                            <button
                                className="header__btn"
                                onClick={() => {
                                    setTaskFormDisplay('none');
                                    setColumnFormDisplay('flex');
                                    setColumnFormErrors([]);
                                }}
                                type="button"
                            >
                                New column
                            </button>
                        </div>
                    </header>
                    <section className="kanban__form">
                        <Form
                            formName="Add task"
                            fields={taskFormFields}
                            onSubmit={handleAddTask}
                            formErrors={taskFormErrors}
                            display={taskFormDisplay}
                            closeForm={() => setTaskFormDisplay('none')}
                        />
                        <Form
                            formName="Add column"
                            fields={columnFormFields}
                            onSubmit={handleAddColumn}
                            formErrors={columnFormErrors}
                            display={columnFormDisplay}
                            closeForm={() => setColumnFormDisplay('none')}
                        />
                    </section>
                    <Board />
                    {renderLimitError()}
                </section>
            </TasksContext.Provider>
        </ColumnsContext.Provider>
    );
};

export default Kanban;
