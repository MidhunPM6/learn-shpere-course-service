import CreateCourseUseCase from '../../application/CreateCourseUseCase'
import CourseRepository from '../repository/CourseRepository'

export const courseContainer = () => {
  const createCourseRepository = new CourseRepository()
  
  return {
    createCourseUseCase : new CreateCourseUseCase(createCourseRepository)
  } 
}

