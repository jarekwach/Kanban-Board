const initialColumns = [
    { id: 1, name: 'To do', limit: 4 },
    { id: 2, name: 'In progress', limit: 3 },
    { id: 3, name: 'In tests', limit: 2 },
    { id: 4, name: 'Done', limit: 4 },
];

const initialTasks = [
    { id: 1, name: 'Task1', idColumn: 2, user: 'Jarek' },
    { id: 2, name: 'Task2', idColumn: 3, user: 'Patryk' },

];

export { initialColumns, initialTasks };
