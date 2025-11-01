import CourseEnitity from '../../domain/enitity/CourseEnitity'
import ICourseRepository from '../../domain/IRepository/ICourseRepository'
import CourseModel from '../database/model/CourseModel'

export default class CourseRepository implements ICourseRepository {
  async createCourse (course: CourseEnitity): Promise<CourseEnitity> {
    try {
      const courseDoc = await CourseModel.create({
        title: course.title,
        description: course.description,
        lecturerId: course.lecturerId
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

  async getCourse (lectureId: string): Promise<CourseEnitity[]> {
    try {
      const courses = await CourseModel.find({ lecturerId: lectureId })
        .select('title description lecturerId lectures enrolledStudents')
        .lean()

      if (!courses || courses.length === 0) {
        throw new Error('No courses found for this lecturer')
      }

      return courses.map((course: any) => ({
        id: course._id.toString(),
        title: course.title as string,
        description: course.description as string,
        lecturerId: course.lecturerId as string,
        lectures: course.lectures?.map((lecture: any) => ({
          title: lecture.title as string,
          videoUrl: lecture.videoUrl as string
        })),
        enrolledStudents: course.enrolledStudents?.map((student: any) => ({
          enrollId: student.enrollId as string,
          enrollStudentId:
            typeof student.enrollStudentId === 'object' &&
            student.enrollStudentId !== null
              ? (student.enrollStudentId as { toString(): string }).toString()
              : (student.enrollStudentId as string)
        })) as [{ enrollId: string; enrollStudentId: string }] | undefined
      }))
    } catch (error: any) {
      throw new Error(`Failed to get courses: ${error.message}`)
    }
  }
}
