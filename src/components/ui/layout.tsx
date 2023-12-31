import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { Database } from "lib/database.types";
import Link from "next/link";
import { useRouter } from "next/router";
import { ReactNode, useMemo } from "react";
import { Button } from ".";

export function Layout({ children }: { children: ReactNode }) {
    const client = useSupabaseClient<Database>()
    const router = useRouter()

    const handleLogout = async () => {
        await client.auth.signOut();
        router.push('/auth');
    }

    const year = useMemo(() => new Date().getFullYear(), [])

    return (
        <div className="flex flex-col gap-6">
            <nav className="px-4 py-6 flex justify-between items-center gap-6">
                <Link href='/' className='flex gap-3'>
                    <div className='h-6 w-6 bg-black' />
                    <p>Ties</p>
                </Link>

                <Button size='sm' onClick={handleLogout}>Log Out</Button>
            </nav>

            <main className="px-7 h-full max-w-7xl m-auto w-full min-h-[500px]">
                {children}
            </main>

            <footer className="p-7 ">
                <p className="text-center text-muted-foreground">
                    Ties &copy; {year}
                </p>
            </footer>
        </div>
    )
}