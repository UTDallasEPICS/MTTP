import { PrismaClient } from '@prisma/client'
import { read } from 'fs'

const prisma = new PrismaClient()

export default defineEventHandler(async(event) => {
    
    const body = await readBody(event)

    let user = null
    let error = null

    if (body.name)
        await prisma.user.create({
            data: {
            name: body.name,
            email: body.email,
            role: body.role,
            },
        }).then((response) => {
            user = response
        }).catch(async (e) => {
            error = e
        })

    if (error) return createError({statusCode: 500, statusMessage: "Server Post Error"})


    return {
      user: user
    }
  })
  