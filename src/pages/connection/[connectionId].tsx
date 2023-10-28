import { ContactInfo } from '@/components/connections/contact-info'
import { MetaDetails } from '@/components/connections/details'
import { DetailsContext } from '@/components/connections/details-context'
import CreateUpdateConnectionDialog from '@/components/ui/create-connection'
import { useDialog } from '@/components/ui/hooks/use-dialog'
import { Layout } from '@/components/ui/layout'
import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarTrigger } from '@/components/ui/menubar'
import ConnectionDeleteModal from '@/components/ui/modals/delete-modal'
import { DeleteConnection } from '@/components/ui/table/table-body'
import { ConnectionLevelColumn } from '@/components/ui/table/table-columns'
import { createPagesServerClient } from '@supabase/auth-helpers-nextjs'
import { Database } from 'lib/database.types'
import { Connection, ReachOut } from 'lib/types'
import { ChevronLeft, MoreVertical, PencilLine, Trash } from 'lucide-react'
import { GetServerSideProps } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'

function ConnectionDetails({ connection, reachOuts }: { connection: Connection, reachOuts: ReachOut[] }) {
    const {
        isOpen: updateOpen,
        showDialog: showUpdateDialog,
        setIsOpen: setUpdateOpen,
        entity: updateEntity,
        onOkFn
    } = useDialog<Connection>({ onOk: DeleteConnection });

    const {
        isOpen: deleteOpen,
        showDialog: showDeleteDialog,
        setIsOpen: setDeleteOpen
    } = useDialog<Connection>({});

    return (
        <Layout>
            <BackButton />
            <div className='mb-10'>
                <div className='bg-gray-100 w-full h-72 flex justify-end items-start p-4 hero_pattern'>
                    <section className='flex items-center'>
                        <ConnectionLevelColumn size='md' level={connection?.friendship_level ?? 0} />
                        <Menu onEditClick={showUpdateDialog} onDeleteClick={showDeleteDialog} connection={connection!} />
                    </section>
                </div>
            </div>
            <section className='flex gap-4 h-full'>
                <MetaDetails connection={connection} />
                <DetailsContext connection={connection} reachOuts={reachOuts} />
                <ContactInfo connection={connection} />
            </section>

            <CreateUpdateConnectionDialog
                open={updateOpen}
                connection={updateEntity!}
                onOpenChange={setUpdateOpen}
            />

            <ConnectionDeleteModal
                onOk={onOkFn}
                open={deleteOpen}
                onOpenChange={setDeleteOpen}
                connection={connection}
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

    let reachOuts: ReachOut[] = [];

    if (connection) {
        const { data } = await client.from('reach_outs').select().eq('connection_id', connection?.id);
        reachOuts = data ?? [];
    }

    return {
        props: {
            connection,
            reachOuts
        }
    }
}

export default ConnectionDetails

