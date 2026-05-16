import mongoose from 'mongoose'
import { Resume } from '../models/Resume.js'

const getResumeIdFilter = (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) return null
  return { _id: id }
}

export const getResumes = async (req, res) => {
  const userId = req.user._id.toString()
  const resumes = await Resume.find({ userId }).sort({ updatedAt: -1 })
  res.json({ success: true, data: resumes })
}

export const createResume = async (req, res) => {
  const resume = await Resume.create({
    userId: req.user._id.toString(),
    title: req.body.title || 'Untitled Resume',
    ...req.body,
    userId: req.user._id.toString(),
  })

  res.status(201).json({ success: true, data: resume })
}

export const getResume = async (req, res) => {
  const filter = getResumeIdFilter(req.params.id)
  if (!filter) return res.status(404).json({ success: false, message: 'Resume not found' })

  const resume = await Resume.findOne({ ...filter, userId: req.user._id.toString() })
  if (!resume) return res.status(404).json({ success: false, message: 'Resume not found' })

  res.json({ success: true, data: resume })
}

export const getPublicResume = async (req, res) => {
  const filter = getResumeIdFilter(req.params.id)
  if (!filter) return res.status(404).json({ success: false, message: 'Resume not found' })

  const resume = await Resume.findOne({ ...filter, public: true })
  if (!resume) return res.status(404).json({ success: false, message: 'Resume is private or not found' })

  res.json({ success: true, data: resume })
}

export const updateResume = async (req, res) => {
  const filter = getResumeIdFilter(req.params.id)
  if (!filter) return res.status(404).json({ success: false, message: 'Resume not found' })

  const resume = await Resume.findOneAndUpdate({ ...filter, userId: req.user._id.toString() }, req.body, {
    new: true,
    runValidators: true,
  })

  if (!resume) return res.status(404).json({ success: false, message: 'Resume not found' })

  res.json({ success: true, data: resume })
}

export const deleteResume = async (req, res) => {
  const filter = getResumeIdFilter(req.params.id)
  if (!filter) return res.status(404).json({ success: false, message: 'Resume not found' })

  const resume = await Resume.findOneAndDelete({ ...filter, userId: req.user._id.toString() })
  if (!resume) return res.status(404).json({ success: false, message: 'Resume not found' })

  res.json({ success: true, data: resume })
}
