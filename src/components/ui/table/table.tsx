
import { ColumnDef, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { Connection } from 'lib/types';
import TableBody from './table-body';
import { ConnectionLevelColumn, LocationColumn, TextColumn } from './table-columns';
import { TableHeader } from './table-header';
import { formatDate } from '@/lib/format-date';

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
        accessorKey: 'friendship_level',
        header: 'Level',
        cell: ({ getValue }) => <ConnectionLevelColumn level={getValue<number>()} />
    },
    {
        accessorKey: 'created_at',
        header: 'Added',
        cell: ({ getValue }) => <p>{formatDate(getValue<string>()) ?? '-'}</p>
    }
]

export interface TableActions<T> {
    onDelete?: (id: string) => void
    onDeleteClick?: (item: T) => void
    onEdit?: (id: string) => void
    onEditClick?: (item: T) => void
    onReachOutClick?: (item: T) => void
    onHistoryClick?: (item: T) => void
}

interface ConnectionsTableProps {
    connections: Connection[],
    loading?: boolean
}

// Empty state for table
const ConnectionsTable = ({ connections: data, loading }: ConnectionsTableProps) => {
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
                    loading={loading}
                />
            </table>
        </>
    )
}

export default ConnectionsTable