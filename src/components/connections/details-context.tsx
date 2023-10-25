import { Connection } from "lib/types"
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

export function DetailsContext({ connection }: { connection: Connection }) {
    const { created_at } = connection
    return (
        <main className='flex-1 flex flex-col gap-4'>
            <div className='p-6 border rounded'>
                <div className='mb-4'>
                    <DetailsAccordion />
                </div>
                <SharedInterests
                    sharedInterests={sharedInterests}
                    interests={interests}
                />
            </div>

            <div className='p-6 border rounded'>
                <p>Added on {created_at}</p>
            </div>
        </main>
    )
}