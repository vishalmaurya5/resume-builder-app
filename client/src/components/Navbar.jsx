import { Link } from 'react-router-dom'
import { Show, SignInButton, SignUpButton, UserButton, useUser } from '@clerk/react'

const Navbar = () => {
    const { user } = useUser()
  return (
    <div className='shadow bg-white'>
        <nav className='flex items-center justify-between max-w-7xl mx-auto px-4 py-3.5 text-slate-800 transition-all'>
            <Link to='/'>
            <img src='/logo.svg' alt='logo' className='h-11 w-auto'/>
            </Link>
            <div className='flex items-center gap-4 text-sm'>
                <Show when="signed-out">
                    <SignInButton>
                        <button className='bg-white hover:bg-slate-50 border border-gray-300 px-5 py-1.5 rounded-full active:scale-95 transition-all'>Login</button>
                    </SignInButton>
                    <SignUpButton>
                        <button className='bg-slate-900 hover:bg-slate-700 text-white border border-slate-900 px-5 py-1.5 rounded-full active:scale-95 transition-all'>Sign up</button>
                    </SignUpButton>
                </Show>
                <Show when="signed-in">
                    <p className='max-sm:hidden'>Hi, {user?.firstName || user?.fullName || 'User'}</p>
                    <UserButton />
                </Show>
            </div>

        </nav>
      
    </div>
  )
}

export default Navbar
