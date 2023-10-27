import { Connection } from "lib/types"
import { ConnectionAvatar } from "../ui/avatar"
import { Tag } from "../ui/tags"

const tags = ['Colleague', 'Frontend', 'Software Engineer']

export function MetaDetails({ connection }: { connection: Connection }) {
    const { fullname, occupation, bio } = connection
    return (
        <aside className='w-1/4 -mt-28 p-5'>
            <ConnectionAvatar
                fullname={fullname}
                size="lg"
                border
            />
            <div className='my-4'>
                <h1 className='text-lg font-bold'>{fullname}</h1>
                {occupation && <p className='text-sm'>{occupation}</p>}
            </div>

            {bio && <p className='mb-4'>{bio}</p>}

            <h4 className='mb-2 text-sm font-medium'>TAGS</h4>
            <div className='flex flex-wrap'>
                {tags.map(tag => <Tag key={tag} label={tag} />)}
            </div>
        </aside>
    )
}