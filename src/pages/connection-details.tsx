import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Layout } from '@/components/ui/layout'
import { cn } from '@/lib/utils'
import { Link, RouteProps, useRouter } from '@tanstack/react-router'
import { BarChart4, ChevronLeft, HeartHandshake, Linkedin, PieChart, Twitter } from 'lucide-react'

const FRIENDSHIP_LEVEL_LOOKUP = [
    'Acquaintance',
    'Casual Friends',
    'Close Friends',
    'Intimate Friends'
]

const FRIENDSHIP_LEVEL_COLORS = [
    'bg-purple-400',
    'bg-blue-400',
    'bg-green-400',
    'bg-red-400'
]

function Tag({ label }: { label: string }) {
    return (
        <div className='p-2 py-1 rounded-sm cursor-pointer select-none text-sm mr-2 mb-2 border inline-block'>
            {label}
        </div>
    )
}

const tags = ['Colleague', 'Frontend', 'Software Engineer']

const interests = [
    'Swimming',
    'Reading'
]

const sharedInterests = [
    'Swimming',
    'Reading'
]

const contactInfo = [
    { type: 'linkedin', value: 'https://linkedIn.com/in/victor-ofoegbu', icon: <Linkedin className='h-4 w-4' /> },
    { type: 'twitter', value: 'https://twitter.com/vick_onrails', icon: <Twitter className='h-4 w-4' /> },
]

function ConnectionDetails({ useLoader }: RouteProps) {
    const { connection } = useLoader()
    const router = useRouter()
    console.log(connection[0].friendshiplevel)

    const goBack = () => {
        router.history.back();
    }

    return (
        <Layout>
            <Link onClick={goBack} className='flex mb-4 items-center'>
                <ChevronLeft />
                <span>Back</span>
            </Link>
            <div className='mb-10'>
                <div className='bg-gray-100 w-full h-72 relative'>
                    <span className={cn('select-none absolute p-3 py-2 right-4 top-4 text-white rounded', FRIENDSHIP_LEVEL_COLORS[connection[0].friendshiplevel])}>
                        {FRIENDSHIP_LEVEL_LOOKUP[connection[0].friendshiplevel]}
                    </span>
                </div>
            </div>
            <section className='flex gap-4 h-full'>
                <aside className='w-1/4 -mt-28 p-5'>
                    <ConnectionAvatar fullname={connection[0].fullname} />
                    <div className='mb-4'>
                        <h1 className='text-lg font-bold'>{connection[0].fullname}</h1>
                        <p className='text-sm'>Software Engineer</p>
                    </div>

                    <p className='mb-4'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate blanditiis ullam molestiae similique adipisci corrupti consectetur iusto! Officia quaerat.</p>

                    <h4 className='mb-2 text-sm font-medium'>TAGS</h4>
                    <div className='flex flex-wrap'>
                        {tags.map(tag => <Tag label={tag} />)}
                    </div>
                </aside>


                <main className='flex-1 flex flex-col gap-4'>
                    <div className='p-6 border rounded'>
                        <div className='mb-4'>
                            <DetailsAccordion />
                        </div>
                        <SharedInterests sharedInterests={sharedInterests} interests={interests} />
                    </div>

                    <div className='p-6 border rounded'>
                        <p>Added on {connection[0].created_at}</p>
                    </div>
                </main>

                <aside className='w-1/4 border rounded flex flex-col gap-3 p-6'>
                    <div className='border-b pb-2'>
                        <p className='font-medium'>
                            Lives In
                        </p>
                        <div className='text-sm flex items-center gap-2'>
                            <p className='text-2xl'>🇳🇬</p>
                            {connection[0].country}
                        </div>
                    </div>

                    <div className='border-b pb-2'>
                        <p className='font-medium mb-2'>
                            Company
                        </p>
                        <div className='text-sm flex items-center gap-2'>
                            <p>Facebook</p>
                        </div>
                    </div>

                    {/* TODO: use the actual social network icons */}
                    <div>
                        <p className='font-medium mb-2'>Contact Information</p>
                        <ul>
                            {contactInfo.map(info => (
                                <li><a
                                    href={info.value}
                                    target='_blank'
                                    rel='noopener noreferrer'
                                    className='flex gap-1 items-center underline'
                                >
                                    {info.icon}
                                    {info.type}
                                </a></li>
                            ))}
                        </ul>
                    </div>
                </aside>
            </section>
        </Layout>
    )
}

function ConnectionAvatar({ fullname }: { fullname: string }) {
    return (
        <Avatar className='h-32 w-32 border-4 border-white'>
            <AvatarImage src='' />
            {fullname && (
                <AvatarFallback className='text-5xl'>
                    {fullname.substring(0, 2).toUpperCase()}
                </AvatarFallback>
            )}
        </Avatar>
    )
}

function SharedInterests({ interests = [], sharedInterests = [] }: { interests?: string[], sharedInterests?: string[] }) {
    return (
        <section className='flex w-[80%] py-4'>
            <section className='flex-1 border-r px-3'>
                <h3 className='uppercase text-sm mb-2 font-medium'>Interests</h3>
                <ul className='ml-4'>
                    {interests.map(interest => <li className='list-disc text-sm'>{interest}</li>)}
                </ul>
            </section>
            <section className='flex-1 px-3'>
                <h3 className='uppercase text-sm mb-2 font-medium'>Common Interests</h3>
                <ul className='ml-4'>
                    {sharedInterests.map(interest => <li className='list-disc text-sm'>{interest}</li>)}
                </ul>
            </section>
        </section>
    )
}

function DetailsAccordion() {
    return (
        <Accordion type='single' collapsible>
            <AccordionItem value="item-1">
                <AccordionTrigger>
                    <div className='flex justify-start gap-2'>
                        <HeartHandshake />
                        <span>
                            How did you meet?
                        </span>
                    </div>
                </AccordionTrigger>

                <AccordionContent>
                    We met at a party last week.
                </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2">
                <AccordionTrigger>
                    <div className='flex justify-start gap-2'>
                        <BarChart4 />
                        <span>What value can you give them?</span>
                    </div>
                </AccordionTrigger>
                <AccordionContent>
                    I can help them scale their business, since they have a youtube channel. I can help them share their content whenever
                </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3 border-b-none">
                <AccordionTrigger>
                    <div className='flex justify-start gap-2'>
                        <PieChart />
                        <span>What value can they give you?</span>
                    </div>
                </AccordionTrigger>
                <AccordionContent>
                    Yes. It adheres to the WAI-ARIA design pattern.
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    )
}
export default ConnectionDetails

