import { PrismaClient } from '@prisma/client'
import { read } from 'fs'

const prisma = new PrismaClient()

export default defineEventHandler(async(event) => {
    
    const body = await readBody(event)

    const id = body.id
    const firstName = body.firstName
    const lastName = body.lastName
    const streetNumber = body.streetNumber
    const streetAddress = body.streetAddress
    const city = body.city
    const zipCode = body.zipCode
    const county = body.county
    const authorId = body.authorId
    const phoneNumber = body.phoneNumber
    const studentEmail = body.studentEmail
    const schoolName = body.schoolName


    if(!(streetAddress && firstName && lastName && city && zipCode && county && authorId && id && phoneNumber && studentEmail && schoolName))  return createError({statusCode: 400, statusMessage: "Missing Data"})

    let student = null

    if(body.id)
        student = await prisma.student.update({
            where: {
                id: body.id
            },
            data: {
                firstName: body.firstName,
                lastName: body.lastName,
                streetNumber: body.streetNumber,
                streetAddress: body.streetAddress,
                city: body.city,
                zipCode: body.zipCode,
                county: body.county,
                authorId: body.authorId,
                phoneNumber: body.phoneNumber,
                studentEmail: body.studentEmail,
                schoolName: body.schoolName,
            },
        })
        

    return student
  })