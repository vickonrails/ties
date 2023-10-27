import { Connection } from "lib/types"
import { Linkedin, Twitter } from "lucide-react"
import { Button } from "../ui"
import { useDialog } from "../ui/hooks/use-dialog"
import ReachoutModal from "../ui/modals/reachout-modal"

const contactInfo = [
    { type: 'linkedin', value: 'https://linkedIn.com/in/victor-ofoegbu', icon: <Linkedin className='h-4 w-4' /> },
    { type: 'twitter', value: 'https://twitter.com/vick_onrails', icon: <Twitter className='h-4 w-4' /> },
]

export function ContactInfo({ connection }: { connection: Connection }) {
    const { isOpen, showDialog, setIsOpen } = useDialog({})
    const { country } = connection
    return (
        <aside className="w-1/4 flex flex-col gap-4">
            <section className="p-6 py-3 border rounded flex flex-col gap-3">
                <div>
                    <h3 className="text-md mb-2">Reachout</h3>
                    <p className="text-sm text-muted-foreground">Send a mail to <span className="font-medium">{connection.fullname}</span></p>
                </div>
                <Button onClick={() => showDialog(connection)} disabled={!connection.email_address}>Reach Out</Button>
            </section>

            <section className='border rounded flex flex-col gap-3 p-6'>
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
                            <li key={info.value}>
                                <a
                                    href={info.value}
                                    target='_blank'
                                    rel='noopener noreferrer'
                                    className='flex gap-1 items-center underline'
                                >
                                    {info.icon}
                                    {info.type}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>

                <ReachoutModal
                    open={isOpen}
                    onOpenChange={setIsOpen}
                    connection={connection}
                />
            </section>
        </aside >
    )
}