import { supabase } from '@/core/supabase'
import { DialogProps } from '@radix-ui/react-dialog'
import { Connection, ConnectionInsert } from 'lib/types'
import { useRef } from 'react'
import { useForm } from 'react-hook-form'
import { Button, Input } from '.'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from './dialog'
import { Textarea } from './textarea'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './tabs'

const CreateUpdateConnectionDialog = ({ open, connection, ...rest }: DialogProps & { connection?: Connection }) => {
    const closeForm = () => {
        rest.onOpenChange?.(false)
    }
    return (
        <Dialog open={open} {...rest}>
            <DialogContent className='max-w-4xl'>
                <DialogHeader>
                    <DialogTitle>Create Connection</DialogTitle>
                    <DialogDescription>
                        Add to your list of connections
                    </DialogDescription>
                </DialogHeader>

                <CreateConnectionForm
                    onSubmitSuccessful={closeForm}
                    defaultValues={connection}
                />
            </DialogContent>
        </Dialog>
    )
}

interface CreateConnectionFormProps extends React.HTMLAttributes<HTMLFormElement> {
    onSubmitSuccessful: () => void
    defaultValues?: ConnectionInsert
}

const CreateConnectionForm = ({ onSubmitSuccessful, defaultValues, ...rest }: CreateConnectionFormProps) => {
    const formRef = useRef<HTMLFormElement>(null)
    const {
        register,
        handleSubmit,
        formState: { isSubmitting },
        // @ts-ignore
    } = useForm({ defaultValues: defaultValues })

    const onSubmit = async (data: ConnectionInsert) => {
        try {
            const isEditing = !!defaultValues;
            const { error } = isEditing ? await supabase.from('connection').update({ ...data, friendshiplevel: 0 }).eq('id', data.id!) :
                await supabase.from('connection').insert({ ...data, friendshiplevel: 0 })
            if (error) throw error;

            onSubmitSuccessful();
        } catch {
            // TODO: handle error
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} ref={formRef} {...rest}>
            <Tabs defaultValue='basic' orientation='vertical' className='flex min-h-[400px]'>
                <TabsList className='p-2 border-r'>
                    <TabsTrigger value="basic">Basic Information</TabsTrigger>
                    <TabsTrigger value="context">Context</TabsTrigger>
                    <TabsTrigger value="contact">Contact Information</TabsTrigger>
                </TabsList>

                <TabsContent value="basic" className='px-4'>
                    <Input placeholder='Fullname' {...register('fullname')} />
                    {/* <Input placeholder='Occupation' /> */}
                    <Textarea placeholder='Bio' />
                </TabsContent>

                <TabsContent value="context" className='px-4'>
                    <Textarea
                        placeholder='How did you meet'
                        {...register('origincontext')}
                    />
                    <Textarea
                        placeholder='What value can they give you'
                        {...register('valuetome')}
                    />
                    <Textarea
                        placeholder='What value can you give them'
                        {...register('valuetothem')}
                    />
                </TabsContent>

                <TabsContent value="contact" className='px-4'>
                    <Textarea placeholder='Country' {...register('country')} />
                </TabsContent>
            </Tabs>

            {/* <section className='flex'>
                <main className='p-3 flex flex-wrap flex-col'>
                    <Input placeholder='Fullname' {...register('fullname')} />
                    <Input placeholder='Occupation' />
                    <Textarea placeholder='Bio' />
                </main>
            </section> */}

            <DialogFooter>
                <Button type="submit">{isSubmitting ? 'Creating' : 'Create Connection'}</Button>
            </DialogFooter>
        </form>
    )
}

export default CreateUpdateConnectionDialog