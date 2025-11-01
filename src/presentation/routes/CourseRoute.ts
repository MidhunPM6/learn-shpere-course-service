import { Router } from 'express'
import CourseController from '../controllers/CourseController'

const courseController = new CourseController()

const {createCourse} = courseController

const router = Router()

router.post('/create-course',createCourse)

export default router
