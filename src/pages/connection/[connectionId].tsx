import { ContactInfo } from '@/components/connections/contact-info'
import { MetaDetails } from '@/components/connections/details'
import { DetailsContext } from '@/components/connections/details-context'
import CreateUpdateConnectionDialog from '@/components/ui/create-connection'
import { useDialog } from '@/components/ui/hooks/use-dialog'
import { useRefreshData } from '@/components/ui/hooks/use-refresh-data'
import { Layout } from '@/components/ui/layout'
import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarTrigger } from '@/components/ui/menubar'
import ConnectionDeleteModal from '@/components/ui/modals/delete-modal'
import { deleteConnection } from '@/components/ui/table/table-body'
import { ConnectionLevelColumn } from '@/components/ui/table/table-columns'
import { createPagesServerClient } from '@supabase/auth-helpers-nextjs'
import { Database } from 'lib/database.types'
import { Connection } from 'lib/types'
import { ChevronLeft, MoreVertical, PencilLine, Trash } from 'lucide-react'
import { GetServerSideProps } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'

function ConnectionDetails({ connection }: { connection: Connection }) {
    const refresh = useRefreshData();
    const router = useRouter();
    const navigateBack = () => {
        router.back();
    }

    const {
        isOpen: updateOpen,
        showDialog: showUpdateDialog,
        setIsOpen: setUpdateOpen,
        entity: updateEntity
    } = useDialog<Connection>({ refresh });

    const {
        isOpen: deleteOpen,
        loading: isDeleting,
        showDialog: showDeleteDialog,
        setIsOpen: setDeleteOpen,
        entity: connectionToDelete,
        onOkFn: onDelete
    } = useDialog<Connection>({ onOk: deleteConnection, refresh: navigateBack });


    return (
        <Layout>
            <BackButton />
            <div className='mb-10'>
                <div className='bg-gray-100 w-full h-72 flex justify-end items-start p-4 hero_pattern'>
                    <section className='flex items-center gap-2'>
                        <ConnectionLevelColumn size='md' level={connection?.friendship_level ?? 0} />
                        <Menu onEditClick={showUpdateDialog} onDeleteClick={showDeleteDialog} connection={connection!} />
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
                onOk={onDelete}
                open={deleteOpen}
                onOpenChange={setDeleteOpen}
                connection={connectionToDelete!}
                isDeleting={isDeleting}
            />
        </Layout>
    )
}

function Menu({ onEditClick, onDeleteClick, connection }: {
    onEditClick: (entity: Connection) => void,
    connection: Connection,
    onDeleteClick: (entity: Connection) => void
}) {
    return (
        <Menubar onClick={e => e.stopPropagation()}>
            <MenubarMenu>
                <MenubarTrigger
                    className="p-1 hover:cursor-pointer hover:outline-gray-400 active:bg-inherit data-[state=open]:bg-inherit data-[state=open]:outline-muted data-[state=closed]:bg-inherit" onClick={e => e.stopPropagation()}
                >
                    <MoreVertical className='text-primary-foreground' />
                </MenubarTrigger>
                <MenubarContent side='bottom' align='end'>
                    <MenubarItem
                        className="text-muted-foreground"
                        icon={<PencilLine className="w-4 h-4" />}
                        onClick={() => onEditClick(connection)}
                    >
                        Edit
                    </MenubarItem>
                    <MenubarItem
                        className="bg-red-50 text-red-400 focus:bg-red-100 focus:text-red-400"
                        icon={<Trash className="w-4 h-4" />}
                        onClick={() => onDeleteClick(connection)}
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
        router.back();
    }

    return (
        <Link href='/' onClick={goBack} className='inline-flex mb-4 items-center'>
            <ChevronLeft />
            <span>Back</span>
        </Link>
    )
}


export const getServerSideProps: GetServerSideProps = async (context) => {
    const { connectionId } = context.query as { connectionId: string }
    const client = createPagesServerClient<Database>(context);
    const { data: { session } } = await client.auth.getSession()

    if (!session) {
        await client.auth.signOut();
        return {
            redirect: {
                destination: '/auth',
                permanent: false
            }
        }
    }

    const { data: connection } = await client.from('connection').select().eq('id', connectionId).single();

    return {
        props: {
            connection
        }
    }
}

export default ConnectionDetails

