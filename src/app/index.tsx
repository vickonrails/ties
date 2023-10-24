import { Button } from "@/components/ui";
import { supabase } from "@/core/supabase";
import { Link, useNavigate } from "@tanstack/react-router";

export default function Index() {
    const navigate = useNavigate();
    const handleLogout = async () => {
        await supabase.auth.signOut();
        navigate({ to: '/auth' })
    }

    return (
        <>
            <Button onClick={handleLogout}>Log Out</Button>
            <p>Index Content</p>
            <Link
                to='/app/$friend'
                params={{ friend: '2' }}
            >
                Hello
            </Link>
        </>
    )
}