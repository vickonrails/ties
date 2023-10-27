import { DialogProps } from '@radix-ui/react-dialog'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { Database } from 'lib/database.types'
import { Connection, ConnectionInsert } from 'lib/types'
import { useRef } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Button, Input } from '.'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from './dialog'
import { useRefreshData } from './hooks/use-refresh-data'
import { Select } from './select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './tabs'
import { Textarea } from './textarea'

const reachoutFreqOptions = [
    { value: '0', label: 'Weekly' },
    { value: '1', label: 'Monthly' },
    { value: '2', label: 'Yearly' },
]

const CreateUpdateConnectionDialog = ({ open, connection, ...rest }: DialogProps & { connection?: Connection }) => {
    const closeForm = () => {
        rest.onOpenChange?.(false)
    }
    return (
        <Dialog open={open} {...rest}>
            <DialogContent className='max-w-4xl'>
                <DialogHeader className='mb-6'>
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

const friendship_level_options = [
    { label: 'Acquintances', value: '0' },
    { label: 'Casual Friends', value: '1' },
    { label: 'Close Friends', value: '2' },
    { label: 'Intimate Friends', value: '3' }
]

const CreateConnectionForm = ({ onSubmitSuccessful, defaultValues, ...rest }: CreateConnectionFormProps) => {
    const formRef = useRef<HTMLFormElement>(null)
    const client = useSupabaseClient<Database>()
    const [refresh] = useRefreshData()
    const {
        register,
        handleSubmit,
        control,
        formState: { isSubmitting }
        // @ts-ignore
    } = useForm({ defaultValues: defaultValues })

    const onSubmit = async (data: ConnectionInsert) => {
        try {
            const isEditing = !!defaultValues;
            const { error } = isEditing ? await client.from('connection').update({ ...data }).eq('id', data.id!) :
                await client.from('connection').insert({ ...data })
            if (error) throw error;

            refresh()
            onSubmitSuccessful();
        } catch {
            // TODO: handle error
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} ref={formRef} {...rest}>
            <Tabs defaultValue='basic' orientation='vertical' className='flex min-h-[400px]'>
                <TabsList className='border-r pr-4'>
                    <TabsTrigger value="basic">Basic Information</TabsTrigger>
                    <TabsTrigger value="context">Context</TabsTrigger>
                    <TabsTrigger value="contact">Contact Information</TabsTrigger>
                </TabsList>

                <TabsContent value="basic" className='px-6 flex flex-col flex-1 gap-6 data-[state=inactive]:hidden'>
                    <div className='flex gap-3'>
                        <Input
                            autoFocus
                            placeholder='Fullname'
                            label='Fullname'
                            containerProps={{ className: 'w-[45%] flex-grow' }}
                            {...register('fullname')}
                        />

                        <Input
                            placeholder='Occupation'
                            label='Occupation'
                            containerProps={{ className: 'w-[45%] flex-grow' }}
                            {...register('occupation')}
                        />
                    </div>

                    <div className='flex gap-3'>
                        <Input
                            placeholder='Email Address'
                            label='Email Address'
                            containerProps={{ className: 'w-[45%] flex-grow' }}
                            {...register('email_address')}
                        />

                        <Controller
                            name='friendship_level'
                            control={control}
                            render={({ field: { onChange, value } }) => (
                                <Select
                                    containerClasses='w-[45%] flex-grow'
                                    label='Connection Level'
                                    className='max-w-xs'
                                    onValueChange={ev => onChange(parseInt(ev))}
                                    options={friendship_level_options}
                                    value={String(value)}
                                />
                            )}
                        />
                    </div>

                    <Textarea
                        placeholder='Bio'
                        label='Bio (Overview)'
                        {...register('bio')}
                    />
                </TabsContent>

                <TabsContent value="context" className='px-4 flex flex-col items-stretch gap-4 data-[state=inactive]:hidden flex-grow'>
                    <Textarea
                        label='How did you meet?'
                        {...register('origin_context')}
                    />
                    <Textarea
                        label='What value can they give you?'
                        {...register('value_to_me')}
                    />
                    <Textarea
                        label='What value can you give them?'
                        {...register('value_to_them')}
                    />
                </TabsContent>

                <TabsContent value="contact" className='px-4 flex flex-wrap flex-col items-start flex-1 data-[state=inactive]:hidden'>
                    <div className='flex w-full mb-4 gap-3'>
                        <Input
                            label='Country'
                            containerProps={{ className: 'flex-1' }}
                            {...register('country')}
                        />
                        <Input
                            label='Time Zone'
                            containerProps={{ className: 'flex-1' }}
                            {...register('timezone')}
                        />
                    </div>

                    <Controller
                        name='contact_frequency'
                        control={control}
                        render={({ field: { onChange, value } }) => (
                            <Select
                                containerClasses='w-1/2'
                                label='Reach out Frequency'
                                className='max-w-xs'
                                onValueChange={val => onChange(parseInt(val))}
                                options={reachoutFreqOptions}
                                value={String(value) ?? ''}
                            />
                        )}
                    />

                    {/* <Input
                        label='Birthday'
                        containerProps={{ className: 'flex-1' }}
                        {...register('birthday')}
                    /> */}
                </TabsContent>
            </Tabs>

            <DialogFooter>
                <CTA
                    defaultValues={defaultValues}
                    loading={isSubmitting}
                />
            </DialogFooter>
        </form >
    )
}

function CTA<T>({ defaultValues, loading }: { loading: boolean, defaultValues: T }) {
    if (defaultValues) {
        return (
            <Button type="submit">{loading ? 'Updating' : 'Update Connection'}</Button>
        )
    }
    return (
        <Button type="submit">{loading ? 'Creating' : 'Create Connection'}</Button>
    )
}

export default CreateUpdateConnectionDialog