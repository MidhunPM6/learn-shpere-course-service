import VideoUploadService from '../infrastructure/services/VideoUploadSevice'

export default class LectureUploadUseCase {
  constructor (private videoUploadService: VideoUploadService) {
    this.videoUploadService = videoUploadService
  }
  startUpload = async (fileName: string, fileType: string) => {
    try {
      if (!fileName || !fileType) {
        throw new Error('Required all fields')
      }

      const response = await this.videoUploadService.startMultipartUpload(
        fileName,
        fileType
      )
      if (!response) {
        throw new Error('Unable to start uploading ')
      }
      console.log(response)
      return response
    } catch (error: any) {
      throw new Error(`Failed to start uploading ${error.message}`)
    }
  }

  getPresignedUrl = async (
    uploadId: string,
    partNumber: number,
    key: string
  ) => {
    try {
      if (!uploadId || !partNumber || !key) {
        throw new Error('Required all fields')
      }

      const response = await this.videoUploadService.getPresignedUrlForPart(
        uploadId,
        partNumber,
        key
      )

      if (!response) {
        throw new Error('Error while getting presigned url ')
      }

      return response
    } catch (error: any) {
      throw new Error(`Failed to get presigned url ${error.message}`)
    }
  }

  completeUpload = async (
    uploadId: string,
    key: string,
    parts: { ETag: string; PartNumber: number }[]
  ) => {
    try {
      if (!uploadId || !key || !parts) {
        throw new Error('Required all fields')
      }
      const response = await this.videoUploadService.completeMultipartUpload(
        uploadId,
        key,
        parts
      )
      if (!response) {
        throw new Error('Uploading not completed  ')
      }
      console.log(response)
      return response
    } catch (error: any) {
      console.error(error)
      throw new Error(`Failed to upload file ${error.message}`)
    }
  }
}
