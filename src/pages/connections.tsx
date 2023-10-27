import { Button } from "@/components/ui";
import CreateUpdateConnectionDialog from "@/components/ui/create-connection";
import { useDialog } from "@/components/ui/hooks/use-dialog";
import { Layout } from "@/components/ui/layout";
import ConnectionsTable from "@/components/ui/table/table";
import { Database } from "lib/database.types";
import { MoreVertical } from "lucide-react";
import { useConnections } from "./connection-details";

export type Connection = Database['public']['Tables']['connection']['Row']

export default function Connections() {
    const { isOpen, showDialog, setIsOpen } = useDialog({});
    const { loading, connection } = useConnections()
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
                    {/* <button>
                        <MoreVertical />
                    </button> */}
                </div>
            </div>

            <ConnectionsTable
                connections={connection!}
                actions={{ onEdit, onDelete }}
                loading={loading}
            />

            <CreateUpdateConnectionDialog
                open={isOpen}
                onOpenChange={setIsOpen}
            />
        </Layout>
    )
}

