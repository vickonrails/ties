import { Button, Input } from '@/components/ui'

export default function Auth() {
    return (
        <section className='flex w-ful h-full'>

            <section className='flex flex-1 p-12'>
                <div className='flex gap-3'>
                    <div className='h-6 w-6 bg-black' />
                    <h1>Ties</h1>
                </div>
                <section className='w-80 m-auto flex flex-col gap-4'>
                    <div className='mb-3'>
                        <h2 className='text-xl font-medium mb-2'>Log in to your account</h2>
                        <p className='sm text-gray-600'>Ties is the most delightful way to stay in touch with people that mean a lot to you.</p>
                    </div>

                    <section className='flex w-full gap-2 mb-2'>
                        <GoogleButton />
                        <GithubButton />
                    </section>

                    <p className='mb-2 text-sm auth_divider relative'>
                        <span className='relative text-gray-600 bg-white px-3'>Or log in using Email</span>
                    </p>

                    <form className='flex flex-col gap-4'>
                        <Input placeholder='Enter email address' />
                        <Button>Send Magic Link</Button>
                    </form>
                </section>

                {/* <Link to='/'>Go into the app</Link> */}
            </section>

            <section className='sm:hidden md:block flex-1 bg-gray-100 auth_pattern' />
        </section>
    )
}

function GoogleButton() {
    return (
        <Button variant='outline' className='flex-1'>
            Google
        </Button>
    )
}

function GithubButton() {
    return (
        <Button variant='outline' className='flex-1'>
            {/* <Github /> */}
            GitHub
        </Button>
    )
}