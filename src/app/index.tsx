import { Button } from "@/components/ui";
import CreateConnectionDialog from "@/components/ui/create-connection";
import { Layout } from "@/components/ui/layout";
import ConnectionsTable from "@/components/ui/table";
import { supabase } from "@/core/supabase";
import { Database } from "lib/database.types";
import { MoreVertical } from "lucide-react";
import { useEffect, useState } from "react";

export type Connection = Database['public']['Tables']['connection']['Row']

export default function Index() {
    const [connections, setConnections] = useState<Connection[]>([])
    const [modalOpen, setModalOpen] = useState(false)

    useEffect(() => {
        supabase.from('connection').select().then(res => {
            setConnections(res.data ?? [])
        })
    }, [])

    const openCreateConnectionDialog = () => {
        setModalOpen(true)
    }

    return (
        <Layout>
            <div className="flex justify-between mb-6">
                <h1 className="text-2xl font-medium">Connections</h1>
                <div className="flex justify-center items-center">
                    <Button variant='outline' onClick={openCreateConnectionDialog}>Add Connection</Button>
                    <button>
                        <MoreVertical />
                    </button>
                </div>
            </div>

            <ConnectionsTable connections={connections} />
            <CreateConnectionDialog open={modalOpen} onOpenChange={setModalOpen} />
        </Layout>
    )
}

