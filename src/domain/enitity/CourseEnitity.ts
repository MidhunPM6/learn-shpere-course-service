export default interface CourseEnitity {
    id?: string
    title: string
    description: string
    lecturerId: string
    lectures?: { title: string, videoUrl: string }[]
    enrolledStudents?: [{ enrollId: string, enrollStudentId: string }]
}