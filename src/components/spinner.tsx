import { cn } from '@/lib/utils'
import { RotatingLines } from 'react-loader-spinner'

export function Spinner({ className, ...rest }: React.HTMLAttributes<HTMLElement>) {
    return (
        <div className={cn('grid place-items-center', className)} {...rest}>
            <RotatingLines width="30" />
        </div>
    )
}