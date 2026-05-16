import { useEffect, useMemo, useRef, useState } from 'react'
import { useAuth, useUser } from '@clerk/react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import {
  ArrowLeftIcon,
  Award,
  Briefcase,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Copy,
  FileText,
  FolderIcon,
  GraduationCap,
  Globe2,
  Link2,
  Lock,
  Palette,
  Printer,
  Plus,
  Save,
  Share2,
  Sparkles,
  Trash2,
  User,
} from 'lucide-react'
import PersonalInfoForm from '../components/PersonalInfoForm'
import ResumeTemplateRenderer from '../components/ResumeTemplateRenderer'
import { resumeApi } from '../lib/api'
import { openResumePrintPreview } from '../lib/printResume'
import { templateOptions } from '../lib/resumeTemplates'

const sections = [
  { id: 'template', name: 'Template', icon: Palette },
  { id: 'color', name: 'Color', icon: Palette },
  { id: 'personal', name: 'Personal Info', icon: User },
  { id: 'summary', name: 'Summary', icon: FileText },
  { id: 'experience', name: 'Experience', icon: Briefcase },
  { id: 'education', name: 'Education', icon: GraduationCap },
  { id: 'certificates', name: 'Certificates', icon: Award },
  { id: 'project', name: 'Projects', icon: FolderIcon },
  { id: 'skills', name: 'Skills', icon: Sparkles },
]

const accentColors = ['#111827', '#2563eb', '#0f766e', '#9333ea', '#d97706', '#dc2626']

const emptyResume = {
  _id: 'new-resume',
  title: 'Untitled Resume',
  personal_info: {
    full_name: '',
    profession: '',
    email: '',
    phone: '',
    location: '',
    linkedin: '',
    website: '',
  },
  professional_summary: '',
  experience: [],
  education: [],
  certificates: [],
  project: [],
  skills: [],
  template: 'ats',
  accent_color: '#111827',
  public: false,
}

const newItems = {
  experience: {
    position: '',
    company: '',
    start_date: '',
    end_date: '',
    is_current: false,
    description: '',
  },
  education: {
    degree: '',
    field: '',
    institution: '',
    graduation_date: '',
    gpa: '',
  },
  project: {
    name: '',
    type: '',
    description: '',
  },
  certificates: {
    name: '',
    issuer: '',
    issue_date: '',
    credential_url: '',
    description: '',
  },
}

const cloneResume = (resume) => ({
  ...emptyResume,
  ...resume,
  personal_info: { ...emptyResume.personal_info, ...resume?.personal_info },
  experience: resume?.experience?.length ? resume.experience : [],
  education: resume?.education?.length ? resume.education : [],
  certificates: resume?.certificates?.length ? resume.certificates : [],
  project: resume?.project?.length ? resume.project : [],
  skills: resume?.skills?.length ? resume.skills : [],
  template: resume?.template || 'ats',
  accent_color: resume?.accent_color || '#111827',
})

const getUserPersonalInfo = (user) => ({
  full_name: user?.fullName || [user?.firstName, user?.lastName].filter(Boolean).join(' '),
  email: user?.primaryEmailAddress?.emailAddress || '',
})

const mergeUserInfoForNewResume = (resume, user, enabled) => {
  if (!enabled) return resume

  const userInfo = getUserPersonalInfo(user)
  const nextPersonalInfo = { ...resume.personal_info }
  let changed = false

  Object.entries(userInfo).forEach(([field, value]) => {
    if (value && !nextPersonalInfo[field]) {
      nextPersonalInfo[field] = value
      changed = true
    }
  })

  return changed ? { ...resume, personal_info: nextPersonalInfo } : resume
}

const removeMongoIds = (items = []) =>
  items.map((item) => {
    const nextItem = { ...item }
    delete nextItem._id
    return nextItem
  })

