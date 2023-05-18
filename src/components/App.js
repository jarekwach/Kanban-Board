import React from 'react';
import Board from './Board';

import { initialColumns, initialTasks } from '../initialData';
import { ColumnsContext, TasksContext } from '../context/context';

const App = function () {
    const columns = initialColumns;
    const tasks = initialTasks;

    return (
        <ColumnsContext.Provider value={columns}>
            <TasksContext.Provider value={tasks}>
                <section>
                    <h1>Kanban Board</h1>
                    <Board />
                </section>
            </TasksContext.Provider>
        </ColumnsContext.Provider>
    );
};

export default App;
