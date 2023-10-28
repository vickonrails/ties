import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { SupabaseClient } from '@supabase/supabase-js'
import { Database } from 'lib/database.types'
import { useCallback, useState } from 'react'

interface DialogHookProps {
    onOk?: (client: SupabaseClient<Database>, id: string) => Promise<null>
    refresh?: () => Promise<void> | void
}

interface BaseEntity {
    id: string
}

export function useDialog<T extends BaseEntity>(initialProps: DialogHookProps) {
    const [isOpen, setIsOpen] = useState(false)
    const [entity, setEntity] = useState<T | null>(null)
    const [loading, setLoading] = useState(false)
    const client = useSupabaseClient<Database>()

    const { onOk } = initialProps

    const onOkFn = useCallback(() => {
        if (!entity) return

        setLoading(true)
        onOk?.(client, entity?.id).then(async () => {
            await initialProps.refresh?.()
            setIsOpen(false)
        }).catch(err => {
            // TODO: handle error
        }).finally(() => {
            setLoading(false)
        })

    }, [client, entity, onOk, initialProps])

    const showDialog = (item?: T) => {
        setEntity(item ?? null)
        setIsOpen(true);
    }

    const onCancel = useCallback(() => {
        setEntity(null)
        setIsOpen(false)
    }, [])

    return { loading, showDialog, setIsOpen, onCancel, onOkFn, entity, isOpen }
}