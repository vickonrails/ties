import { useCallback, useState } from 'react'

interface DialogHookProps {
    onOk?: (id: string) => Promise<void>
    refresh?: () => Promise<void>
}

interface BaseEntity {
    id: string
}

export function useDialog<T extends BaseEntity>(initialProps: DialogHookProps) {
    const [isOpen, setIsOpen] = useState(false)
    const [entity, setEntity] = useState<T | null>(null)
    const [loading, setLoading] = useState(false)

    const { onOk } = initialProps

    const onOkFn = useCallback(() => {
        if (!entity) return

        setLoading(true)
        onOk?.(entity?.id).then(async () => {
            await initialProps.refresh?.()

            setIsOpen(false)
        }).catch(err => {

        }).finally(() => {
            setLoading(false)
        })
    }, [initialProps, onOk, entity])

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