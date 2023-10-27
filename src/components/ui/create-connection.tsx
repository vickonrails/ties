import { supabase } from '@/core/supabase'
import { DialogProps } from '@radix-ui/react-dialog'
import { Connection, ConnectionInsert } from 'lib/types'
import { useRef } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { Button, Input } from '.'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from './dialog'
import { Textarea } from './textarea'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './tabs'
import { Select } from './select'
import { countryOptions } from '@/lib/countries'

const reachoutFreqOptions = [
    { value: 'weekly', label: 'Weekly' },
    { value: 'monthly', label: 'Monthly' },
    { value: 'yearly', label: 'Yearly' },
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

const timezones = [
    { label: 'GMT+1', value: 'gmt+1' },
    { label: 'GMT+2', value: 'gmt+2' },
]

const CreateConnectionForm = ({ onSubmitSuccessful, defaultValues, ...rest }: CreateConnectionFormProps) => {
    const formRef = useRef<HTMLFormElement>(null)
    const {
        register,
        handleSubmit,
        control,
        formState: { isSubmitting },
        watch
        // @ts-ignore
    } = useForm({ defaultValues: defaultValues })

    const onSubmit = async (data: ConnectionInsert) => {
        try {
            const isEditing = !!defaultValues;
            const { error } = isEditing ? await supabase.from('connection').update({ ...data, friendship_level: 0 }).eq('id', data.id!) :
                await supabase.from('connection').insert({ ...data, friendship_level: 0 })
            if (error) throw error;

            onSubmitSuccessful();
        } catch {
            // TODO: handle error
        }
    }

    // TODO: memoize
    const countryListOptions = countryOptions();

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

                    <Input
                        autoFocus
                        placeholder='Email Address'
                        label='Email Address'
                        containerProps={{ className: 'w-[45%]' }}
                        {...register('email_address')}
                    />

                    {/* <Input placeholder='Occupation' /> */}
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
                        <Controller
                            name='country'
                            control={control}
                            render={({ field: { onChange } }) => (
                                <Select
                                    containerClasses='flex-1'
                                    label='Country'
                                    className='max-w-x'
                                    onValueChange={onChange}
                                    options={countryListOptions}
                                />
                            )}
                        />

                        <Controller
                            name='timezone'
                            control={control}
                            render={({ field: { onChange, value } }) => (
                                <Select
                                    containerClasses='flex-1'
                                    label='Timezone'
                                    className='max-w-xs'
                                    onValueChange={onChange}
                                    options={timezones}
                                    value={value ?? ''}
                                />
                            )}
                        />
                    </div>

                    <Controller
                        // TODO: rename to reachout freq
                        name='contactfrequency'
                        control={control}
                        render={({ field: { onChange, value } }) => (
                            <Select
                                containerClasses='w-[45%]'
                                label='Reachout Frequency'
                                className='max-w-xs'
                                onValueChange={onChange}
                                options={reachoutFreqOptions}
                                value={value ?? ''}
                            />
                        )}
                    />
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