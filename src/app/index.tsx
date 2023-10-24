import { Button } from "@/components/ui";
import ConnectionsTable from "@/components/ui/table";
import { supabase } from "@/core/supabase";
import { Link, useNavigate } from "@tanstack/react-router";
import { Database } from "lib/database.types";
import { ReactNode, useEffect, useState } from "react";

export type Connection = Database['public']['Tables']['connection']['Row']

export default function Index() {
    const [connections, setConnections] = useState<Connection[]>([])
    useEffect(() => {
        supabase.from('connection').select().then(res => {
            setConnections(res.data ?? [])
        })
    }, [])
    return (
        <Layout>
            <div className="flex justify-between">
                <h1 className="text-2xl font-medium mb-6">Connections</h1>
                <Button variant='outline'>Add Connection</Button>
            </div>

            <ConnectionsTable connections={connections} />
        </Layout>
    )
}

function Layout({ children }: { children: ReactNode }) {
    const navigate = useNavigate();
    const handleLogout = async () => {
        await supabase.auth.signOut();
        navigate({ to: '/auth' })
    }

    return (
        <div className="flex flex-col gap-6">
            <nav className="px-4 py-6 flex justify-between items-center gap-6">
                <div className='flex gap-3'>
                    <div className='h-6 w-6 bg-black' />
                    <h1>Ties</h1>
                </div>

                <div className="flex-1">
                    <Link>Friends</Link>
                </div>

                <Button size='sm' onClick={handleLogout}>Log Out</Button>
            </nav>

            <main className="px-7">
                {children}
            </main>
        </div>
    )
}