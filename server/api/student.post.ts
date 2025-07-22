export default defineEventHandler(async(event) => {
  const body = await readBody(event)
  if (body.firstName && body.lastName && body.streetAddress && body.city && body.zipCode && body.county && body.schoolName && body.birthDay) {
    try{
      const student = await event.context.client.student.create({
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