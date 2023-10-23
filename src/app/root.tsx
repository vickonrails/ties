import { Outlet } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from '@/core/supabase'
import { Session } from "@supabase/supabase-js";

export default function Root() {
    const [session, setSession] = useState<Session | null>(null)

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session)
        })

        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session)
        })

        return () => subscription.unsubscribe()
    }, [])

    // TODO: do something with the session

    console.log({ session })

    return (
        <Outlet />
    )
}