export const HOST = process.env.DOCKER_ENV ? 'mongo' : '127.0.0.1'
export const PORT = '27017'
export const DATABASE = process.env.JEST ? 'test-student-management-system' : 'student-management-system'
