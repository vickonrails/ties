import { Connection } from "lib/types"
import { Linkedin, Twitter } from "lucide-react"

const contactInfo = [
    { type: 'linkedin', value: 'https://linkedIn.com/in/victor-ofoegbu', icon: <Linkedin className='h-4 w-4' /> },
    { type: 'twitter', value: 'https://twitter.com/vick_onrails', icon: <Twitter className='h-4 w-4' /> },
]

export function ContactInfo({ connection }: { connection: Connection }) {
    const { country } = connection
    return (
        <aside className='w-1/4 border rounded flex flex-col gap-3 p-6'>
            <div className='border-b pb-2'>
                <p className='font-medium'>
                    Lives In
                </p>
                <div className='text-sm flex items-center gap-2'>
                    <p className='text-2xl'>🇳🇬</p>
                    {country}
                </div>
            </div>

            <div className='border-b pb-2'>
                <p className='font-medium mb-2'>
                    Company
                </p>
                <div className='text-sm flex items-center gap-2'>
                    <p>Facebook</p>
                </div>
            </div>

            {/* TODO: use the actual social network icons */}
            <div>
                <p className='font-medium mb-2'>Contact Information</p>
                <ul>
                    {contactInfo.map(info => (
                        <li><a
                            href={info.value}
                            target='_blank'
                            rel='noopener noreferrer'
                            className='flex gap-1 items-center underline'
                        >
                            {info.icon}
                            {info.type}
                        </a></li>
                    ))}
                </ul>
            </div>
        </aside>
    )
}