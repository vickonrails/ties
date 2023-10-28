import { cn } from '@/lib/utils'
import { RotatingLines } from 'react-loader-spinner'

interface SpinnerProps extends React.HTMLAttributes<HTMLElement> {
    strokeClass?: string,
    size?: 'sm' | 'md'
}

export function Spinner({ className, strokeClass = 'stroke-slate-700', size = 'md', ...rest }: SpinnerProps) {
    return (
        <div className={cn('grid place-items-center', strokeClass, className)}  {...rest}>
            <RotatingLines width={size === 'md' ? '35' : '20'} strokeColor='inherit' />
        </div>
    )
}