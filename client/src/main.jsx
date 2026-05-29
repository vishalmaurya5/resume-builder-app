// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {BrowserRouter} from 'react-router-dom'
import { ClerkProvider } from '@clerk/react'
import MissingClerkKey from './components/MissingClerkKey.jsx'

const app = (
  <BrowserRouter>
    <App />
  </BrowserRouter>
)

createRoot(document.getElementById('root')).render(
  import.meta.env.VITE_CLERK_PUBLISHABLE_KEY ? (
    <ClerkProvider publishableKey={import.meta.env.VITE_CLERK_PUBLISHABLE_KEY} afterSignOutUrl="/">{app}</ClerkProvider>
  ) : (
    <MissingClerkKey />
  ),
)
