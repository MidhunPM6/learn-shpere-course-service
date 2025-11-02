import { Response, Request } from 'express'
import { HTTP_STATUS } from '../../infrastructure/StatusCode'
import { courseContainer } from '../../infrastructure/container/CourseContainer'

const { createCourseUseCase, getCourseUseCase,createLectureUseCase } = courseContainer()

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



  async getCourse (req: Request, res: Response): Promise<void> {
    const {lectureId} = req.params
    
      console.log(lectureId);
      
    if (!lectureId) {
      res
        .status(HTTP_STATUS.UNAUTHORIZED)
        .json({ message: 'Invalid token or unauthorized' })
      return
    }
    console.log(lectureId)
    try {
      const response = await getCourseUseCase.execute(lectureId)
      res
        .status(HTTP_STATUS.ACCEPTED)
        .json({ data: response, message: 'Courses successfully fetched' })
      return
    } catch (error: any) {
      console.error(error)
      res
        .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
        .json({ message: `Internal server error ${error.message}` })
      return
    }
  }

  async addLectureToCourse(req: Request, res: Response): Promise<void> {
    const { courseId, title, videoUrl } = req.body;
    console.log(courseId);
    
    if (!courseId || !title || !videoUrl) {
      res
        .status(HTTP_STATUS.BAD_REQUEST)
        .json({ message: 'Missing required fields' });
      return;
    }

    try {
      await createLectureUseCase.execute(courseId,  title, videoUrl );
      res
        .status(HTTP_STATUS.OK)
        .json({ message: 'Lecture added to course successfully' });
      return;
    } catch (error: any) {
      console.error(error);
      res
        .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
        .json({ message: `Failed to add lecture to course: ${error.message}` });
      return;
    }
  }
}
