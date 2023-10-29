export function SharedInterests({ interests = [], sharedInterests = [] }: { interests?: string[], sharedInterests?: string[] }) {
    return (
        <section className='flex w-[80%] py-4'>
            <section className='flex-1 border-r px-3'>
                <h3 className='uppercase text-sm mb-2 font-medium'>Interests</h3>
                <ul className='ml-4'>
                    {interests.map(interest => <li key={interest} className='list-disc text-sm text-muted-foreground'>{interest}</li>)}
                </ul>
            </section>
            <section className='flex-1 px-3'>
                <h3 className='uppercase text-sm mb-2 font-medium'>Common Interests</h3>
                <ul className='ml-4'>
                    {sharedInterests.map(interest => <li key={interest} className='list-disc text-sm text-muted-foreground'>{interest}</li>)}
                </ul>
            </section>
        </section>
    )
}