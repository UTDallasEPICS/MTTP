export default defineEventHandler(async(event) => {
    
    const body = await readBody(event)
    let student = null
    let error = null

    if(body.id)
        await event.context.client.student.delete({
            where: {
              id: body.id,
            },
      }).then((response) => {
        student = response
      }).catch(async (e) =>{
        error = e
      })

      if(error)
        return createError({statusCode: 500, statusMessage: "Server Delete Error"})

    return student
  })