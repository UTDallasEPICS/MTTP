import { PrismaClient } from '@prisma/client'
import { read } from 'fs'

const prisma = new PrismaClient()

export default defineEventHandler(async(event) => {
    
    const body = await readBody(event)

    const userId = body.userId
    const firstName = body.firstName
    const lastName = body.lastName
    const email = body.email
    const role = body.role

    if(!(userId && firstName && lastName && email && role))  return createError({statusCode: 400, statusMessage: "Missing Data"})

    let user = null

    if(body.userId)
        user = await prisma.user.update({
            where: {
                userId: body.userId,
            },
            data: {
                firstName: body.firstName,
                lastName: body.lastName,
                email: body.email,
                role: body.role
            }
      })
        

    return user
  })
  