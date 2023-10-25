export function Tag({ label }: { label: string }) {
    return (
        <div className='p-2 py-1 rounded-sm cursor-pointer select-none text-sm mr-2 mb-2 border inline-block'>
            {label}
        </div>
    )
}