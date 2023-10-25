import { ContactInfo } from '@/components/connections/contact-info'
import { MetaDetails } from '@/components/connections/details'
import { DetailsContext } from '@/components/connections/details-context'
import { Layout } from '@/components/ui/layout'
import { FRIENDSHIP_LEVEL_COLORS, FRIENDSHIP_LEVEL_LOOKUP, cn } from '@/lib/utils'
import { Link, RouteProps, useRouter } from '@tanstack/react-router'
import { ChevronLeft } from 'lucide-react'

function ConnectionDetails({ useLoader }: RouteProps) {
    const { connection } = useLoader()
    return (
        <Layout>
            <BackButton />
            <div className='mb-10'>
                <div className='bg-gray-100 w-full h-72 relative'>
                    <span className={cn('select-none absolute p-3 py-2 right-4 top-4 text-white rounded', FRIENDSHIP_LEVEL_COLORS[connection[0].friendshiplevel])}>
                        {FRIENDSHIP_LEVEL_LOOKUP[connection[0].friendshiplevel]}
                    </span>
                </div>
            </div>
            <section className='flex gap-4 h-full'>
                <MetaDetails connection={connection[0]} />
                <DetailsContext connection={connection[0]} />
                <ContactInfo connection={connection[0]} />
            </section>
        </Layout>
    )
}

function BackButton() {
    const router = useRouter()
    const goBack = () => {
        router.history.back();
    }

    return (
        <Link onClick={goBack} className='flex mb-4 items-center'>
            <ChevronLeft />
            <span>Back</span>
        </Link>
    )
}

export default ConnectionDetails

