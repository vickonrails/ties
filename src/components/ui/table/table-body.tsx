import ConnectionTableActions from "@/components/connections/table-options"
import { SupabaseClient } from "@supabase/supabase-js"
import { Table, flexRender } from "@tanstack/react-table"
import { Database } from "lib/database.types"
import { Connection } from "lib/types"
import { MoreVertical } from "lucide-react"
import { useRouter } from "next/router"
import CreateUpdateConnectionDialog from "../create-connection"
import { useDialog } from "../hooks/use-dialog"
import { useRefreshData } from "../hooks/use-refresh-data"
import ConnectionHistoryModal from "../modals/connection-history-modal"
import ConnectionDeleteModal from "../modals/delete-modal"
import ReachOutModal from "../modals/reachout-modal"

export async function deleteConnection(client: SupabaseClient<Database>, id: string) {
    return (await client.from('connection').delete().eq('id', id)).data;
}

const TableBody = <T extends Connection>({ table, loading }: { table: Table<T>, loading?: boolean }) => {
    const refresh = useRefreshData()
    const { isOpen, loading: isDeleting, showDialog, setIsOpen, entity: connectionToDelete, onOkFn: onDelete } = useDialog<Connection>({ onOk: deleteConnection, refresh });
    const { isOpen: isEditDialogOpen, showDialog: showEditDialog, setIsOpen: setEditDialogOpen, entity } = useDialog<Connection>({});
    const { isOpen: reachOutOpen, showDialog: showReachOutDialog, setIsOpen: setReachOutDialogOpen, entity: reachOutConnection } = useDialog<Connection>({});
    const { isOpen: historyDialogOpen, showDialog: showHistoryDialog, setIsOpen: setHistoryDialogOpen, entity: historyDialogEntity } = useDialog<Connection>({});

    const router = useRouter()
    const navigateToConnection = (id: string) => {
        router.push(`/connection/${id}`);
    }

    if (loading) {
        return <LoadingState table={table} />
    }

    return (
        <>
            <tbody>
                {table.getRowModel().rows.map(row => (
                    <tr
                        key={row.id}
                        onClick={() => navigateToConnection(row.original.id)}
                        className='hover:bg-gray-100 hover:cursor-pointer transition-colors border border-t-0 border-gray-100'
                    >
                        {row.getVisibleCells().map(cell => (
                            <td key={cell.id} className='p-3 text-sm text-gray-500'>
                                {loading ? 'loading...' :
                                    <div>{flexRender(cell.column.columnDef.cell, cell.getContext())}</div>
                                }
                            </td>
                        ))}
                        <td className='font-normal text-left text-sm p-2 text-gray-600'>
                            <ConnectionTableActions
                                connection={row.original}
                                actions={{ onDelete, onDeleteClick: showDialog, onEditClick: showEditDialog, onReachOutClick: showReachOutDialog, onHistoryClick: showHistoryDialog }}
                                trigger={
                                    <MoreVertical className='h-4 w-4' />
                                }
                            />
                        </td>
                    </tr>
                ))}
            </tbody>

            <CreateUpdateConnectionDialog
                open={isEditDialogOpen}
                connection={entity!}
                onOpenChange={setEditDialogOpen}
            />

            <ConnectionDeleteModal
                open={isOpen}
                connection={connectionToDelete!}
                onOpenChange={setIsOpen}
                onOk={onDelete}
                isDeleting={isDeleting}
            />

            <ReachOutModal
                open={reachOutOpen}
                onOpenChange={setReachOutDialogOpen}
                connection={reachOutConnection!}
            />

            <ConnectionHistoryModal
                open={historyDialogOpen}
                onOpenChange={setHistoryDialogOpen}
                connection={historyDialogEntity!}
            />
        </>

    )
}

function LoadingState<T>({ table }: { table: Table<T> }) {
    return (
        <tbody>
            {table.getHeaderGroups().map(headerGroups => (
                <>
                    {headerGroups.headers.map(header => (
                        <th className='font-normal text-left text-sm p-3 px-4 text-gray-600' key={header.id}>
                            Loading...
                        </th>
                    ))}
                </>
            ))}
        </tbody>
    )
}

export default TableBody