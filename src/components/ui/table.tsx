
import { cn } from '@/lib/utils';
import { useNavigate } from '@tanstack/react-router';
import { CellContext, ColumnDef, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { Connection } from 'lib/types';
import { ArrowUpDown, MoreVertical } from 'lucide-react';
import { ReactNode } from 'react';
import ConnectionTableActions from '../connections/table-options';
import { ConnectionAvatar } from './avatar';

function TextColumn({ getValue }: CellContext<Connection, string>) {
    const value = getValue();
    return (
        <div className='font-medium text-gray-900 flex items-center gap-2'>
            <ConnectionAvatar fullname={value} size='xs' />
            <p>{value ?? '-'}</p>
        </div>
    )
}

function LocationColumn({ getValue }: CellContext<Connection, string>) {
    const country = getValue()
    return <p>{country ?? '-'}</p>
}

function Dot({ className }: { className: string }) {
    return (
        <span className={cn('h-2 w-2 block  rounded-full', className)} />
    )
}

// TODO: settle on more colors
// TODO: refactor this component to avoid duplication
function ConnectionLevelColumn({ getValue }: CellContext<Connection, number>) {
    const baseClasses = 'text-xs border p-1 px-2 rounded-sm inline-flex items-center gap-2'
    const level = getValue()
    switch (level) {
        case 0:
            return (
                <div className={cn(baseClasses)}>
                    <Dot className='bg-purple-400' />
                    <p className='uppercase'>Acquaintance</p>
                </div>
            )
        case 1:
            return (
                <div className={cn(baseClasses)}>
                    <Dot className='bg-blue-400' />
                    <p className='uppercase'>Casual Friends</p>
                </div>
            )

        case 2:
            return (
                <div className={cn(baseClasses)}>
                    <Dot className='bg-green-400' />
                    <p className='uppercase'>Close Friends</p>
                </div>
            )

        case 3:
            return (
                <div className={cn(baseClasses)}>
                    <Dot className='bg-red-400' />
                    <p className='uppercase'>Intimate Friends</p>
                </div>
            )
    }

    return (
        <div className={cn(baseClasses)}>
            <Dot className='bg-purple-400' />
            <p className='uppercase'>Acquaintance</p>
        </div>
    )
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
        cell: (props) => <p>{props.getValue() as string ?? '-'}</p>
    },
    {
        accessorKey: 'friendshiplevel',
        header: 'Level',
        cell: ConnectionLevelColumn
    },
    {
        accessorKey: 'created_at',
        header: 'Added',
        cell: ({ getValue }) => <p>{getValue() as string ?? '-'}</p>
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
                                    <th className='font-normal text-left text-sm p-3 px-4 text-gray-600' key={header.id}>
                                        <div className='flex items-center gap-2'>
                                            {header.column.columnDef.header as ReactNode}
                                            <ArrowUpDown className='h-4 w-4' />
                                        </div>
                                    </th>
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
                            className='hover:bg-gray-100 hover:cursor-pointer transition-colors border border-t-0 border-gray-100'
                        >
                            {row.getVisibleCells().map(cell => (
                                <td key={cell.id} className='py-4 px-4 text-sm text-gray-500'>
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </td>
                            ))}
                            <td className='font-normal text-left text-sm p-3 px-4 text-gray-600'>
                                <ConnectionTableActions
                                    trigger={
                                        <MoreVertical className='h-4 w-4' />
                                    }
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}

export default ConnectionsTable