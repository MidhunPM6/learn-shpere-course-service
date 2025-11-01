import CourseEnitity from '../enitity/CourseEnitity'

export default interface ICourseRepository {
  createCourse: (course: CourseEnitity) => Promise<CourseEnitity>
  getCourse: (lectureId: string) => Promise<CourseEnitity[]>
}
