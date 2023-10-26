
import { ColumnDef, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { Connection } from 'lib/types';
import TableBody from './table-body';
import { ConnectionLevelColumn, LocationColumn, TextColumn } from './table-columns';
import { TableHeader } from './table-header';

const columns: ColumnDef<Connection, JSX.Element>[] = [
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
        cell: ({ getValue }) => <p>{getValue<string>()?.toUpperCase()}</p>
    },
    {
        accessorKey: 'friendshiplevel',
        header: 'Level',
        cell: ({ getValue }) => <ConnectionLevelColumn level={getValue<number>()} />
    },
    {
        accessorKey: 'created_at',
        header: 'Added',
        cell: ({ getValue }) => <p>{getValue() ?? '-'}</p>
    }
]

export interface TableActions<T> {
    onDelete?: (id: string) => void
    onDeleteClick?: (item: T) => void
    onEdit?: (id: string) => void
    onEditClick?: (item: T) => void
}

interface ConnectionsTableProps<T> {
    connections: Connection[],
    actions: TableActions<T>
}

// Empty state for table
const ConnectionsTable = ({ connections: data, actions }: ConnectionsTableProps<Connection>) => {
    const table = useReactTable<Connection>({
        data,
        columns,
        getCoreRowModel: getCoreRowModel()
    })

    return (
        <>
            <table className='w-full'>
                <TableHeader
                    table={table}
                />
                <TableBody<Connection>
                    table={table}
                    actions={actions}
                />
            </table>
        </>
    )
}

export default ConnectionsTable