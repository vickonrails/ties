import ConnectionTableActions from "@/components/connections/table-options"
import { useNavigate } from "@tanstack/react-router"
import { Table, flexRender } from "@tanstack/react-table"
import { MoreVertical } from "lucide-react"
import CreateUpdateConnectionDialog from "../create-connection"
import { useDialog } from "../hooks/use-dialog"
import ConnectionDeleteModal from "../modals/delete-modal"
import { TableActions } from "./table"
import { Connection } from "lib/types"

const TableBody = <T extends Connection>({ table, actions }: { table: Table<T>, actions: TableActions<T> }) => {
    const { onDelete } = actions
    const { isOpen, showDialog, setIsOpen } = useDialog<Connection>({});
    const { isOpen: isEditDialogOpen, showDialog: showEditDialog, setIsOpen: setEditDialogOpen, entity } = useDialog({});

    console.log({ entity })

    const navigate = useNavigate()
    const navigateToConnection = (id: string) => {
        navigate({ to: '/app/$connectionId', params: { connectionId: id } })
    }

    return (
        <>
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
                                connection={row.original}
                                actions={{ onDelete, onDeleteClick: showDialog, onEditClick: showEditDialog }}
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
                onOpenChange={setIsOpen}
            />
        </>

    )
}

export default TableBody