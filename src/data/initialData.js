const initialColumns = [
    { id: 1, name: 'To do', limit: 4 },
    { id: 2, name: 'In progress', limit: 3 },
    { id: 3, name: 'In tests', limit: 2 },
    { id: 4, name: 'Done', limit: 4 },
];

const initialTasks = [
    { id: 1, name: 'Task 1', idColumn: 1, user: 'Jarek' },
    { id: 2, name: 'Task 2', idColumn: 1, user: 'Patryk' },
    { id: 3, name: 'Task 3', idColumn: 1, user: 'Max' },
];

export { initialColumns, initialTasks };
