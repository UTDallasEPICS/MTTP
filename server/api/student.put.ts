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
    const phoneNumber = body.phoneNumber
    const studentEmail = body.studentEmail
    const schoolName = body.schoolName


    if(!(streetAddress && firstName && lastName && city && zipCode && county && authorId && studentId && phoneNumber && studentEmail && schoolName))  return createError({statusCode: 400, statusMessage: "Missing Data"})

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
                streetAddress: body.streetAddress,
                city: body.city,
                zipCode: body.zipcode,
                county: body.county,
                authorId: body.authorId,
                phoneNumber: body.phoneNumber,
                studentEmail: body.studentEmail,
                schoolName: body.schoolName,
            },
        })
        

    return student
  })