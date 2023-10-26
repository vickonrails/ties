import { ContactInfo } from '@/components/connections/contact-info'
import { MetaDetails } from '@/components/connections/details'
import { DetailsContext } from '@/components/connections/details-context'
import CreateUpdateConnectionDialog from '@/components/ui/create-connection'
import { useDialog } from '@/components/ui/hooks/use-dialog'
import { Layout } from '@/components/ui/layout'
import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarTrigger } from '@/components/ui/menubar'
import ConnectionDeleteModal from '@/components/ui/modals/delete-modal'
import { ConnectionLevelColumn } from '@/components/ui/table/table-columns'
import { Link, RouteProps, useRouter } from '@tanstack/react-router'
import { Connection } from 'lib/types'
import { ChevronLeft, MoreVertical, PencilLine, Trash } from 'lucide-react'

function ConnectionDetails({ useLoader }: RouteProps<{ connection: Connection }>) {
    const {
        isOpen: updateOpen,
        showDialog: showUpdateDialog,
        setIsOpen: setUpdateOpen,
        entity: updateEntity
    } = useDialog<Connection>({});

    const {
        isOpen: deleteOpen,
        showDialog: showDeleteDialog,
        setIsOpen: setDeleteOpen
    } = useDialog<Connection>({});

    const { connection } = useLoader()
    return (
        <Layout>
            <BackButton />
            <div className='mb-10'>
                <div className='bg-gray-100 w-full h-72 flex justify-end items-start p-4'>
                    <section className='flex items-center'>
                        <ConnectionLevelColumn size='md' level={connection.friendshiplevel ?? 0} />
                        <Menu onEditClick={showUpdateDialog} onDeleteClick={showDeleteDialog} connection={connection} />
                    </section>
                </div>
            </div>
            <section className='flex gap-4 h-full'>
                <MetaDetails connection={connection} />
                <DetailsContext connection={connection} />
                <ContactInfo connection={connection} />
            </section>

            <CreateUpdateConnectionDialog
                open={updateOpen}
                connection={updateEntity!}
                onOpenChange={setUpdateOpen}
            />

            <ConnectionDeleteModal
                open={deleteOpen}
                onOpenChange={setDeleteOpen}
            />
        </Layout>
    )
}


function Menu({ onEditClick, onDeleteClick, connection }: { onEditClick: (entity: Connection) => void, connection: Connection, onDeleteClick: (entity: Connection) => void }) {
    return (
        <Menubar onClick={e => e.stopPropagation()}>
            <MenubarMenu>
                <MenubarTrigger
                    className="p-1 hover:cursor-pointer outline-none hover:outline-1 hover:outline-gray-200" onClick={e => e.stopPropagation()}
                >
                    <MoreVertical className='text-muted-foreground' />
                </MenubarTrigger>
                <MenubarContent side='bottom' align='end'>
                    <MenubarItem
                        className="text-gray-600"
                        icon={<PencilLine className="w-4 h-4" />}
                        onClick={_ => onEditClick(connection)}
                    >
                        Edit
                    </MenubarItem>
                    <MenubarItem
                        className="bg-red-50 text-red-400"
                        icon={<Trash className="w-4 h-4" />}
                        onClick={_ => onDeleteClick(connection)}
                    >
                        Delete
                    </MenubarItem>
                </MenubarContent>
            </MenubarMenu>
        </Menubar>
    )
}

function BackButton() {
    const router = useRouter()
    const goBack = () => {
        router.history.back();
    }

    return (
        <Link onClick={goBack} className='inline-flex mb-4 items-center'>
            <ChevronLeft />
            <span>Back</span>
        </Link>
    )
}

export default ConnectionDetails

