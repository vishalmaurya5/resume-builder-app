import { FilePenLineIcon, PencilIcon, PlusIcon, TrashIcon, XIcon } from 'lucide-react'
import { useAuth, useUser } from '@clerk/react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { resumeApi } from '../lib/api'
import { templateOptions } from '../lib/resumeTemplates'
import { sampleResumes } from '../lib/sampleResumes'
import ResumeTemplateRenderer from '../components/ResumeTemplateRenderer'

const colors = ['#9333ea', '#d97706', '#dc2626', '#0284c7', '#16a34a']

const getUserPersonalInfo = (user) => ({
  full_name: user?.fullName || [user?.firstName, user?.lastName].filter(Boolean).join(' '),
  email: user?.primaryEmailAddress?.emailAddress || '',
})

const getTemplatePreviewResume = (templateId, accentColor) => {
  const sampleResume =
    sampleResumes.find((resume) => resume.template === templateId) ||
    sampleResumes.find((resume) => resume.template === 'modern') ||
    sampleResumes[0]

  return {
    ...sampleResume,
    template: templateId,
    accent_color: accentColor,
  }
}

const Dashboard = () => {
  const [allResumes, setAllResumes] = useState([])
  const [showCreateResume, setShowCreateResume] = useState(false)
  const [editResumeId, setEditResumeId] = useState('')
  const [title, setTitle] = useState('')
  const [selectedTemplate, setSelectedTemplate] = useState('ats')
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const { getToken, isLoaded, isSignedIn } = useAuth()
  const { user } = useUser()
  const displayName = user?.firstName || user?.fullName || 'there'

  const navigate = useNavigate()

  useEffect(() => {
    let ignore = false

    const loadResumes = async () => {
      try {
        const token = await getToken()
        const resumes = await resumeApi.list(token)
        if (!ignore) setAllResumes(resumes)
      } catch (error) {
        if (!ignore) setError(error.message || 'Unable to load resumes')
      } finally {
        if (!ignore) setIsLoading(false)
      }
    }

    if (isLoaded && isSignedIn) loadResumes()

    return () => {
      ignore = true
    }
  }, [getToken, isLoaded, isSignedIn])

  const openBuilder = (id = 'new-resume') => {
    navigate(`/app/builder/${id}`)
  }

  const createResume = async (event) => {
    event.preventDefault()

    try {
      const token = await getToken()
      const newResume = await resumeApi.create(
        { title, template: selectedTemplate, personal_info: getUserPersonalInfo(user) },
        token,
      )
      setAllResumes((prev) => [newResume, ...prev])
      setShowCreateResume(false)
      setTitle('')
      setSelectedTemplate('ats')
      openBuilder(newResume._id)
    } catch (error) {
      setError(error.message || 'Unable to create resume')
    }
  }

  const editTitle = async (event) => {
    event.preventDefault()

    try {
      const token = await getToken()
      const updatedResume = await resumeApi.update(editResumeId, { title }, token)
      setAllResumes((prev) => prev.map((resume) => (resume._id === editResumeId ? updatedResume : resume)))
    } catch (error) {
      setError(error.message || 'Unable to update title')
    }

    setEditResumeId('')
    setTitle('')
  }

  const deleteResume = async (resumeId) => {
    if (window.confirm('Are you sure you want to delete this resume?')) {
      try {
        const token = await getToken()
        await resumeApi.remove(resumeId, token)
        setAllResumes((prev) => prev.filter((resume) => resume._id !== resumeId))
      } catch (error) {
        setError(error.message || 'Unable to delete resume')
      }
    }
  }

  return (
    <div>
      <div className="mx-auto max-w-7xl px-4 py-6">
        <p className="mb-6 bg-gradient-to-r from-slate-600 to-slate-700 bg-clip-text text-2xl font-medium text-transparent sm:hidden">
          Welcome {displayName}
        </p>

        <div className="flex flex-wrap items-start gap-4">
          <button
            type="button"
            onClick={() => {
              setSelectedTemplate('ats')
              setShowCreateResume(true)
            }}
            className="flex h-28 w-full flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-slate-300 bg-white text-slate-600 transition-all duration-300 hover:border-indigo-500 hover:shadow-lg sm:max-w-36"
          >
            <PlusIcon className="size-11 rounded-full bg-gradient-to-br from-indigo-300 to-indigo-500 p-2.5 text-white transition-all duration-300" />
            <p className="text-sm transition-all duration-300 hover:text-indigo-600">Create Resume</p>
          </button>

          {isLoading && (
            <div className="flex h-28 w-full items-center justify-center rounded-lg border border-slate-200 bg-white px-4 text-sm text-slate-500 sm:max-w-36">
              Loading resumes...
            </div>
          )}

          {error && <p className="w-full rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">{error}</p>}

          {!isLoading && !error && allResumes.length === 0 && (
            <div className="flex h-28 w-full items-center justify-center rounded-lg border border-slate-200 bg-white px-4 text-center text-sm text-slate-500 sm:max-w-44">
              No recent resumes yet.
            </div>
          )}

          {allResumes.map((resume, index) => {
            const baseColor = colors[index % colors.length]
            return (
              <button
                key={resume._id || index}
                type="button"
                onClick={() => openBuilder(resume._id)}
                className="group relative flex h-28 w-full flex-col items-center justify-center gap-2 rounded-lg border transition-all duration-300 hover:shadow-lg sm:max-w-36"
                style={{
                  background: `linear-gradient(135deg, ${baseColor}10, ${baseColor}40)`,
                  borderColor: `${baseColor}40`,
                }}
              >
                <FilePenLineIcon className="size-7 transition-all group-hover:scale-105" style={{ color: baseColor }} />
                <p className="line-clamp-2 px-2 text-center text-sm transition-all group-hover:scale-105" style={{ color: baseColor }}>
                  {resume.title}
                </p>
                <p className="absolute bottom-1 px-2 text-center text-[11px] text-slate-400 transition-all duration-300" style={{ color: `${baseColor}90` }}>
                  {new Date(resume.updatedAt).toLocaleDateString()}
                </p>
                <div
                  onClick={(event) => event.stopPropagation()}
                  className="absolute right-1 top-1 hidden items-center group-hover:flex"
                >
                  <TrashIcon
                    onClick={() => deleteResume(resume._id)}
                    className="size-7 rounded p-1.5 text-slate-700 transition-colors hover:bg-white/50"
                  />
                  <PencilIcon
                    onClick={() => {
                      setEditResumeId(resume._id)
                      setTitle(resume.title)
                    }}
                    className="size-7 rounded p-1.5 text-slate-700 transition-colors hover:bg-white/50"
                  />
                </div>
              </button>
            )
          })}
        </div>

        <hr className="my-6 border-slate-200" />

        <section className="mb-8">
          <div className="mb-3 flex flex-wrap items-end justify-between gap-3">
            <div>
              <h2 className="text-lg font-semibold text-slate-900">Resume templates</h2>
              <p className="text-sm text-slate-500">Choose from live template previews with filled dummy resume data.</p>
            </div>
          </div>

          <div className="grid gap-5 lg:grid-cols-2">
            {templateOptions.map((template, index) => {
              const baseColor = colors[index % colors.length]
              const previewResume = getTemplatePreviewResume(template.id, baseColor)
              return (
                <article
                  key={template.id}
                  className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md"
                >
                  <div className="grid gap-0 md:grid-cols-[minmax(0,1fr)_190px]">
                    <ResumeTemplatePreview
                      resume={previewResume}
                      accentColor={baseColor}
                      scale={0.43}
                      className="h-[360px] rounded-none border-0 border-r border-slate-200"
                    />
                    <div className="flex flex-col justify-between gap-4 p-4">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wide" style={{ color: baseColor }}>
                          {template.styleName}
                        </p>
                        <h3 className="mt-1 text-xl font-semibold text-slate-900">{template.name}</h3>
                        <p className="mt-2 text-sm leading-6 text-slate-500">{template.description}</p>
                        <div className="mt-4 rounded-md bg-slate-50 p-3">
                          <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Preview data</p>
                          <p className="mt-1 line-clamp-1 text-sm font-semibold text-slate-800">
                            {previewResume.personal_info?.full_name}
                          </p>
                          <p className="line-clamp-1 text-xs text-slate-500">{previewResume.personal_info?.profession}</p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedTemplate(template.id)
                          setShowCreateResume(true)
                        }}
                        className="rounded-md bg-slate-900 px-3 py-2 text-sm font-semibold text-white transition hover:bg-slate-700"
                      >
                        Use this template
                      </button>
                    </div>
                  </div>
                </article>
              )
            })}
          </div>
        </section>

      </div>

      {showCreateResume && (
        <ResumeModal title="Create a Resume" onClose={() => setShowCreateResume(false)} onSubmit={createResume}>
          <TitleInput title={title} setTitle={setTitle} />
          <p className="mb-3 rounded-md bg-slate-100 px-3 py-2 text-sm text-slate-600">
            Template: {templateOptions.find((template) => template.id === selectedTemplate)?.name}
          </p>
          <button className="w-full rounded bg-green-600 py-2 text-white transition-colors hover:bg-green-700">Create Resume</button>
        </ResumeModal>
      )}

      {editResumeId && (
        <ResumeModal title="Edit Resume Title" onClose={() => setEditResumeId('')} onSubmit={editTitle}>
          <TitleInput title={title} setTitle={setTitle} />
          <button className="w-full rounded bg-green-600 py-2 text-white transition-colors hover:bg-green-700">Update</button>
        </ResumeModal>
      )}
    </div>
  )
}