const sanitizeResumeForApi = (resume) => {
  const image = resume.personal_info?.image
  const imagePreview = resume.personal_info?.image_preview

  return {
    title: resume.title,
    personal_info: {
      ...resume.personal_info,
      image: typeof image === 'string' ? image : '',
      image_preview: typeof imagePreview === 'string' && !imagePreview.startsWith('blob:') ? imagePreview : '',
    },
    professional_summary: resume.professional_summary,
    experience: removeMongoIds(resume.experience),
    education: removeMongoIds(resume.education),
    certificates: removeMongoIds(resume.certificates),
    project: removeMongoIds(resume.project),
    skills: resume.skills || [],
    template: resume.template,
    accent_color: resume.accent_color,
    public: Boolean(resume.public),
  }
}

const createResumeShareText = (resume, shareUrl = '') => {
  const info = resume.personal_info || {}
  const lines = [
    info.full_name || resume.title || 'Resume',
    info.profession,
    [info.email, info.phone, info.location].filter(Boolean).join(' | '),
    info.linkedin,
    info.website,
  ].filter(Boolean)

  if (resume.professional_summary) {
    lines.push('', 'Professional Summary', resume.professional_summary)
  }

  if (resume.experience?.length) {
    lines.push('', 'Experience')
    resume.experience.forEach((item) => {
      const roleLine = [item.position, item.company].filter(Boolean).join(' - ')
      if (roleLine) lines.push(roleLine)
      if (item.start_date || item.end_date || item.is_current) {
        lines.push(`${item.start_date || ''} - ${item.is_current ? 'Present' : item.end_date || ''}`)
      }
      if (item.description) lines.push(item.description)
    })
  }

  if (resume.education?.length) {
    lines.push('', 'Education')
    resume.education.forEach((item) => {
      const degreeLine = [item.degree, item.field && `in ${item.field}`].filter(Boolean).join(' ')
      const educationLine = [degreeLine, item.institution].filter(Boolean).join(' - ')
      if (educationLine) lines.push(educationLine)
      if (item.graduation_date) lines.push(item.graduation_date)
    })
  }

  if (resume.certificates?.length) {
    lines.push('', 'Certificates')
    resume.certificates.forEach((item) => {
      const certificateLine = [item.name, item.issuer].filter(Boolean).join(' - ')
      if (certificateLine) lines.push(certificateLine)
      if (item.issue_date) lines.push(item.issue_date)
      if (item.credential_url) lines.push(item.credential_url)
      if (item.description) lines.push(item.description)
    })
  }

  if (resume.project?.length) {
    lines.push('', 'Projects')
    resume.project.forEach((item) => {
      if (item.name) lines.push(item.name)
      if (item.type) lines.push(item.type)
      if (item.description) lines.push(item.description)
    })
  }

  if (resume.skills?.length) {
    lines.push('', 'Skills', resume.skills.filter(Boolean).join(', '))
  }

  if (shareUrl) {
    lines.push('', `View resume: ${shareUrl}`)
  }

  return lines.join('\n')
}

const TextInput = ({ label, className = '', ...props }) => (
  <label className={className}>
    <span className="mb-1 block text-sm font-medium text-slate-700">{label}</span>
    <input {...props} className="w-full px-3 py-2 text-sm" />
  </label>
)

const TextArea = ({ label, ...props }) => (
  <label>
    <span className="mb-1 block text-sm font-medium text-slate-700">{label}</span>
    <textarea {...props} className="min-h-28 w-full px-3 py-2 text-sm leading-relaxed" />
  </label>
)

