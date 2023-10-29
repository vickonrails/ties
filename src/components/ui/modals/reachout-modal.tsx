import { MailOptions } from "@/pages/api/send"
import { DialogProps } from "@radix-ui/react-dialog"
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react"
import { Database } from "lib/database.types"
import { Connection, ReachOutInsert } from "lib/types"
import { useEffect, useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { Button, Input } from ".."
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../dialog"
import { Select } from "../select"
import { Textarea } from "../textarea"

const options = [
    { label: 'Schedule a Meeting', value: '0' },
    { label: 'Share an Update', value: '1' },
]

async function sendMail(options: MailOptions) {
    return await fetch('/api/send', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(options),
    })
}

const ReachOutModal = ({ open, onOpenChange, connection, ...rest }: DialogProps & { connection: Connection }) => {
    const session = useSession()
    const client = useSupabaseClient<Database>()
    const { handleSubmit, control, register, formState: { isSubmitting, errors }, reset } = useForm<ReachOutInsert>();
    const [formError, setFormError] = useState('')

    useEffect(() => {
        return () => {
            setFormError('')
            reset()
        }
    }, [open, reset])

    if (!session) return;

    const onSubmit = async (data: ReachOutInsert) => {
        const { message, subject } = data
        const { id: connection_id, email_address } = connection
        try {
            await sendMail({ from: session.user.email!, subject, to: email_address, message })
            const { error } = await client.from('reach_outs').insert({ ...data, email_address, connection_id })
            if (error) throw error;
            onOpenChange?.(false);
            // use a temporary hard reset ): because there's no clean way to refresh the reachout history on the other side of the page
            // TODO: remove hard reset when I add React Query for cache management.
            window.location.reload();
        } catch {
            setFormError("Couldn't submit form")
            // TODO: handle error
        }
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange} {...rest}>
            <DialogContent>
                <DialogHeader className="mb-3">
                    <DialogTitle>Reach out</DialogTitle>
                    <DialogDescription className="max-w-xs">
                        Send a mail to {connection?.fullname} either sharing an update or just checking up.
                    </DialogDescription>
                </DialogHeader>

                <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
                    <Controller
                        name='type'
                        control={control}
                        rules={{ required: 'Reach out type is required' }}
                        render={({ field: { onChange, value } }) => (
                            <Select
                                label="Reachout Type"
                                className="w-[45%] flex-grow"
                                placeholder="Select reach out type"
                                options={options}
                                onValueChange={ev => onChange(parseInt(ev))}
                                value={String(value)}
                                hint={errors.type?.message}
                            />
                        )}
                    />

                    <Input
                        label="Message subject"
                        hint={errors.subject?.message}
                        {...register('subject', { required: 'A message subject is required' })}
                    />

                    <Textarea
                        label="Reach out message"
                        hint={errors.message?.message}
                        {...register('message', { required: 'Message body is required' })}
                    />

                    {formError && (<p>{formError}</p>)}

                    <DialogFooter>
                        <Button variant='outline' onClick={() => onOpenChange?.(false)}>Cancel</Button>
                        <Button loading={isSubmitting}>Reach out</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default ReachOutModal