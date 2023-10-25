import { supabase } from "@/core/supabase";
import { Link, useNavigate } from "@tanstack/react-router";
import { ReactNode } from "react";
import { Button } from ".";

export function Layout({ children }: { children: ReactNode }) {
    const navigate = useNavigate();
    const handleLogout = async () => {
        await supabase.auth.signOut();
        navigate({ to: '/auth' })
    }

    return (
        <div className="flex flex-col gap-6">
            <nav className="px-4 py-6 flex justify-between items-center gap-6">
                <Link to='/app' className='flex gap-3'>
                    <div className='h-6 w-6 bg-black' />
                    <p>Ties</p>
                </Link>

                {/* <div className="flex-1">
                    <Link to='/app'>Friends</Link>
                </div> */}

                <Button size='sm' onClick={handleLogout}>Log Out</Button>
            </nav>

            <main className="px-7 h-full max-w-7xl m-auto w-full">
                {children}
            </main>

            <footer className="p-7 ">
                <p className="text-center">
                    This is just a dummy footer
                </p>
            </footer>
        </div>
    )
}