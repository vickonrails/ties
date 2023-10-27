import { formatDate } from "@/lib/format-date"
import { Connection, ReachOut } from "lib/types"
import { DetailsAccordion } from "../ui/details-accordion"
import { SharedInterests } from "./shared-interests"

const interests = [
    'Swimming',
    'Reading'
]

const sharedInterests = [
    'Swimming',
    'Reading'
]

export function DetailsContext({ connection, reachOuts }: { connection: Connection, reachOuts: ReachOut[] }) {
    const { created_at } = connection
    return (
        <main className='flex-1 flex flex-col gap-4'>
            <div className='p-6 border rounded'>
                <div className='mb-4'>
                    <DetailsAccordion connection={connection} />
                </div>
                <SharedInterests
                    sharedInterests={sharedInterests}
                    interests={interests}
                />
            </div>

            <div className='p-6 border rounded'>
                {reachOuts.map(reachOut => (
                    <div className="border-b py-4">
                        <div className="flex justify-between">
                            <h4 className="text-sm mb-1 font-medium">You Reached Out to Victor</h4>
                            <time className="text-xs">{formatDate(reachOut.created_at!)}</time>
                        </div>
                        <p className="text-muted-foreground text-sm">{reachOut.message}</p>
                    </div>
                ))}
                <p className="py-2 text-sm">You added {connection.fullname} on {formatDate(created_at!)}</p>
            </div>
        </main>
    )
}