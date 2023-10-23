import { Link } from "@tanstack/react-router";

export default function Index() {
    return (
        <>
            <Link to='/auth'>Go to Sign In</Link>
            <p>Index Content</p>
        </>
    )
}