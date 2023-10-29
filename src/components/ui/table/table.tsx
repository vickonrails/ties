
import { ColumnDef, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { Connection } from 'lib/types';
import TableBody from './table-body';
import { ConnectionLevelColumn, LocationColumn, TextColumn } from './table-columns';
import { TableHeader } from './table-header';
import { formatDate } from '@/lib/format-date';
import Image from 'next/image';
import emptySrc from '@/assets/empty.svg'

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
        cell: ({ getValue }) => <p>{getValue<string>()?.toUpperCase() ?? '-'}</p>
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

    const isEmpty = data.length === 0

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

            {isEmpty && (
                <div className='text-center flex flex-col gap-6 items-center mt-16'>
                    <Image src={emptySrc} width={400} height={400} alt='' />
                    <p className='text-muted-foreground'>You've got no connections. Try creating some.</p>
                </div>
            )}
        </>
    )
}

export default ConnectionsTable