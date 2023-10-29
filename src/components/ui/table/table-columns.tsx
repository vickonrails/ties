import { cn } from "@/lib/utils";
import { CellContext } from "@tanstack/react-table";
import { Connection } from "lib/types";
import { ConnectionAvatar } from "../avatar";

export function TextColumn({ getValue }: CellContext<Connection, string>) {
    const value = getValue();
    return (
        <div className='font-medium text-muted-foreground flex items-center gap-2'>
            <ConnectionAvatar fullname={value} size='xs' />
            <p>{value ?? '-'}</p>
        </div>
    )
}

export function LocationColumn({ getValue }: CellContext<Connection, string>) {
    const country = getValue()
    return <p>{country ?? '-'}</p>
}

function Dot({ className }: { className: string }) {
    return (
        <span className={cn('h-2 w-2 block  rounded-full', className)} />
    )
}

type Size = 'sm' | 'md'

const SIZE_LOOKUP = {
    sm: 'p-1 px-2',
    md: 'p-2 px-3'
}

// TODO: settle on more colors
// TODO: refactor this component to avoid duplication
export function ConnectionLevelColumn({ level, size = 'sm' }: { level: number, size?: Size }) {
    const baseClasses = cn('text-xs border bg-white select-none  rounded-md inline-flex items-center gap-2', SIZE_LOOKUP[size])
    switch (level) {
        case 0:
        default:
            return (
                <div className={cn(baseClasses)}>
                    <Dot className='bg-purple-400' />
                    <p className='uppercase'>Acquaintance</p>
                </div>
            )
        case 1:
            return (
                <div className={cn(baseClasses)}>
                    <Dot className='bg-blue-400' />
                    <p className='uppercase'>Casual Friends</p>
                </div>
            )

        case 2:
            return (
                <div className={cn(baseClasses)}>
                    <Dot className='bg-green-400' />
                    <p className='uppercase'>Close Friends</p>
                </div>
            )

        case 3:
            return (
                <div className={cn(baseClasses)}>
                    <Dot className='bg-red-400' />
                    <p className='uppercase'>Intimate Friends</p>
                </div>
            )
    }
}