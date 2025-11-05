import {
  CreateMultipartUploadCommand,
  UploadPartCommand,
  CompleteMultipartUploadCommand
} from '@aws-sdk/client-s3'
import { AWS_BUCKET_NAME } from '../../config'
import { s3 } from './multerS3Services'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'

export default class VideoUploadService {
  private buketName: string
  constructor () {
    this.buketName = AWS_BUCKET_NAME
    console.log('this is bucket' + this.buketName)
  }

  startMultipartUpload = async (fileName: string, fileType: string) => {
    if (!fileName || !fileType) {
      throw new Error('File name and file type is required')
    }

    try {
      const command = new CreateMultipartUploadCommand({
        Bucket: this.buketName,
        Key: fileName,
        ContentType: fileType
      })

      const response = await s3.send(command)
      return response
    } catch (error) {
      throw new Error('Something went  wrong ')
    }
  }

  getPresignedUrlForPart = async (
    uploadId: string,
    partNumber: number,
    key: string
  ) => {
    if (!uploadId || !partNumber || !key) {
      throw new Error('File name and file type is required')
    }

    try {
      const command = new UploadPartCommand({
        Bucket: this.buketName,
        Key: key,
        UploadId: uploadId,
        PartNumber: partNumber
      })

      const url = await getSignedUrl(s3, command, { expiresIn: 3600 })
      return url
    } catch (error) {
      throw new Error('Something went  wrong ')
    }
  }

  completeMultipartUpload = async (
    uploadId: string,
    key: string,
    parts: { ETag: string; PartNumber: number }[]
  ) => {
   
    
    try {
        
        if (!uploadId || !parts || !key) {
          throw new Error('File name and file type is required')
        }

        console.log("this is parts " +parts);
        
    
        const command = new CompleteMultipartUploadCommand({
          Bucket: this.buketName,
          Key: key,
          UploadId: uploadId,
          MultipartUpload: { Parts: parts }
        })
          const response = await s3.send(command)
          console.log(response);
          
          return response
    } catch (error) {
        
    }
}
}

