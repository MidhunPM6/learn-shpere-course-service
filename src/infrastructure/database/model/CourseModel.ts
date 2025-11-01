import mongoose from 'mongoose'

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    requrired: true
  },
  description: {
    type: String,
    requrired: true
  },
  lecturerId: {
    type: String,
    requrired: true
  },
  lectures: {
    type: [{ title: String, videoUrl: String }],
    default: []
  },
  enrolledStudents: [
    { enrollId: String, enrollStudentId: mongoose.Schema.Types.ObjectId }
  ]
})

const CourseModel = mongoose.model('Course', courseSchema)

export default CourseModel
