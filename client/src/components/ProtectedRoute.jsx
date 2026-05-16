import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '@clerk/react'

const ProtectedRoute = () => {
  const { isLoaded, isSignedIn } = useAuth()
  const location = useLocation()

  if (!isLoaded) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 text-sm text-slate-500">
        Checking your session...
      </div>
    )
  }

  if (!isSignedIn) {
    return <Navigate to="/login" replace state={{ from: location }} />
  }

  return <Outlet />
}

export default ProtectedRoute
