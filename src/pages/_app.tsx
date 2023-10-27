import { createPagesBrowserClient } from '@supabase/auth-helpers-nextjs'
import { SessionContextProvider, type Session } from '@supabase/auth-helpers-react'
import { type AppProps } from 'next/app'
import { useState } from 'react'
import { type Database } from '../../lib/database.types'

import '../../src/index.css'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

// const queryClient = new QueryClient({
//     defaultOptions: {
//         queries: {
//             retry: 0
//         }
//     }
// })

function MyApp({
    Component,
    pageProps,
}: AppProps<{
    initialSession: Session
}>) {
    const [supabaseClient] = useState(() => createPagesBrowserClient<Database>())

    return (
        <SessionContextProvider
            supabaseClient={supabaseClient}
            initialSession={pageProps.initialSession}
        >
            {/* <QueryClientProvider client={queryClient}> */}
            <Component {...pageProps} />
            {/* </QueryClientProvider> */}
        </SessionContextProvider>
    )
}

export default MyApp