import React from 'react';

const ColumnsContext = React.createContext();
const TasksContext = React.createContext();

ColumnsContext.displayName = 'ColumnsContext';
TasksContext.displayName = 'TasksContext';

export { ColumnsContext, TasksContext };
