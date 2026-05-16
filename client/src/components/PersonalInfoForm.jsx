import { ImagePlus } from 'lucide-react'

const fields = [
  { name: 'full_name', label: 'Full name', placeholder: 'Your full name' },
  { name: 'profession', label: 'Profession', placeholder: 'Your profession' },
  { name: 'email', label: 'Email', placeholder: 'you@example.com', type: 'email' },
  { name: 'phone', label: 'Phone', placeholder: '+1 555 000 0000' },
  { name: 'location', label: 'Location', placeholder: 'City, Country' },
  { name: 'linkedin', label: 'LinkedIn', placeholder: 'linkedin.com/in/username' },
  { name: 'website', label: 'Website', placeholder: 'portfolio.com' },
]

const fileToDataUrl = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result)
    reader.onerror = reject
    reader.readAsDataURL(file)
  })

const PersonalInfoForm = ({ data, onChange }) => {
  const personalInfo = data || {}

  const handleImageChange = async (event) => {
    const file = event.target.files?.[0]
    if (!file) return

    const localPreviewUrl = await fileToDataUrl(file)

    onChange('image', localPreviewUrl)
    onChange('image_preview', localPreviewUrl)
  }

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-lg font-semibold text-slate-900">Personal information</h2>
        <p className="text-sm text-slate-500">This appears in the resume header and contact line.</p>
      </div>

      <label className="flex items-center gap-4 rounded-lg border border-dashed border-slate-300 bg-slate-50 p-4 text-sm text-slate-600 hover:border-blue-400 hover:bg-blue-50/40">
        <div className="flex size-12 items-center justify-center rounded-full bg-white text-blue-600 shadow-sm">
          <ImagePlus className="size-5" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="font-medium text-slate-800">Profile photo</p>
          <p className="truncate text-xs text-slate-500">Optional, useful for image templates</p>
        </div>
        <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
      </label>

      {personalInfo.image_preview && (
        <div className="flex items-center gap-3 rounded-lg border border-slate-200 bg-white p-3">
          <img
            src={personalInfo.image_preview}
            alt="Profile preview"
            className="size-16 rounded-full border border-slate-200 object-cover"
          />
          <div>
            <p className="text-sm font-medium text-slate-800">Profile photo selected</p>
            <p className="text-xs text-slate-500">This photo will be saved with the resume.</p>
          </div>
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        {fields.map((field) => (
          <label key={field.name} className={field.name === 'full_name' ? 'sm:col-span-2' : ''}>
            <span className="mb-1 block text-sm font-medium text-slate-700">{field.label}</span>
            <input
              type={field.type || 'text'}
              value={personalInfo[field.name] || ''}
              onChange={(event) => onChange(field.name, event.target.value)}
              placeholder={field.placeholder}
              className="w-full px-3 py-2 text-sm"
            />
          </label>
        ))}
      </div>
    </div>
  )
}

export default PersonalInfoForm
