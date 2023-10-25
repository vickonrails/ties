import { supabase } from '@/core/supabase'
import { DialogProps } from '@radix-ui/react-dialog'
import { ConnectionInsert } from 'lib/types'
import { useRef } from 'react'
import { useForm } from 'react-hook-form'
import { Button, Input } from '.'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from './dialog'

const CreateConnectionDialog = ({ open, ...rest }: DialogProps) => {
    const closeForm = () => {
        rest.onOpenChange?.(false)
    }

    return (
        <Dialog open={open} {...rest}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create Connection</DialogTitle>
                    <DialogDescription>
                        Add to your list of connections
                    </DialogDescription>
                </DialogHeader>
                <CreateConnectionForm onSubmitSuccessful={closeForm} />
            </DialogContent>
        </Dialog>
    )
}

const CreateConnectionForm = ({ onSubmitSuccessful, ...rest }: React.HTMLAttributes<HTMLFormElement> & { onSubmitSuccessful: () => void }) => {
    const formRef = useRef<HTMLFormElement>(null)
    const {
        register,
        handleSubmit,
        formState: { isSubmitting },
    } = useForm<ConnectionInsert>()

    const onSubmit = async (data: ConnectionInsert) => {
        try {
            const { error } = await supabase.from('connection').insert({ ...data, friendshiplevel: 0 })
            if (error) throw error;

            onSubmitSuccessful();
        } catch {
            // TODO: handle error
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} ref={formRef} {...rest}>
            <div className='mb-4'>
                <Input {...register('fullname')} />
            </div>

            <DialogFooter>
                <Button type="submit">{isSubmitting ? 'Creating' : 'Create Connection'}</Button>
            </DialogFooter>
        </form>
    )
}

export default CreateConnectionDialog