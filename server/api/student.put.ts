import { PrismaClient } from '@prisma/client'
import { read } from 'fs'

const prisma = new PrismaClient()

export default defineEventHandler(async(event) => {
    
    const body = await readBody(event)

    const studentId = body.studentId
    const firstName = body.firstName
    const lastName = body.lastName
    const streetNumber = body.streetNumber
    const streetAddress = body.streetAddress
    const city = body.city
    const zipCode = body.zipCode
    const county = body.county
    const authorId = body.authorId


    if(!(streetNumber && streetAddress && firstName && lastName && city && zipCode && county && authorId && studentId))  return createError({statusCode: 400, statusMessage: "Missing Data"})

    let student = null

    if(body.studentId)
        student = await prisma.student.update({
            where: {
                studentId: body.studentId
            },
            data: {
                firstName: body.firstName,
                lastName: body.lastname,
                streetNumber: body.streetNumber,
                streetAddress: body.street,
                city: body.city,
                zipCode: body.zipcode,
                county: body.county,
                authorId: body.authorId,
            },
        })
        

    return student
  })