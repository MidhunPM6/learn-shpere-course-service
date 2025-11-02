import ICourseRepository from '../domain/IRepository/ICourseRepository'

export default class CreateLectureUseCase {
  constructor (private courseRepository: ICourseRepository) {
    this.courseRepository = courseRepository
  }

  async execute (
    courseId: string,
    title: string,
    videoUrl: string
  ): Promise<void> {
    if (!courseId || !title || !videoUrl) {
      throw new Error('All this feilds are required')
    }

    try {
      const lecture = {
        title,
        videoUrl
      }

      const lectures = await this.courseRepository.addLectureToCourse(
        courseId,
        lecture
      )
    } catch (error: any) {
      console.error(error.message)
      throw new Error(`Failed to create lecture: ${error.message}`)
    }
  }
}
