import mongoose from 'mongoose'

const personalInfoSchema = new mongoose.Schema(
  {
    full_name: { type: String, default: '' },
    profession: { type: String, default: '' },
    email: { type: String, default: '' },
    phone: { type: String, default: '' },
    location: { type: String, default: '' },
    linkedin: { type: String, default: '' },
    website: { type: String, default: '' },
    image: { type: String, default: '' },
    image_preview: { type: String, default: '' },
  },
  { _id: false },
)

const experienceSchema = new mongoose.Schema(
  {
    company: { type: String, default: '' },
    position: { type: String, default: '' },
    start_date: { type: String, default: '' },
    end_date: { type: String, default: '' },
    description: { type: String, default: '' },
    is_current: { type: Boolean, default: false },
  },
  { _id: true },
)

const educationSchema = new mongoose.Schema(
  {
    institution: { type: String, default: '' },
    degree: { type: String, default: '' },
    field: { type: String, default: '' },
    graduation_date: { type: String, default: '' },
    gpa: { type: String, default: '' },
  },
  { _id: true },
)

const projectSchema = new mongoose.Schema(
  {
    name: { type: String, default: '' },
    type: { type: String, default: '' },
    description: { type: String, default: '' },
  },
  { _id: true },
)

const certificateSchema = new mongoose.Schema(
  {
    name: { type: String, default: '' },
    issuer: { type: String, default: '' },
    issue_date: { type: String, default: '' },
    credential_url: { type: String, default: '' },
    description: { type: String, default: '' },
  },
  { _id: true },
)

const resumeSchema = new mongoose.Schema(
  {
    userId: { type: String, default: 'demo-user', index: true },
    title: { type: String, required: true, trim: true, default: 'Untitled Resume' },
    personal_info: { type: personalInfoSchema, default: () => ({}) },
    professional_summary: { type: String, default: '' },
    experience: { type: [experienceSchema], default: [] },
    education: { type: [educationSchema], default: [] },
    project: { type: [projectSchema], default: [] },
    certificates: { type: [certificateSchema], default: [] },
    skills: { type: [String], default: [] },
    template: { type: String, default: 'ats' },
    accent_color: { type: String, default: '#111827' },
    public: { type: Boolean, default: false },
  },
  { timestamps: true },
)

export const Resume = mongoose.model('Resume', resumeSchema)
