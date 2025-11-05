import { Router } from 'express'
import CourseController from '../controllers/CourseController'
import {upload} from '../../infrastructure/services/multerS3Services'

const courseController = new CourseController()


const {createCourse,getCourse,addLectureToCourse} = courseController

const router = Router()

router.post('/create-course',createCourse)
router.get('/get-course/:lectureId',getCourse)
router.post('/create-lecture', upload.single('video'), addLectureToCourse)

export default router
    