const TitleInput = ({ title, setTitle }) => (
  <input
    type="text"
    placeholder="Enter resume title"
    className="mb-4 w-full px-4 py-2"
    value={title}
    onChange={(event) => setTitle(event.target.value)}
    required
  />
)

const ResumeModal = ({ title, onClose, onSubmit, children }) => (
  <form onSubmit={onSubmit} onClick={onClose} className="fixed inset-0 z-10 flex items-center justify-center bg-black/70 backdrop-blur">
    <div onClick={(event) => event.stopPropagation()} className="relative w-full max-w-sm rounded-lg border bg-slate-50 p-6 shadow-md">
      <h2 className="mb-4 text-xl font-bold">{title}</h2>
      {children}
      <XIcon className="absolute right-4 top-4 cursor-pointer text-slate-400 transition-colors hover:text-slate-600" onClick={onClose} />
    </div>
  </form>
)

const ResumeTemplatePreview = ({ resume, accentColor, scale = 0.34, className = '' }) => {
  const previewResume = { ...resume, accent_color: accentColor }

  return (
    <div className={`overflow-hidden rounded-md border border-slate-200 bg-slate-200 shadow-inner ${className}`}>
      <div className="pointer-events-none origin-top-left" style={{ width: 795, transform: `scale(${scale})` }}>
        <ResumeTemplateRenderer data={previewResume} accentColor={accentColor} />
      </div>
    </div>
  )
}

export default Dashboard
