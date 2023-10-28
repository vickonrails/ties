import { Button } from "@/components/ui";
import CreateUpdateConnectionDialog from "@/components/ui/create-connection";
import { useDialog } from "@/components/ui/hooks/use-dialog";
import { Layout } from "@/components/ui/layout";
import ConnectionsTable from "@/components/ui/table/table";
import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "lib/database.types";
import { MoreVertical } from "lucide-react";
import { GetServerSideProps } from "next";

export type Connection = Database['public']['Tables']['connection']['Row']

export default function Index({ connections }: { connections: Connection[] }) {
    const { isOpen, showDialog, setIsOpen } = useDialog({});

    return (
        <Layout>
            <div className="flex justify-between mb-6">
                <h1 className="text-2xl font-medium">Connections</h1>
                <div className="flex justify-center items-center">
                    <Button
                        variant='outline'
                        onClick={_ => showDialog()}
                    >
                        Add Connection
                    </Button>
                    <button>
                        <MoreVertical />
                    </button>
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