import { PrismaClient } from '@prisma/client'
import { read } from 'fs'

const prisma = new PrismaClient()

export default defineEventHandler(async(event) => {
    
    const body = await readBody(event)
    if (body.firstName && body.lastName && body.streetAddress && body.city && body.zipCode && body.county && body.phoneNumber && body.studentEmail && body.schoolName && body.birthDay) {
        try{
            const student = await prisma.student.create({
                data: {
                    author: {
                        connect: {
                            id: body.authorId
                        }
                    },
                    firstName: body.firstName,
                    lastName: body.lastName,
                    streetNumber: body.streetNumber,
                    streetAddress: body.streetAddress,
                    city: body.city,
                    zipCode: body.zipCode,
                    county: body.county,
                    phoneNumber: body.phoneNumber,
                    studentEmail: body.studentEmail,
                    schoolName: body.schoolName,
                    birthDay: body.birthDay,
                },
            })
            
            return {
                student: student
            }
        } catch(err){
            console.log(err)
            return createError({statusCode: 500, statusMessage: "Server Post Error"})
        }
    }
})