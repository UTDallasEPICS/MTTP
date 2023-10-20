import { PrismaClient } from '@prisma/client'
import { read } from 'fs'

const prisma = new PrismaClient()

export default defineEventHandler(async(event) => {
    
    const body = await readBody(event)

    const userId = body.userId
    const name = body.name
    const email = body.email
    const role = body.role

    if(!(userId && name && email && role))  return createError({statusCode: 400, statusMessage: "Missing Data"})

    let user = null

    if(body.userId)
        user = await prisma.user.update({
            where: {
                userId: body.userId,
            },
            data: {
                name: body.name,
                email: body.email,
                role: body.role
            }
      })
        

    return user
  })
  