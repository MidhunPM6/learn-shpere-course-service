import CourseEnitity from '../../domain/enitity/CourseEnitity'
import ICourseRepository from '../../domain/IRepository/ICourseRepository'
import CourseModel from '../database/model/CourseModel'

export default class CourseRepository implements ICourseRepository {
  async createCourse (course: CourseEnitity): Promise<CourseEnitity> {
    try {
      const courseDoc = await CourseModel.create({
        title: course.title,
        description: course.description
      })

      courseDoc.save()

      return {
        id: courseDoc._id.toString(),
        title: courseDoc.title as string,
        description: courseDoc.description as string,
        lecturerId: courseDoc.lecturerId as string
      }
    } catch (error: any) {
      throw new Error(`Failed to create course: ${error.message}`)
    }
  }
}
