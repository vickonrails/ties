
import { useNavigate } from '@tanstack/react-router';
import { CellContext, ColumnDef, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { Connection } from 'lib/types';
import { ArrowUpDown, MoreVertical } from 'lucide-react';
import { ReactNode } from 'react';

function TextColumn({ getValue }: CellContext<Connection, string>) {
    const value = getValue();
    return <p className='font-medium text-gray-900'>{value}</p>
}

function LocationColumn({ getValue }: CellContext<Connection, string>) {
    const country = getValue()
    return <p>{country}</p>
}

function ConnectionLevelColumn({ getValue }: CellContext<Connection, number>) {
    const level = getValue()

    if (!level) return <p>Acquintances</p>

    switch (level) {
        case 0:
            return <p>Acquintances</p>
        case 1:
            return <p>Casual Friends</p>
        case 2:
            return <p>Close Friends</p>
        case 3:
            return <p>Intimate Friends</p>
    }
}

const columns: ColumnDef<Connection, unknown>[] = [
    {
        accessorKey: 'fullname',
        header: 'Name',
        cell: TextColumn
    },
    {
        accessorKey: 'country',
        header: 'Location',
        cell: LocationColumn
    },
    {
        accessorKey: 'timezone',
        header: 'Timezone',
        cell: (props) => <p>{props.getValue() as string}</p>
    },
    {
        accessorKey: 'friendshiplevel',
        header: 'Level',
        cell: ConnectionLevelColumn
    },
    {
        accessorKey: 'created_at',
        header: 'Added',
        cell: ({ getValue }) => <p>{getValue() as string}</p>
    }
]

// Empty state for table
const ConnectionsTable = ({ connections: data }: { connections: Connection[] }) => {
    const navigate = useNavigate()
    const table = useReactTable<Connection>({
        data,
        columns,
        getCoreRowModel: getCoreRowModel()
    })

    const navigateToConnection = (id: string) => {
        navigate({ to: '/app/$connectionId', params: { connectionId: id } })
    }

    return (
        <>
            <table className='w-full'>
                <thead>
                    <tr className='bg-blue-50'>
                        {table.getHeaderGroups().map(headerGroups => (
                            <>
                                {headerGroups.headers.map(header => (
                                    <>
                                        <th className='font-normal text-left text-sm p-3 px-4 text-gray-600'>
                                            <div className='flex items-center gap-2'>
                                                {header.column.columnDef.header as ReactNode}
                                                <ArrowUpDown className='h-4 w-4' />
                                            </div>
                                        </th>
                                    </>
                                ))}
                            </>
                        ))}
                        <th className='font-normal text-left text-sm p-3 px-4 text-gray-600'>
                            Actions
                        </th>
                    </tr>
                </thead>

                <tbody>
                    {table.getRowModel().rows.map(row => (
                        <tr
                            key={row.id}
                            onClick={_ => navigateToConnection(row.original.id)}
                            className='hover:bg-gray-100 hover:cursor-pointer transition-colors border-b border-gray-100'
                        >
                            {row.getVisibleCells().map(cell => (
                                <td key={cell.id} className='py-4 px-4 text-sm text-gray-500'>
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </td>
                            ))}

                            <td className='font-normal text-left text-sm p-3 px-4 text-gray-600'>
                                <button onClick={e => e.stopPropagation()}>
                                    <MoreVertical className='h-4 w-4' />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}

export default ConnectionsTable