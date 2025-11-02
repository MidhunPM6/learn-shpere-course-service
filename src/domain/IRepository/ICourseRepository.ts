import CourseEnitity from '../enitity/CourseEnitity'

export default interface ICourseRepository {
  createCourse: (course: CourseEnitity) => Promise<CourseEnitity>
  getCourse: (lectureId: string) => Promise<CourseEnitity[]>
  addLectureToCourse :(courseId :string ,lecture:{title :string , videoUrl: string} ) => Promise<void | null>
}
