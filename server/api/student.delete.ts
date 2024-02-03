import { PrismaClient } from '@prisma/client'
import { read } from 'fs'

const prisma = new PrismaClient()

export default defineEventHandler(async(event) => {
    
    const body = await readBody(event)
    let student = null
    let error = null

    if(body.studentId)
        await prisma.student.delete({
            where: {
              studentId: body.studentId,
            },
      }).then((response) => {
        student = response
      }).catch(async (e) =>{
        error = e
      })

      if(error)
        return createError({statusCode: 500, statusMessage: "Server Delete Error"})

    return student
  })