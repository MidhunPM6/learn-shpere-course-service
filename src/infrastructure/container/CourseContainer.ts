import CreateCourseUseCase from '../../application/CreateCourseUseCase'
import CourseRepository from '../repository/CourseRepository'
import GetCourseUseCase from '../../application/GetCourseUseCase'
import CreateLectureUseCase from '../../application/CreateLectureUseCase'

export const courseContainer = () => {
  const courseRepository = new CourseRepository()
  
  
  return {
    createCourseUseCase : new CreateCourseUseCase(courseRepository),
    getCourseUseCase : new GetCourseUseCase(courseRepository),
    createLectureUseCase  : new CreateLectureUseCase(courseRepository)
    
  } 
}

