import { PrismaClient } from '@prisma/client'
import { read } from 'fs'

const prisma = new PrismaClient()

export default defineEventHandler(async(event) => {
    
    const body = await readBody(event)
    let user = null
    let error = null

    if(body.userId)
        await prisma.user.delete({
            where: {
            userId: body.userId,
            },
      }).then((response) => {
        user = response
      }).catch(async (e) =>{
        error = e
      })

      if(error)
        return createError({statusCode: 500, statusMessage: "Server Delete Error"})

    return user
  })
  