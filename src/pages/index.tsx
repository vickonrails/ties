import { Button } from "@/components/ui";
import CreateUpdateConnectionDialog from "@/components/ui/create-connection";
import { useDialog } from "@/components/ui/hooks/use-dialog";
import { Layout } from "@/components/ui/layout";
import ConnectionsTable from "@/components/ui/table/table";
import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "lib/database.types";
import { Connection } from "lib/types";
import { GetServerSideProps } from "next";

export default function Index({ connections }: { connections: Connection[] }) {
    const { isOpen, showDialog: showUpdateDialog, setIsOpen } = useDialog({});

    return (
        <Layout>
            <div className="flex justify-between mb-6">
                <h1 className="text-2xl font-medium">Connections</h1>
                <div className="flex justify-center items-center">
                    <Button
                        variant='outline'
                        onClick={() => showUpdateDialog()}
                    >
                        Add Connection
                    </Button>
                </div>
            </div>

            <ConnectionsTable
                connections={connections}
            />

            <CreateUpdateConnectionDialog
                open={isOpen}
                onOpenChange={setIsOpen}
            />
        </Layout>
    )
}


export const getServerSideProps: GetServerSideProps = async (context) => {
    const supabase = createPagesServerClient<Database>(context);
    const { data: { session } } = await supabase.auth.getSession()

    if (!session) {
        await supabase.auth.signOut();
        return {
            redirect: {
                destination: '/auth',
                permanent: false
            }
        }
    }

    const { data: connections } = await supabase.from('connection').select()

    return {
        props: {
            session,
            connections
        }
    }
}