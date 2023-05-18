const initialColumns = [
    { id: 1, name: 'To do', limit: 4 },
    { id: 2, name: 'In progress', limit: 3 },
    { id: 3, name: 'In tests', limit: 2 },
    { id: 4, name: 'Done', limit: 4 },
];

const initialTasks = [
    { id: 1, name: 'Task1', idColumn: 1, user: 'Jarek' },
    { id: 2, name: 'Task2', idColumn: 3, user: 'Patryk' },
    { id: 3, name: 'Task3', idColumn: 1, user: 'Adam' },
    { id: 4, name: 'Task4', idColumn: 2, user: 'Jan' },
    { id: 5, name: 'Task5', idColumn: 4, user: 'Marek' },
    { id: 6, name: 'Task6', idColumn: 3, user: 'Michał' },
];

export { initialColumns, initialTasks };
