import { CellContext } from "@tanstack/react-table";
import { ConnectionAvatar } from "../avatar";
import { Connection } from "lib/types";
import { cn } from "@/lib/utils";

export function TextColumn({ getValue }: CellContext<Connection, string>) {
    const value = getValue();
    return (
        <div className='font-medium text-gray-900 flex items-center gap-2'>
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

// TODO: settle on more colors
// TODO: refactor this component to avoid duplication
export function ConnectionLevelColumn({ getValue }: CellContext<Connection, number>) {
    const baseClasses = 'text-xs border p-1 px-2 rounded-sm inline-flex items-center gap-2'
    const level = getValue()
    switch (level) {
        case 0:
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

    return (
        <div className={cn(baseClasses)}>
            <Dot className='bg-purple-400' />
            <p className='uppercase'>Acquaintance</p>
        </div>
    )
}