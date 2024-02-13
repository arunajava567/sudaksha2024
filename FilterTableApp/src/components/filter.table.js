// src/components/filter.table.js
import React from "react";

import { useTable, useFilters, useGlobalFilter, useAsyncDebounce } from 'react-table'
import 'bootstrap/dist/css/bootstrap.min.css';


// Define a default UI for filtering
function GlobalFilter({
    preGlobalFilteredRows,
    globalFilter,
    setGlobalFilter,
}) {
    const count = preGlobalFilteredRows.length
    const [value, setValue] = React.useState(globalFilter)
    const onChange = useAsyncDebounce(value => {
        setGlobalFilter(value || undefined)
    }, 200)

    return (
        <span>
            Search:{' '}
            <input
                className="form-control"
                value={value || ""}
                onChange={e => {
                    setValue(e.target.value);
                    onChange(e.target.value);
                }}
                placeholder={`${count} records...`}
            />
        </span>
    )
}

function DefaultColumnFilter({
    column: { filterValue, preFilteredRows, setFilter },
}) {
    const count = preFilteredRows.length

    return (
        <input
            className="form-control"
            value={filterValue || ''}
            onChange={e => {
                setFilter(e.target.value || undefined)
            }}
            placeholder={`Search ${count} records...`}
        />
    )
}

function Table({ columns, data }) {

    const defaultColumn = React.useMemo(
        () => ({
            // Default Filter UI
            Filter: DefaultColumnFilter,
        }),
        []
    )

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        state,
        preGlobalFilteredRows,
        setGlobalFilter,
    } = useTable(
        {
            columns,
            data,
            defaultColumn
        },
        useFilters,
        useGlobalFilter
    )

    return (
        <div>
            <GlobalFilter
                preGlobalFilteredRows={preGlobalFilteredRows}
                globalFilter={state.globalFilter}
                setGlobalFilter={setGlobalFilter}
            />
            <table className="table" {...getTableProps()}>
                <thead>
                    {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column => (
                                <th {...column.getHeaderProps()}>
                                    {column.render('Header')}
                                    {/* Render the columns filter UI */}
                                    <div>{column.canFilter ? column.render('Filter') : null}</div>
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {rows.map((row, i) => {
                        prepareRow(row)
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map(cell => {
                                    return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                })}
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            <br />
            <div>Showing the first 20 results of {rows.length} rows</div>
            <div>
                <pre>
                    <code>{JSON.stringify(state.filters, null, 2)}</code>
                </pre>
            </div>
        </div>
    )
}



function FilterTableComponent() {
    const columns = React.useMemo(
        () => [
            {
                Header: 'Name',
                columns: [
                    {
                        Header: 'Book Id',
                        accessor: 'id',
                    },
                    {
                        Header: 'Book Title',
                        accessor: 'title'
                    },
                ],
            },
            {
                Header: 'Info',
                columns: [
                    {
                        Header: 'Book Author',
                        accessor: 'author'
                    },
                    {
                        Header: 'Book Year Of Publish',
                        accessor: 'year'
                    }
                  
                ],
            },
        ],
        []
    )

    const data = [
        {
            "id": "101",
            "title": "Java",
            "author": "sam",
            "year": 1995
            
        },
        {
            "id": "102",
            "title": "React",
            "author": "john",
            "year": 1994
            
        },
        {
            "id": "103",
            "title": "REDUX",
            "author": "smith",
            "year": 1991
            
        },
        {
            "id": "104",
            "title": "Postgres",
            "author": "Joy",
            "year": 1989
           
        },
        {
            "id": "105",
            "title": "Bootstrap",
            "author": "Peter",
            "year": 1988
           
        },
        {
            "id": "106",
            "title": "HTML",
            "author": "Arun",
            "year": 1999
           
        }
    ]

    return (
        <Table columns={columns} data={data} />
    )
}

export default FilterTableComponent;