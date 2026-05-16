import { useEffect, useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, Printer } from 'lucide-react'
import { resumeApi } from '../lib/api'
import { openResumePrintPreview } from '../lib/printResume'
import ResumeTemplateRenderer from '../components/ResumeTemplateRenderer'

const Preview = () => {
  const { resumeId } = useParams()
  const [resume, setResume] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const [isOpeningPrint, setIsOpeningPrint] = useState(false)
  const printRef = useRef(null)

  useEffect(() => {
    let ignore = false

    const loadPublicResume = async () => {
      setIsLoading(true)
      setError('')

      try {
        const publicResume = await resumeApi.getPublic(resumeId)
        if (!ignore) setResume(publicResume)
      } catch (error) {
        if (!ignore) setError(error.message || 'Unable to load resume')
      } finally {
        if (!ignore) setIsLoading(false)
      }
    }

    loadPublicResume()

    return () => {
      ignore = true
    }
  }, [resumeId])

  const handlePrint = async () => {
    setIsOpeningPrint(true)
    setError('')

    try {
      await openResumePrintPreview(printRef.current, resume?.title)
    } catch (error) {
      setError(error.message || 'Unable to open print preview')
    } finally {
      setIsOpeningPrint(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-100">
      <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3">
          <Link to="/" className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-900">
            <ArrowLeft className="size-4" />
            Home
          </Link>
          {resume && (
            <button
              type="button"
              onClick={handlePrint}
              disabled={isOpeningPrint}
              className="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-3 py-2 text-sm font-semibold text-white hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <Printer className="size-4" />
              {isOpeningPrint ? 'Opening' : 'Print / Save'}
            </button>
          )}
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-6">
        {isLoading && <p className="rounded-lg bg-white p-4 text-sm text-slate-500">Loading resume...</p>}
        {error && !isLoading && <p className="rounded-lg bg-red-50 p-4 text-sm text-red-600">{error}</p>}
        {resume && !isLoading && (
          <div className="overflow-auto rounded-lg bg-slate-200 p-4 shadow-inner">
            <div ref={printRef} className="mx-auto w-fit">
              <ResumeTemplateRenderer data={resume} accentColor={resume.accent_color} />
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

export default Preview