const ResumeBuilder = () => {
  const { resumeId } = useParams()
  const navigate = useNavigate()
  const { getToken, isLoaded, isSignedIn } = useAuth()
  const { user } = useUser()
  const loadResume = () => cloneResume(emptyResume)

  const [loadedResumeId, setLoadedResumeId] = useState(resumeId)
  const [resumeData, setResumeData] = useState(() => loadResume(resumeId))
  const [activeSectionIndex, setActiveSectionIndex] = useState(0)
  const [saved, setSaved] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [saveError, setSaveError] = useState('')
  const [isOpeningPrint, setIsOpeningPrint] = useState(false)
  const [printError, setPrintError] = useState('')
  const [isUpdatingVisibility, setIsUpdatingVisibility] = useState(false)
  const [shareMessage, setShareMessage] = useState('')
  const resumePreviewRef = useRef(null)
  const shareMenuRef = useRef(null)
  const [shareMenuOpen, setShareMenuOpen] = useState(false)

  const activeSection = sections[activeSectionIndex]
  const visibleResumeData = useMemo(
    () => mergeUserInfoForNewResume(resumeData, user, !resumeId || resumeId === 'new-resume'),
    [resumeData, resumeId, user],
  )
  if (resumeId !== loadedResumeId) {
    setLoadedResumeId(resumeId)
    setResumeData(loadResume(resumeId))
    setActiveSectionIndex(0)
    setSaved(false)
  }

  useEffect(() => {
    document.title = `${resumeData.title || 'Resume'} | Resume Builder`
  }, [resumeData.title])

  useEffect(() => {
    if (!shareMenuOpen) return undefined

    const handlePointerDown = (event) => {
      if (shareMenuRef.current && !shareMenuRef.current.contains(event.target)) {
        setShareMenuOpen(false)
      }
    }

    document.addEventListener('mousedown', handlePointerDown)
    return () => document.removeEventListener('mousedown', handlePointerDown)
  }, [shareMenuOpen])

  useEffect(() => {
    let ignore = false

    const loadResumeFromApi = async () => {
      if (!resumeId || resumeId.startsWith('local-') || resumeId === 'new-resume') return

      try {
        const token = await getToken()
        const apiResume = await resumeApi.get(resumeId, token)
        if (!ignore) {
          setLoadedResumeId(resumeId)
          setResumeData(cloneResume(apiResume))
          setSaved(false)
        }
      } catch (error) {
        console.warn('Using local resume data because the API resume could not be loaded.', error)
      }
    }

    if (isLoaded && isSignedIn) loadResumeFromApi()

    return () => {
      ignore = true
    }
  }, [getToken, isLoaded, isSignedIn, resumeId])

  const updateResume = (field, value) => {
    setSaved(false)
    setResumeData((prev) => ({ ...prev, [field]: value }))
  }

  const updatePersonalInfo = (field, value) => {
    setSaved(false)
    setResumeData((prev) => ({
      ...prev,
      personal_info: { ...prev.personal_info, [field]: value },
    }))
  }

  const updateListItem = (sectionId, index, field, value) => {
    setSaved(false)
    setResumeData((prev) => ({
      ...prev,
      [sectionId]: prev[sectionId].map((item, itemIndex) =>
        itemIndex === index ? { ...item, [field]: value } : item,
      ),
    }))
  }

  const addListItem = (sectionId) => {
    setSaved(false)
    setResumeData((prev) => ({
      ...prev,
      [sectionId]: [...prev[sectionId], { ...newItems[sectionId] }],
    }))
  }

  const removeListItem = (sectionId, index) => {
    setSaved(false)
    setResumeData((prev) => ({
      ...prev,
      [sectionId]: prev[sectionId].filter((_, itemIndex) => itemIndex !== index),
    }))
  }

  const updateSkill = (index, value) => {
    setSaved(false)
    setResumeData((prev) => ({
      ...prev,
      skills: prev.skills.map((skill, skillIndex) => (skillIndex === index ? value : skill)),
    }))
  }

  const addSkill = () => {
    setSaved(false)
    setResumeData((prev) => ({ ...prev, skills: [...prev.skills, ''] }))
  }

  const removeSkill = (index) => {
    setSaved(false)
    setResumeData((prev) => ({
      ...prev,
      skills: prev.skills.filter((_, skillIndex) => skillIndex !== index),
    }))
  }

  const handleSave = async () => {
    setIsSaving(true)
    setSaveError('')

    try {
      const payload = sanitizeResumeForApi(visibleResumeData)
      const token = await getToken()

      if (!token) {
        throw new Error('Please sign in again before saving.')
      }

      const savedResume =
        resumeData._id === 'new-resume' || resumeData._id?.startsWith('local-')
          ? await resumeApi.create(payload, token)
          : await resumeApi.update(resumeData._id, payload, token)

      setResumeData(cloneResume(savedResume))
      setLoadedResumeId(savedResume._id)
      setSaved(true)

      if (resumeData._id !== savedResume._id) {
        navigate(`/app/builder/${savedResume._id}`, { replace: true })
      }
    } catch (error) {
      setSaveError(error.message || 'Unable to save resume')
      setSaved(false)
    } finally {
      setIsSaving(false)
    }
  }

  const handlePrintPreview = async () => {
    setPrintError('')
    setIsOpeningPrint(true)

    try {
      await openResumePrintPreview(resumePreviewRef.current, resumeData.title)
    } catch (error) {
      setPrintError(error.message || 'Unable to open print preview')
    } finally {
      setIsOpeningPrint(false)
    }
  }

  const handleToggleVisibility = async () => {
    setPrintError('')
    setShareMessage('')

    if (resumeData._id === 'new-resume' || resumeData._id?.startsWith('local-')) {
      setPrintError('Save the resume before changing visibility.')
      return
    }

    setIsUpdatingVisibility(true)

    try {
      const token = await getToken()
      const updatedResume = await resumeApi.update(resumeData._id, { public: !visibleResumeData.public }, token)
      setResumeData(cloneResume(updatedResume))
      setSaved(true)
      setShareMessage(updatedResume.public ? 'Resume is public.' : 'Resume is private.')
    } catch (error) {
      setPrintError(error.message || 'Unable to update visibility')
    } finally {
      setIsUpdatingVisibility(false)
    }
  }

  const getPublicShareUrl = () => {
    const hasSavedId = resumeData._id && resumeData._id !== 'new-resume' && !resumeData._id.startsWith('local-')
    return hasSavedId && visibleResumeData.public ? `${window.location.origin}/view/${resumeData._id}` : ''
  }

  const handleShareResume = async () => {
    setPrintError('')
    setShareMessage('')
    setShareMenuOpen(false)

    const shareUrl = getPublicShareUrl()
    const shareText = createResumeShareText(visibleResumeData, shareUrl)
    const shareTitle = visibleResumeData.title || visibleResumeData.personal_info?.full_name || 'Resume'

    try {
      if (navigator.share) {
        await navigator.share({
          title: shareTitle,
          text: shareText,
          ...(shareUrl ? { url: shareUrl } : {}),
        })
        setShareMessage('Resume shared.')
        return
      }

      await navigator.clipboard.writeText(shareText)
      setShareMessage(shareUrl ? 'Resume text and link copied.' : 'Resume text copied.')
    } catch (error) {
      if (error.name === 'AbortError') return
      window.prompt('Copy this resume text:', shareText)
      setShareMessage('Resume text ready.')
    }
  }

  const handleCopyPublicLink = async () => {
    setPrintError('')
    setShareMessage('')
    setShareMenuOpen(false)

    const shareUrl = getPublicShareUrl()

    if (!shareUrl) {
      setPrintError('Save the resume and make it public before copying its link.')
      return
    }

    try {
      await navigator.clipboard.writeText(shareUrl)
      setShareMessage('Public resume link copied.')
    } catch {
      window.prompt('Copy this public resume link:', shareUrl)
      setShareMessage('Public resume link ready.')
    }
  }

  const goNext = () => setActiveSectionIndex((index) => Math.min(index + 1, sections.length - 1))
  const goPrevious = () => setActiveSectionIndex((index) => Math.max(index - 1, 0))

  const handleTemplateSelect = (templateId) => {
    updateResume('template', templateId)
    setActiveSectionIndex(1)
  }

  const renderForm = () => {
    if (activeSection.id === 'personal') {
      return <PersonalInfoForm data={visibleResumeData.personal_info} onChange={updatePersonalInfo} />
    }

    if (activeSection.id === 'summary') {
      return (
        <div className="space-y-5">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">Professional summary</h2>
            <p className="text-sm text-slate-500">Write 3-4 lines with role, experience, strengths, and value.</p>
          </div>
          <TextArea
            label="Summary"
            value={resumeData.professional_summary}
            onChange={(event) => updateResume('professional_summary', event.target.value)}
            placeholder="Detail-oriented professional with experience in..."
          />
        </div>
      )
    }

    if (activeSection.id === 'experience') {
      return (
        <ListSection title="Professional experience" onAdd={() => addListItem('experience')}>
          {resumeData.experience.map((item, index) => (
            <EditorBlock key={index} title={item.position || `Experience ${index + 1}`} onRemove={() => removeListItem('experience', index)}>
              <div className="grid gap-4 sm:grid-cols-2">
                <TextInput label="Position" value={item.position} onChange={(event) => updateListItem('experience', index, 'position', event.target.value)} />
                <TextInput label="Company" value={item.company} onChange={(event) => updateListItem('experience', index, 'company', event.target.value)} />
                <TextInput label="Start date" type="month" value={item.start_date} onChange={(event) => updateListItem('experience', index, 'start_date', event.target.value)} />
                <TextInput label="End date" type="month" value={item.end_date} disabled={item.is_current} onChange={(event) => updateListItem('experience', index, 'end_date', event.target.value)} />
              </div>
              <label className="mt-3 flex items-center gap-2 text-sm text-slate-700">
                <input
                  type="checkbox"
                  checked={Boolean(item.is_current)}
                  onChange={(event) => updateListItem('experience', index, 'is_current', event.target.checked)}
                  className="size-4 rounded border-slate-300"
                />
                I currently work here
              </label>
              <div className="mt-4">
                <TextArea
                  label="Achievements"
                  value={item.description}
                  onChange={(event) => updateListItem('experience', index, 'description', event.target.value)}
                  placeholder="Use one achievement per line. The ATS template turns each line into a bullet."
                />
              </div>
            </EditorBlock>
          ))}
        </ListSection>
      )
    }

    if (activeSection.id === 'education') {
      return (
        <ListSection title="Education" onAdd={() => addListItem('education')}>
          {resumeData.education.map((item, index) => (
            <EditorBlock key={index} title={item.degree || `Education ${index + 1}`} onRemove={() => removeListItem('education', index)}>
              <div className="grid gap-4 sm:grid-cols-2">
                <TextInput label="Degree" value={item.degree} onChange={(event) => updateListItem('education', index, 'degree', event.target.value)} />
                <TextInput label="Field" value={item.field} onChange={(event) => updateListItem('education', index, 'field', event.target.value)} />
                <TextInput label="Institution" className="sm:col-span-2" value={item.institution} onChange={(event) => updateListItem('education', index, 'institution', event.target.value)} />
                <TextInput label="Graduation date" type="month" value={item.graduation_date} onChange={(event) => updateListItem('education', index, 'graduation_date', event.target.value)} />
                <TextInput label="GPA" value={item.gpa} onChange={(event) => updateListItem('education', index, 'gpa', event.target.value)} />
              </div>
            </EditorBlock>
          ))}
        </ListSection>
      )
    }

    if (activeSection.id === 'certificates') {
      return (
        <ListSection title="Certificates" onAdd={() => addListItem('certificates')}>
          {resumeData.certificates.map((item, index) => (
            <EditorBlock key={index} title={item.name || `Certificate ${index + 1}`} onRemove={() => removeListItem('certificates', index)}>
              <div className="grid gap-4 sm:grid-cols-2">
                <TextInput label="Certificate name" value={item.name} onChange={(event) => updateListItem('certificates', index, 'name', event.target.value)} />
                <TextInput label="Issuer" value={item.issuer} onChange={(event) => updateListItem('certificates', index, 'issuer', event.target.value)} />
                <TextInput label="Issue date" type="month" value={item.issue_date} onChange={(event) => updateListItem('certificates', index, 'issue_date', event.target.value)} />
                <TextInput label="Credential URL" value={item.credential_url} onChange={(event) => updateListItem('certificates', index, 'credential_url', event.target.value)} />
              </div>
              <div className="mt-4">
                <TextArea
                  label="Notes"
                  value={item.description}
                  onChange={(event) => updateListItem('certificates', index, 'description', event.target.value)}
                  placeholder="Add skills covered, score, credential ID, or a short note."
                />
              </div>
            </EditorBlock>
          ))}
        </ListSection>
      )
    }

    if (activeSection.id === 'project') {
      return (
        <ListSection title="Projects" onAdd={() => addListItem('project')}>
          {resumeData.project.map((item, index) => (
            <EditorBlock key={index} title={item.name || `Project ${index + 1}`} onRemove={() => removeListItem('project', index)}>
              <div className="grid gap-4 sm:grid-cols-2">
                <TextInput label="Project name" value={item.name} onChange={(event) => updateListItem('project', index, 'name', event.target.value)} />
                <TextInput label="Type" value={item.type} onChange={(event) => updateListItem('project', index, 'type', event.target.value)} />
              </div>
              <div className="mt-4">
                <TextArea
                  label="Description"
                  value={item.description}
                  onChange={(event) => updateListItem('project', index, 'description', event.target.value)}
                  placeholder="Describe impact, tools, and results."
                />
              </div>
            </EditorBlock>
          ))}
        </ListSection>
      )
    }

    if (activeSection.id === 'skills') {
      return (
        <div className="space-y-5">
          <SectionHeader title="Skills" buttonLabel="Add skill" onAdd={addSkill} />
          <div className="space-y-3">
            {resumeData.skills.map((skill, index) => (
              <div key={index} className="flex gap-2">
                <input
                  value={skill}
                  onChange={(event) => updateSkill(index, event.target.value)}
                  placeholder="Skill"
                  className="w-full px-3 py-2 text-sm"
                />
                <IconButton label="Remove skill" onClick={() => removeSkill(index)}>
                  <Trash2 className="size-4" />
                </IconButton>
              </div>
            ))}
          </div>
        </div>
      )
    }

    if (activeSection.id === 'template') {
      return (
        <div className="space-y-6">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">Choose template</h2>
            <p className="text-sm text-slate-500">Pick a resume layout first. The preview updates immediately.</p>
          </div>

          <div className="grid gap-3">
            {templateOptions.map((template) => (
              <button
                key={template.id}
                type="button"
                onClick={() => handleTemplateSelect(template.id)}
                className={`flex items-center justify-between rounded-lg border p-4 text-left transition ${
                  resumeData.template === template.id
                    ? 'border-blue-500 bg-blue-50 text-blue-900'
                    : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                }`}
              >
                <span>
                  <span className="block font-semibold">{template.name}</span>
                  <span className="block text-xs font-medium uppercase tracking-wide text-slate-400">
                    {template.styleName}
                  </span>
                  <span className="text-sm text-slate-500">{template.description}</span>
                </span>
                {resumeData.template === template.id && <Check className="size-5" />}
              </button>
            ))}
          </div>
        </div>
      )
    }

    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">Choose color</h2>
          <p className="text-sm text-slate-500">Select the accent color after choosing a template.</p>
        </div>

        <div>
          <p className="mb-3 text-sm font-medium text-slate-700">Accent color</p>
          <div className="flex flex-wrap gap-3">
            {accentColors.map((color) => (
              <button
                key={color}
                type="button"
                aria-label={`Use ${color}`}
                onClick={() => updateResume('accent_color', color)}
                className={`size-9 rounded-full border-2 ${
                  resumeData.accent_color === color ? 'border-slate-900 ring-2 ring-slate-300' : 'border-white'
                }`}
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        </div>
      </div>
    )
  }

  const publicShareUrl = getPublicShareUrl()

  return (
    <div>
      <div className="mx-auto max-w-7xl px-4 py-6">
        <Link to="/app" className="inline-flex items-center gap-2 text-sm text-slate-500 transition hover:text-slate-800">
          <ArrowLeftIcon className="size-4" />
          Back to Dashboard
        </Link>
      </div>

      <div className="mx-auto grid max-w-7xl gap-6 px-4 pb-10 xl:grid-cols-[470px_1fr]">
        <section className="rounded-lg border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 p-5">
            <div className="mb-4 flex items-center justify-between gap-4">
              <div>
                <input
                  value={resumeData.title}
                  onChange={(event) => updateResume('title', event.target.value)}
                  className="w-full border-0 px-0 py-0 text-xl font-semibold text-slate-900 focus:ring-0"
                  aria-label="Resume title"
                />
                <p className="mt-1 text-sm text-slate-500">Complete each section, then save your resume.</p>
                {saveError && <p className="mt-1 text-sm text-red-600">{saveError}</p>}
              </div>
              <button
                type="button"
                onClick={handleSave}
                disabled={isSaving}
                className="inline-flex shrink-0 items-center gap-2 rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {saved ? <Check className="size-4" /> : <Save className="size-4" />}
                {isSaving ? 'Saving' : saved ? 'Saved' : 'Save'}
              </button>
            </div>

            <div className="h-1.5 overflow-hidden rounded-full bg-slate-100">
              <div
                className="h-full rounded-full bg-blue-600 transition-all"
                style={{ width: `${(activeSectionIndex / (sections.length - 1)) * 100}%` }}
              />
            </div>

            <div className="mt-4 grid gap-1" style={{ gridTemplateColumns: `repeat(${sections.length}, minmax(0, 1fr))` }}>
              {sections.map((section, index) => {
                const Icon = section.icon
                const active = index === activeSectionIndex
                return (
                  <button
                    key={section.id}
                    type="button"
                    onClick={() => setActiveSectionIndex(index)}
                    title={section.name}
                    className={`flex h-10 items-center justify-center rounded-md transition ${
                      active ? 'bg-blue-600 text-white' : 'bg-slate-50 text-slate-500 hover:bg-slate-100'
                    }`}
                  >
                    <Icon className="size-4" />
                  </button>
                )
              })}
            </div>
          </div>

          <div className="min-h-[560px] p-5">{renderForm()}</div>

          <div className="flex items-center justify-between border-t border-slate-200 p-4">
            <button
              type="button"
              onClick={goPrevious}
              disabled={activeSectionIndex === 0}
              className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ChevronLeft className="size-4" />
              Previous
            </button>

            <p className="text-sm font-medium text-slate-500">{activeSection.name}</p>

            <button
              type="button"
              onClick={goNext}
              disabled={activeSectionIndex === sections.length - 1}
              className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Next
              <ChevronRight className="size-4" />
            </button>
          </div>
        </section>

        <section className="min-w-0">
          <div className="sticky top-6 rounded-lg border border-slate-200 bg-slate-100 p-4 shadow-sm">
            <div className="mb-3 flex items-center justify-between">
              <div>
                <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-600">Live preview</h2>
                {printError && <p className="mt-1 text-xs text-red-600">{printError}</p>}
                {shareMessage && <p className="mt-1 text-xs text-emerald-600">{shareMessage}</p>}
              </div>
              <div className="flex flex-wrap items-center justify-end gap-2">
                <span className="rounded-full bg-white px-3 py-1 text-xs font-medium text-slate-500">
                  {templateOptions.find((item) => item.id === visibleResumeData.template)?.name}
                </span>
                <div ref={shareMenuRef} className="relative">
                  <button
                    type="button"
                    onClick={() => setShareMenuOpen((open) => !open)}
                    aria-haspopup="menu"
                    aria-expanded={shareMenuOpen}
                    className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 shadow-sm transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
                  >
                    <Share2 className="size-4" />
                    Share resume
                    <ChevronDown className={`size-3.5 transition ${shareMenuOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {shareMenuOpen && (
                    <div
                      role="menu"
                      className="absolute right-0 z-30 mt-2 w-72 overflow-hidden rounded-xl border border-slate-200 bg-white p-1.5 text-left shadow-xl shadow-slate-200/80"
                    >
                      <button
                        type="button"
                        role="menuitem"
                        onClick={handleShareResume}
                        className="flex w-full items-start gap-3 rounded-lg p-3 text-left transition hover:bg-slate-50"
                      >
                        <span className="mt-0.5 inline-flex size-8 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-700">
                          <Copy className="size-4" />
                        </span>
                        <span>
                          <span className="block text-sm font-semibold text-slate-900">Share as text</span>
                          <span className="mt-0.5 block text-xs leading-5 text-slate-500">
                            Send clean resume details through email, chat, or any app.
                          </span>
                        </span>
                      </button>

                      <button
                        type="button"
                        role="menuitem"
                        onClick={handleCopyPublicLink}
                        disabled={!publicShareUrl}
                        className="flex w-full items-start gap-3 rounded-lg p-3 text-left transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        <span className="mt-0.5 inline-flex size-8 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-700">
                          <Link2 className="size-4" />
                        </span>
                        <span>
                          <span className="block text-sm font-semibold text-slate-900">Copy public link</span>
                          <span className="mt-0.5 block text-xs leading-5 text-slate-500">
                            {publicShareUrl ? 'Copy a live preview link for recruiters.' : 'Save and set Public to enable this.'}
                          </span>
                        </span>
                      </button>
                    </div>
                  )}
                </div>
                <button
                  type="button"
                  onClick={handleToggleVisibility}
                  disabled={isUpdatingVisibility}
                  className="inline-flex items-center gap-2 rounded-lg bg-white px-3 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {visibleResumeData.public ? <Globe2 className="size-4" /> : <Lock className="size-4" />}
                  {isUpdatingVisibility ? 'Updating' : visibleResumeData.public ? 'Public' : 'Private'}
                </button>
                <button
                  type="button"
                  onClick={handlePrintPreview}
                  disabled={isOpeningPrint}
                  className="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-3 py-2 text-xs font-semibold text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <Printer className="size-4" />
                  {isOpeningPrint ? 'Opening' : 'Save'}
                </button>
              </div>
            </div>
            <div className="max-h-[calc(100vh-150px)] overflow-auto rounded bg-slate-200 p-4">
              <div className="origin-top-left scale-[0.82] sm:scale-90 lg:scale-[0.76] xl:scale-[0.82] 2xl:scale-90">
                <div ref={resumePreviewRef}>
                  <ResumeTemplateRenderer data={visibleResumeData} accentColor={visibleResumeData.accent_color} />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

const SectionHeader = ({ title, buttonLabel, onAdd }) => (
  <div className="flex items-center justify-between gap-3">
    <div>
      <h2 className="text-lg font-semibold text-slate-900">{title}</h2>
      <p className="text-sm text-slate-500">Keep content concise and impact-focused.</p>
    </div>
    <button
      type="button"
      onClick={onAdd}
      className="inline-flex items-center gap-2 rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
    >
      <Plus className="size-4" />
      {buttonLabel}
    </button>
  </div>
)

const ListSection = ({ title, onAdd, children }) => (
  <div className="space-y-5">
    <SectionHeader title={title} buttonLabel="Add" onAdd={onAdd} />
    <div className="space-y-4">{children}</div>
  </div>
)

const IconButton = ({ label, onClick, children }) => (
  <button
    type="button"
    aria-label={label}
    title={label}
    onClick={onClick}
    className="inline-flex size-10 shrink-0 items-center justify-center rounded-lg border border-slate-300 text-slate-500 hover:bg-red-50 hover:text-red-600"
  >
    {children}
  </button>
)

const EditorBlock = ({ title, onRemove, children }) => (
  <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
    <div className="mb-4 flex items-center justify-between gap-3">
      <h3 className="font-semibold text-slate-800">{title}</h3>
      <IconButton label="Remove item" onClick={onRemove}>
        <Trash2 className="size-4" />
      </IconButton>
    </div>
    {children}
  </div>
)

export default ResumeBuilder
