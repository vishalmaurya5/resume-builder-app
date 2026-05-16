const MissingClerkKey = () => (
  <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
    <div className="max-w-lg rounded-lg border border-amber-200 bg-white p-6 shadow-sm">
      <h1 className="text-xl font-semibold text-slate-900">Clerk key required</h1>
      <p className="mt-2 text-sm leading-6 text-slate-600">
        Add your Clerk publishable key to <code className="rounded bg-slate-100 px-1">client/.env.local</code>, then
        restart the frontend.
      </p>
      <pre className="mt-4 overflow-auto rounded bg-slate-950 p-4 text-sm text-slate-50">
        VITE_CLERK_PUBLISHABLE_KEY=YOUR_PUBLISHABLE_KEY
      </pre>
    </div>
  </div>
)

export default MissingClerkKey

