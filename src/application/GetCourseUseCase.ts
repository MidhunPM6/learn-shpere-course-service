import ICourseRepository from '../domain/IRepository/ICourseRepository'
import CourseEnitity from '../domain/enitity/CourseEnitity'

export default class GetCourseUseCase {
  constructor (private courseRepository: ICourseRepository) {
    this.courseRepository = courseRepository
  }

  async execute (lectureId: string): Promise<CourseEnitity[]> {
    try {
      const courses = await this.courseRepository.getCourse(lectureId)
      if (!courses || courses.length === 0) {
        return []
      }
      return courses
    } catch (error: any) {
      console.error(error.message)
      throw new Error(`Failed to fetch course details: ${error.message}`)
    }
  }
}    
