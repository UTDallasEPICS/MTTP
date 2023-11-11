import { PrismaClient } from '@prisma/client'
import { read } from 'fs'

const prisma = new PrismaClient()

export default defineEventHandler(async(event) => {
    
    const body = await readBody(event)

    let student = null
    let error = null
    
    if (body.firstName && body.lastName && body.streetAddress && body.city && body.zipCode && body.county && body.authorId) {
        await prisma.student.create({
            data: {
                firstName: body.firstName,
                lastName: body.lastName,
                streetAddress: body.streetAddress,
                city: body.city,
                zipCode: body.zipCode,
                county: body.county,
                authorId: body.authorId,
            },
        }).then((response) => {
            student = response
        }).catch(async (e) => {
            error = e
        })
    }

    if (error) return createError({statusCode: 500, statusMessage: "Server Post Error"})


    return {
      student: student
    }
  })