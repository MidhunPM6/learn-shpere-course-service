import CreateCourseUseCase from '../../application/CreateCourseUseCase'
import CourseRepository from '../repository/CourseRepository'
import GetCourseUseCase from '../../application/GetCourseUseCase'
import CreateLectureUseCase from '../../application/CreateLectureUseCase'
import LectureUploadUseCase  from '../../application/LectureUploadUseCase'
import VideoUploadService from '../../infrastructure/services/VideoUploadSevice'

export const courseContainer = () => {
  const courseRepository = new CourseRepository()
  const videoUploadService = new VideoUploadService()
  
  
  return {
    createCourseUseCase : new CreateCourseUseCase(courseRepository),
    getCourseUseCase : new GetCourseUseCase(courseRepository),
    createLectureUseCase  : new CreateLectureUseCase(courseRepository),
    lectureUploadUseCase : new LectureUploadUseCase(videoUploadService,courseRepository)
    
  } 
}

