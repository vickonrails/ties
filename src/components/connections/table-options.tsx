import { HeartHandshake, History, PencilLine, Trash } from "lucide-react"
import { ReactNode } from "react"
import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarSeparator, MenubarTrigger } from "../ui/menubar"
import { TableActions } from "../ui/table/table"
import { Connection } from "lib/types"

interface ConnectionTableActionsProps<T> {
    trigger: ReactNode,
    actions: TableActions<T>
    connection: T
}

const ConnectionTableActions = ({ trigger, actions = {}, connection }: ConnectionTableActionsProps<Connection>) => {
    const { onDeleteClick, onEditClick, onReachOutClick, onHistoryClick } = actions

    return (
        <Menubar onClick={e => e.stopPropagation()}>
            <MenubarMenu>
                <MenubarTrigger
                    className="p-1 hover:cursor-pointer outline-none hover:outline-1 hover:outline-gray-200" onClick={e => e.stopPropagation()}
                >
                    {trigger}
                </MenubarTrigger>
                <MenubarContent align="end">
                    <MenubarItem
                        className="text-muted-foreground"
                        icon={<PencilLine className="w-4 h-4" />}
                        onClick={() => onEditClick?.(connection)}
                    >
                        Edit
                    </MenubarItem>
                    <MenubarItem
                        className="text-muted-foreground"
                        icon={<History className="w-4 h-4" />}
                        onClick={() => onHistoryClick?.(connection)}
                    >
                        Show History
                    </MenubarItem>
                    <MenubarItem
                        className="text-muted-foreground"
                        icon={<HeartHandshake className="w-4 h-4" />}
                        onClick={() => onReachOutClick?.(connection)}
                    >
                        Reachout
                    </MenubarItem>
                    <MenubarSeparator />
                    <MenubarItem
                        className="bg-red-50 text-red-400 focus:bg-red-100 focus:text-red-400"
                        icon={<Trash className="w-4 h-4" />}
                        onClick={() => onDeleteClick?.(connection)}
                    >
                        Delete
                    </MenubarItem>
                </MenubarContent>
            </MenubarMenu>
        </Menubar>
    )
}

export default ConnectionTableActions