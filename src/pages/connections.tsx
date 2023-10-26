import { Button } from "@/components/ui";
import CreateUpdateConnectionDialog from "@/components/ui/create-connection";
import { useDialog } from "@/components/ui/hooks/use-dialog";
import { Layout } from "@/components/ui/layout";
import ConnectionsTable from "@/components/ui/table/table";
import { supabase } from "@/core/supabase";
import { Database } from "lib/database.types";
import { MoreVertical } from "lucide-react";
import { useEffect, useState } from "react";

export type Connection = Database['public']['Tables']['connection']['Row']

export default function Connections() {
    const { isOpen, showDialog, setIsOpen } = useDialog({});
    const [connections, setConnections] = useState<Connection[]>([])
    // const [modalOpen, setModalOpen] = useState(false)

    useEffect(() => {
        supabase.from('connection').select().then(res => {
            setConnections(res.data ?? [])
        })
    }, [])

    // const openCreateConnectionDialog = () => {
    //     setModalOpen(true)
    // }

    const onEdit = (item: unknown) => {
        console.log(`Deleting ${item}`)
    }

    const onDelete = (id: string) => {
        console.log(`Deleting ${id}`)
    }

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
                actions={{ onEdit, onDelete }}
            />
            <CreateUpdateConnectionDialog
                open={isOpen}
                onOpenChange={setIsOpen}
            />
        </Layout>
    )
}

