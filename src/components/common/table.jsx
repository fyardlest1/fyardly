import React from 'react';
import TableHeader from "./tableHeader";
import TableBody from "./tableBody";

const Table = ({ columns, columnSort, onSort, data }) => {

    return (
        <table className='table'>
            <TableHeader 
                columns={columns}
                columnSort={columnSort}
                onSort={onSort}
                className='thead-dark'
            />
            <TableBody columns={columns} data={data} />
        </table>
    );
}

export default Table;
