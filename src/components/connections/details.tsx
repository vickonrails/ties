import { Connection } from "lib/types"
import { ConnectionAvatar } from "../ui/avatar"
import { Tag } from "../ui/tags"

const tags = ['Colleague', 'Frontend', 'Software Engineer']

export function MetaDetails({ connection }: { connection: Connection }) {
    const { fullname } = connection
    return (
        <aside className='w-1/4 -mt-28 p-5'>
            <ConnectionAvatar
                fullname={fullname}
                size="lg"
                border
            />
            <div className='my-4'>
                <h1 className='text-lg font-bold'>{fullname}</h1>
                <p className='text-sm'>Software Engineer</p>
            </div>

            <p className='mb-4'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate blanditiis ullam molestiae similique adipisci corrupti consectetur iusto! Officia quaerat.</p>

            <h4 className='mb-2 text-sm font-medium'>TAGS</h4>
            <div className='flex flex-wrap'>
                {tags.map(tag => <Tag label={tag} />)}
            </div>
        </aside>
    )
}