
import { Request, Response } from 'express'
import { AWS_BUCKET_NAME } from '../../config'
import { courseContainer } from '../../infrastructure/container/CourseContainer'
import { HTTP_STATUS } from '../../infrastructure/StatusCode'

const { lectureUploadUseCase } = courseContainer()

export default class CourseUploadController {
  private buketName: string
  constructor () {
    this.buketName = AWS_BUCKET_NAME
  }

  startMultipartUploadController = async (req: Request, res: Response) => {
    try {
      const { fileName, fileType } = req.body
      if (!fileName || !fileType) {
        return res
          .status(HTTP_STATUS.NOT_FOUND)
          .json({ message: 'File Name and File Type is required' })
      }
      const response = await lectureUploadUseCase.startUpload(
        fileName,
        fileType
      )
      return res.status(HTTP_STATUS.OK).json({
        uploadId: response.UploadId,
        key: response.Key
      })
    } catch (error) {
      console.error(error)
      res
        .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
        .json({ message: 'Error starting multipart upload' })
    }
  }

  getPresignedUrlForPartController = async (req: Request, res: Response) => {
    try {
      const { uploadId, partNumber, key } = req.body

      if (!uploadId || !partNumber || !key) {
        return res
          .status(HTTP_STATUS.NOT_FOUND)
          .json({ messgae: 'All the fields are required ' })
      }

      const response = await lectureUploadUseCase.getPresignedUrl(
        uploadId,
        partNumber,
        key
      )
      if (!response) {
        return res
          .status(HTTP_STATUS.BAD_REQUEST)
          .json({ message: ' Something went wrong ' })
      }
      return res.status(HTTP_STATUS.OK).json({
        url: response
      })
    } catch (error) {
      console.error(error)
      res
        .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
        .json({ message: 'Error generating presigned URL' })
    }
  }

  completeMultipartUploadController = async (req: Request, res: Response) => {
    try {
      const { uploadId, key, parts,title,courseId } = req.body
      
       
        
      if (!uploadId || !parts || !key || !title || !courseId) {
        return res
          .status(HTTP_STATUS.NOT_FOUND)
          .json({ messgae: 'All the fields are required ' })
      }

      const response = await lectureUploadUseCase.completeUpload(
        uploadId,
        key,
        parts,
        title,
        courseId
      )
      if (!response) {
        return res
          .status(HTTP_STATUS.BAD_REQUEST)
          .json({ message: ' Something went wrong ' })
      }
      return res.status(HTTP_STATUS.OK).json({
        location : response.Location
      })
    } catch (error) {
      console.error(error)
      res
        .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
        .json({ message: 'Error generating presigned URL' })
    }
}
}
