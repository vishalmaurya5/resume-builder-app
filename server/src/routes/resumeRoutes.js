import express from 'express'
import {
  createResume,
  deleteResume,
  getPublicResume,
  getResume,
  getResumes,
  updateResume,
} from '../controllers/resumeController.js'
import { asyncHandler } from '../middleware/asyncHandler.js'
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()

router.get('/public/:id', asyncHandler(getPublicResume))

router.use(protect)

router.route('/').get(asyncHandler(getResumes)).post(asyncHandler(createResume))
router.route('/:id').get(asyncHandler(getResume)).put(asyncHandler(updateResume)).delete(asyncHandler(deleteResume))

export default router
