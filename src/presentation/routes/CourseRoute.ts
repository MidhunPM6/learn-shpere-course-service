import { Router } from 'express'
import CourseController from '../controllers/CourseController'

const courseController = new CourseController()


const {createCourse,getCourse,addLectureToCourse} = courseController

const router = Router()

router.post('/create-course',createCourse)
router.get('/get-course/:lectureId',getCourse)
router.post('/create-lecture',addLectureToCourse)

export default router
