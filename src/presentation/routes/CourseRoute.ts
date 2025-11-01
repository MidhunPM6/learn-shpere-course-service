import { Router } from 'express'
import CourseController from '../controllers/CourseController'

const courseController = new CourseController()


const {createCourse,getCourse} = courseController

const router = Router()

router.post('/create-course',createCourse)
router.get('/get-course/:lectureId',getCourse)

export default router
