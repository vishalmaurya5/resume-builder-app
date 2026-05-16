import { Show, SignInButton, SignUpButton, UserButton, useAuth } from '@clerk/react'
import { ArrowRight, CheckCircle2, FileText, LayoutTemplate, LockKeyhole, Printer } from 'lucide-react'
import { Link, Navigate, useLocation } from 'react-router-dom'

const loginHighlights = [
  { icon: LayoutTemplate, text: 'Choose professional ATS-friendly templates' },
  { icon: FileText, text: 'Build resumes with structured sections' },
  { icon: Printer, text: 'Preview, print, save, and share confidently' },
]

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
    <main className="min-h-screen bg-slate-50 px-4 py-6 text-slate-900 sm:px-6 lg:px-10">
      <div className="mx-auto flex min-h-[calc(100vh-48px)] max-w-6xl flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl shadow-slate-200/70 lg:grid lg:grid-cols-[1.08fr_0.92fr]">
        <section className="relative overflow-hidden bg-slate-950 p-8 text-white sm:p-10 lg:p-12">
          <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(34,197,94,0.22),transparent_45%),linear-gradient(45deg,rgba(59,130,246,0.14),transparent_50%)]" />
          <div className="relative z-10 flex h-full flex-col justify-between gap-10">
            <div>
              <Link to="/" className="inline-flex items-center gap-2 text-sm font-semibold text-white/85 transition hover:text-white">
                <span className="inline-flex size-9 items-center justify-center rounded-lg bg-green-500 text-white">
                  <FileText className="size-5" />
                </span>
                Resume Builder
              </Link>

              <div className="mt-12 max-w-xl">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-green-300">Professional workspace</p>
                <h1 className="mt-4 text-4xl font-semibold leading-tight sm:text-5xl">
                  Sign in and continue building your resume.
                </h1>
                <p className="mt-5 max-w-lg text-base leading-7 text-slate-300">
                  Manage every version of your resume from one secure dashboard with live previews, clean templates, and
                  print-ready output.
                </p>
              </div>

              <div className="mt-8 grid gap-3">
                {loginHighlights.map((item) => {
                  const Icon = item.icon
                  return (
                    <div key={item.text} className="flex items-center gap-3 text-sm text-slate-200">
                      <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-lg bg-white/10 text-green-300">
                        <Icon className="size-4" />
                      </span>
                      {item.text}
                    </div>
                  )
                })}
              </div>
            </div>

            <ResumePreviewCard />
          </div>
        </section>

        <section className="flex items-center justify-center p-6 sm:p-10">
          <div className="w-full max-w-md">
            <div className="mb-8">
              <div className="inline-flex items-center gap-2 rounded-full border border-green-200 bg-green-50 px-3 py-1 text-xs font-semibold text-green-700">
                <LockKeyhole className="size-3.5" />
                Secure account access
              </div>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-950">Welcome back</h2>
              <p className="mt-2 text-sm leading-6 text-slate-500">
                Login to manage saved resumes, create new templates, and share your professional profile.
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
              <Show when="signed-out">
                <div className="grid gap-3">
                  <SignInButton mode="modal">
                    <button className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-slate-900 px-4 text-sm font-semibold text-white transition hover:bg-slate-700">
                      Login to dashboard
                      <ArrowRight className="size-4" />
                    </button>
                  </SignInButton>

                  <SignUpButton mode="modal">
                    <button className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-4 text-sm font-semibold text-slate-800 transition hover:border-green-300 hover:bg-green-50 hover:text-green-700">
                      Create new account
                    </button>
                  </SignUpButton>
                </div>
              </Show>

              <Show when="signed-in">
                <div className="flex justify-center">
                  <UserButton />
                </div>
              </Show>

              <div className="mt-5 border-t border-slate-100 pt-5">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">After login you can</p>
                <div className="mt-3 grid gap-2 text-sm text-slate-600">
                  {['Create unlimited resume drafts', 'Save resume data securely', 'Share public resume links'].map(
                    (item) => (
                      <div key={item} className="flex items-center gap-2">
                        <CheckCircle2 className="size-4 text-green-600" />
                        <span>{item}</span>
                      </div>
                    ),
                  )}
                </div>
              </div>
            </div>

            <p className="mt-5 text-center text-xs leading-5 text-slate-400">
              By continuing, you can access the protected resume dashboard and saved resume records.
            </p>
          </div>
        </section>
      </div>
    </main>
  )
}

const ResumePreviewCard = () => (
  <div className="hidden max-w-md rounded-xl border border-white/10 bg-white/10 p-4 shadow-2xl shadow-black/30 backdrop-blur sm:block">
    <div className="rounded-lg bg-white p-5 text-slate-900">
      <div className="flex items-start justify-between border-b border-slate-200 pb-3">
        <div>
          <p className="text-xl font-bold tracking-wide">AVINASH KR</p>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-green-700">Web Developer</p>
        </div>
        <div className="size-12 rounded-full bg-slate-200" />
      </div>

      <div className="mt-4 grid grid-cols-[0.8fr_1fr] gap-5">
        <div className="space-y-4 border-r border-slate-200 pr-4">
          <PreviewSection title="Contact" lines={['demo@resume.dev', 'Bangalore', 'linkedin.com/in/name']} />
          <PreviewSection title="Skills" lines={['React', 'JavaScript', 'MongoDB']} />
        </div>
        <div className="space-y-4">
          <PreviewSection
            title="Summary"
            lines={['Professional developer focused on clean interfaces, reusable components, and reliable delivery.']}
          />
          <PreviewSection title="Experience" lines={['Frontend Developer', 'Built responsive resume workflows.']} />
        </div>
      </div>
    </div>
  </div>
)

const PreviewSection = ({ title, lines }) => (
  <div>
    <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.22em] text-green-700">{title}</p>
    <div className="space-y-1.5">
      {lines.map((line) => (
        <p key={line} className="text-[11px] leading-4 text-slate-600">
          {line}
        </p>
      ))}
    </div>
  </div>
)

export default Login
