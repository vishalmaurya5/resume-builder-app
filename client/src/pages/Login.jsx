import { Show, SignInButton, SignUpButton, UserButton, useAuth } from '@clerk/react'
import { ArrowRight, FileText, LockKeyhole } from 'lucide-react'
import { Link, Navigate, useLocation } from 'react-router-dom'

const Login = () => {
  const { isLoaded, isSignedIn } = useAuth()
  const location = useLocation()
  const redirectTo = location.state?.from?.pathname || '/app'

  if (!isLoaded) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
        <div className="rounded-lg border border-slate-200 bg-white px-5 py-4 text-sm font-medium text-slate-500 shadow-sm">
          Loading secure sign in...
        </div>
      </div>
    )
  }

  if (isSignedIn) {
    return <Navigate to={redirectTo} replace />
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-100 px-4 py-10 text-slate-900 sm:px-6">
      <section className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/70 sm:p-8">
        <Link to="/" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-800 transition hover:text-slate-950">
          <span className="inline-flex size-10 items-center justify-center rounded-xl bg-slate-950 text-white">
            <FileText className="size-5" />
          </span>
          Resume Builder
        </Link>

        <div className="mt-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-600">
            <LockKeyhole className="size-3.5" />
            Secure login
          </div>
          <h1 className="mt-4 text-3xl font-semibold tracking-tight text-slate-950">Welcome back</h1>
          <p className="mt-2 text-sm leading-6 text-slate-500">
            Sign in to create, edit, and manage your professional resumes.
          </p>
        </div>

        <div className="mt-8">
          <Show when="signed-out">
            <div className="grid gap-3">
              <SignInButton mode="modal">
                <button className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-slate-950 px-4 text-sm font-semibold text-white transition hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2">
                  Login to dashboard
                  <ArrowRight className="size-4" />
                </button>
              </SignInButton>

              <SignUpButton mode="modal">
                <button className="inline-flex h-12 w-full items-center justify-center rounded-lg border border-slate-300 bg-white px-4 text-sm font-semibold text-slate-800 transition hover:border-slate-400 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-300 focus:ring-offset-2">
                  Create account
                </button>
              </SignUpButton>
            </div>
          </Show>

          <Show when="signed-in">
            <div className="flex justify-center">
              <UserButton />
            </div>
          </Show>
        </div>

        <p className="mt-6 text-center text-xs leading-5 text-slate-400">
          Your account keeps saved resume drafts and profile details ready when you return.
        </p>
      </section>
    </main>
  )
}

export default Login
