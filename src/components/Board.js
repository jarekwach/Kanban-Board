import React, { useContext } from 'react';
import Column from './Column';
import { ColumnsContext } from '../context/context';

const Board = function () {
    const [...columns] = useContext(ColumnsContext);

    const columnList = columns.map((column) => {
        const { id, name, limit } = column;

        return <Column key={id} name={name} id={id} limit={limit} />;
    });

    return <main style={{ display: 'flex', justifyContent: 'space-evenly' }}>{columnList}</main>;
};

export default Board;
