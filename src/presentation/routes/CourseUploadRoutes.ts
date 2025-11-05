import express from 'express'
import CourseUploadController from '../controllers/CourseUploadController'

const router = express.Router()
const courseUploadController = new CourseUploadController()

const {
 
  completeMultipartUploadController,
  getPresignedUrlForPartController,
  startMultipartUploadController
} = courseUploadController

router.post('/start-upload', startMultipartUploadController)
router.post('/get-presigned-url', getPresignedUrlForPartController)
router.post('/complete-upload', completeMultipartUploadController)


export default router
 