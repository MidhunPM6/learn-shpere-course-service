import { console } from 'node:inspector/promises'
import CourseEnitity from '../domain/enitity/CourseEnitity'
import ICourseRepository from '../domain/IRepository/ICourseRepository'


export default class CreateCourseUseCase {
  constructor (private courseRepository: ICourseRepository) {
    this.courseRepository = courseRepository
  }

  async execute ({
    title,
    description,
    lecturerId,
  }: CourseEnitity): Promise<CourseEnitity> {
    if (
      !title ||
      !description ||
      !lecturerId
    ) {
      throw new Error('Missing required fields')
    }
    try {
      const course = await this.courseRepository.createCourse({
        title,
        description,
        lecturerId,

      })
      console.log(course)
      if (!course) {
        throw new Error('Failed to create course')
      }
      return course
    } catch (error: any) {
      throw new Error(`Failed to create course: ${error.message}`)
    }
  }
}
