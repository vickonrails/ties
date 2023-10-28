import { DialogProps } from "@radix-ui/react-dialog"
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react"
import { Database } from "lib/database.types"
import { Connection, ReachOutInsert } from "lib/types"
import { useEffect, useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { Button } from ".."
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../dialog"
import { Select } from "../select"
import { Textarea } from "../textarea"
import { MailOptions } from "@/pages/api/send"

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
    const { handleSubmit, control, register, formState: { isSubmitting }, reset } = useForm<ReachOutInsert>();
    const [formError, setFormError] = useState('')

    useEffect(() => {
        return () => {
            setFormError('')
            reset()
        }
    }, [open, reset])

    if (!session) return;

    const onSubmit = async (data: ReachOutInsert) => {
        const { email_address, id: connection_id, fullname } = connection
        try {
            // TODO: error handling
            await sendMail({ from: session.user.email!, fullname, subject: 'Hello there', to: email_address })
            const { error } = await client.from('reach_outs').insert({ ...data, email_address, connection_id })
            if (error) throw error;
            onOpenChange?.(false);
        } catch {
            setFormError("Couldn't submit form")
            // TODO: handle error
        }
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange} {...rest}>
            <DialogContent>
                <DialogHeader className="mb-3">
                    <DialogTitle>Reach out to {connection?.fullname}</DialogTitle>
                    <DialogDescription>
                        Are you sure you want to delete this connection
                    </DialogDescription>
                </DialogHeader>

                <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
                    <Controller
                        name='type'
                        control={control}
                        render={({ field: { onChange, value } }) => (
                            <Select
                                label="Connection Level"
                                className="w-[45%] flex-grow"
                                placeholder="Select reach out type"
                                options={options}
                                onValueChange={ev => onChange(parseInt(ev))}
                                value={String(value)}
                            />
                        )}
                    />

                    <Textarea label="Reach out message" {...register('message')} />

                    {formError && (<p>{formError}</p>)}

                    <DialogFooter>
                        <Button variant='outline' onClick={_ => onOpenChange?.(false)}>Cancel</Button>
                        <Button loading={isSubmitting}>Reach out</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default ReachOutModal