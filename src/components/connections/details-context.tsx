import { formatDate } from "@/lib/format-date"
import { Connection, ReachOut } from "lib/types"
import { Spinner } from "../spinner"
import { DetailsAccordion } from "../ui/details-accordion"
import { SharedInterests } from "./shared-interests"

export function DetailsContext({ connection, reachOuts }: { connection: Connection, reachOuts: ReachOut[] }) {
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
                reachOuts={reachOuts}
            />
        </main>
    )
}

export function ReachOutHistory({ reachOuts, loading = false, connection }: { reachOuts?: ReachOut[], connection: Connection, loading?: boolean }) {
    const { created_at } = connection
    return (
        <div className='px-4 border rounded overflow-y-auto max-h-72 min-h-[100px]'>
            {loading ? (
                <Spinner className="mt-6" />
            ) : (
                <article>
                    {reachOuts?.map(reachOut => (
                        <ReachOutHistoryItem
                            key={reachOut.id}
                            reachOut={reachOut}
                            connection={connection}
                        />
                    ))}
                    <p className="py-2 text-sm">You added {connection.fullname} on {formatDate(created_at!)}</p>
                </article>
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