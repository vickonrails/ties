import { supabase } from '@/core/supabase';
import { AuthSession, Session } from "@supabase/supabase-js";
import { Outlet } from "@tanstack/react-router";
import { createContext, useEffect, useState } from "react";

export interface AuthContextInterface {
    session: AuthSession | null
}

export const AuthenticationContext = createContext<AuthContextInterface>({ session: null })
const AuthProvider = AuthenticationContext.Provider;

export default function Root() {
    const [session, setSession] = useState<Session | null>(null)
    const [loadingSession, setLoadingSession] = useState(true)

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setLoadingSession(false)
            setSession(session ?? null)
        })

        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session)
        })

        return () => subscription.unsubscribe()
    }, [])

    const contextValue = {
        session
    }

    if (loadingSession) {
        return <p>Is Loading...</p>
    }

    return (
        <AuthProvider value={contextValue}>
            <Outlet />
        </AuthProvider>
    )
}