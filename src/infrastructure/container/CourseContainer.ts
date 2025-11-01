import CreateCourseUseCase from '../../application/CreateCourseUseCase'
import CourseRepository from '../repository/CourseRepository'
import GetCourseUseCase from '../../application/GetCourseUseCase'

export const courseContainer = () => {
  const courseRepository = new CourseRepository()
  
  
  return {
    createCourseUseCase : new CreateCourseUseCase(courseRepository),
    getCourseUseCase : new GetCourseUseCase(courseRepository)
  } 
}

