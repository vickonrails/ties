import { formatDate } from "@/lib/format-date"
import { Connection, ReachOut } from "lib/types"
import { Spinner } from "../spinner"
import { DetailsAccordion } from "../ui/details-accordion"
import { SharedInterests } from "./shared-interests"
import { useCallback, useEffect, useMemo, useState } from "react"
import { SupabaseClient, useSupabaseClient } from "@supabase/auth-helpers-react"
import { Database } from "lib/database.types"

export function DetailsContext({ connection }: { connection: Connection }) {
    const { common_interests, interests } = connection
    return (
        <main className='flex-1 flex flex-col gap-4'>
            <div className='p-6 border rounded'>
                <div className='mb-4'>
                    <DetailsAccordion connection={connection} />
                </div>
                {(common_interests && interests) && (
                    <SharedInterests
                        sharedInterests={common_interests?.split(',')}
                        interests={interests?.split(',')}
                    />
                )}
            </div>
            <ReachOutHistory
                connection={connection}
            />
        </main>
    )
}

async function fetchReachOutHistory(client: SupabaseClient<Database>, connectionId: string) {
    try {
        const { data, error } = await client.from('reach_outs').select().eq('connection_id', connectionId)
        if (error) throw error;

        return data
    } catch (err) {
        // TODO: handle error
    }
}

function useReachOutsHistory(connectionId: string): [boolean, ReachOut[], () => void] {
    const [history, setHistory] = useState<ReachOut[]>([])
    const [loading, setLoading] = useState(true)
    const client = useSupabaseClient<Database>()

    useEffect(() => {
        fetchReachOutHistory(client, connectionId).then(res => {
            setHistory(res ?? [])
        }).catch(err => {
            // 
        }).finally(() => {
            setLoading(false)
        })
    }, [connectionId, client])

    // TODO: find a way to refresh without code duplication
    const refresh = useCallback(() => {
        setLoading(true);
        fetchReachOutHistory(client, connectionId).then(res => {
            setHistory(res ?? [])
        }).catch(err => {
            // 
        }).finally(() => {
            setLoading(false)
        })
    }, [connectionId, client])

    return [loading, history, refresh]
}

export function ReachOutHistory({ connection }: { connection: Connection }) {
    const [loading, history] = useReachOutsHistory(connection.id)
    const isEmpty = useMemo(() => history?.length === 0, [history])

    return (
        <div className='px-4 border rounded overflow-y-auto max-h-72 min-h-[100px]'>
            {loading ? (
                <Spinner className="mt-6" />
            ) : (
                <>
                    {isEmpty ? (
                        <div className="mt-4 text-center">
                            <h3 className="font-medium">Ooops</h3>
                            <p className="text-muted-foreground text-sm max-w-xs mx-auto">
                                Haven't reached out to {connection?.fullname} yet. History will show when you reach out.
                            </p>
                        </div>
                    ) : (
                        <article>
                            {history?.map(reachOut => (
                                <ReachOutHistoryItem
                                    key={reachOut.id}
                                    reachOut={reachOut}
                                    connection={connection}
                                />
                            ))}
                        </article>
                    )}
                </>
            )}
        </div >
    )
}

function ReachOutHistoryItem({ reachOut, connection }: { reachOut: ReachOut, connection: Connection }) {
    const { type, message, created_at } = reachOut
    const { fullname } = connection

    return (
        <div className="border-b py-4">
            <div className="flex justify-between">
                <h4 className="text-sm mb-1 font-medium">
                    {type === 0 ? `You Reached Out to ${fullname}` : `You shared an update with ${fullname}`}
                </h4>
                <time className="text-xs">{formatDate(created_at!)}</time>
            </div>
            <p className="text-muted-foreground text-sm">{`${message.slice(0, 150)}...`}</p>
        </div>
    )
}