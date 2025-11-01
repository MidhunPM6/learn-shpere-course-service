import { Response, Request } from 'express'
import { HTTP_STATUS } from '../../infrastructure/StatusCode'
import { courseContainer } from '../../infrastructure/container/CourseContainer'

const { createCourseUseCase } = courseContainer()

export default class CourseController {
  async createCourse (req: Request, res: Response): Promise<void> {
    const { title, description, lecturerId } = req.body

    console.log(title, description)
    if (!title || !description || !lecturerId) {
      res
        .status(HTTP_STATUS.BAD_REQUEST)
        .json({ message: 'Missing required fields' })
      return
    }

    try {
      const response = await createCourseUseCase.execute({
        title,
        description,
        lecturerId
      })

      res
        .status(HTTP_STATUS.CREATED)
        .json({ data: response, message: 'Course created successfully' })
      return
    } catch (error) {
      res
        .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
        .json({ message: `Failed to create course` })
      return
    }
  }
}
