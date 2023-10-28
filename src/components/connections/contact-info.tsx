import { Connection } from "lib/types"
import { Linkedin, Twitter } from "lucide-react"
import { Button } from "../ui"
import { useDialog } from "../ui/hooks/use-dialog"
import ReachOutModal from "../ui/modals/reachout-modal"

export function ContactInfo({ connection }: { connection: Connection }) {
    const { isOpen, showDialog, setIsOpen } = useDialog({})
    const { country, company, linkedin_url, x_url } = connection
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
                {country && (
                    <div className='border-b pb-2'>
                        <p className='font-medium'>
                            Lives In
                        </p>
                        <div className='text-sm flex items-center gap-2'>
                            {country}
                        </div>
                    </div>
                )}

                {company && (
                    <div className='border-b pb-2'>
                        <p className='font-medium mb-2'>
                            Company
                        </p>
                        <div className='text-sm flex items-center gap-2'>
                            {company}
                        </div>
                    </div>
                )}

                {/* TODO: use the actual social network icons */}
                {/* TODO: move to new component */}
                {(linkedin_url || x_url) && (
                    <div>
                        <p className='font-medium mb-2'>Contact Information</p>
                        <ul>
                            {linkedin_url && (
                                <li>
                                    <a href={linkedin_url} target='_blank' rel='noopener noreferrer' className='flex gap-1 items-center underline'>
                                        <Linkedin className='h-4 w-4' />
                                        LinkedIn
                                    </a>
                                </li>
                            )}
                            {x_url && (
                                <li>
                                    <a href={x_url} target='_blank' rel='noopener noreferrer' className='flex gap-1 items-center underline'>
                                        <Twitter className='h-4 w-4' />
                                        Twitter
                                    </a>
                                </li>
                            )}
                        </ul>
                    </div>
                )}

                <ReachOutModal
                    open={isOpen}
                    onOpenChange={setIsOpen}
                    connection={connection}
                />
            </section>
        </aside >
    )
}
