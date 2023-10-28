import { ReachOutHistory } from "@/components/connections/details-context"
import { DialogProps } from "@radix-ui/react-dialog"
import { useSupabaseClient } from "@supabase/auth-helpers-react"
import { Database } from "lib/database.types"
import { Connection, ReachOut } from "lib/types"
import { useEffect, useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../dialog"

function useConnectionHistory(connection: Connection) {
    const client = useSupabaseClient<Database>();
    const [reachOuts, setReachOuts] = useState<ReachOut[]>();
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        client
            .from('reach_outs')
            .select().
            eq('connection_id', connection?.id)
            .then(res => {
                setReachOuts(res.data ?? [])
                setLoading(false)
            })

        return () => {
            setReachOuts([]);
            setLoading(true);
        }
    }, [client, connection?.id]);

    return { loading, reachOuts }
}

const ConnectionHistoryModal = ({ open, onOpenChange, connection, ...rest }: DialogProps & { connection: Connection }) => {
    const { loading, reachOuts } = useConnectionHistory(connection)
    return (
        <Dialog open={open} onOpenChange={onOpenChange} {...rest}>
            <DialogContent>
                <DialogHeader className="mb-3 max-w-xs">
                    <DialogTitle>Connection history</DialogTitle>
                    <DialogDescription>
                        Shows the number of times you've reached out to <span className="font-medium text-primary">{connection?.fullname}</span>
                    </DialogDescription>
                </DialogHeader>
                <ReachOutHistory
                    loading={loading}
                    connection={connection}
                    reachOuts={reachOuts ?? []}
                />
            </DialogContent>
        </Dialog >
    )
}

export default ConnectionHistoryModal