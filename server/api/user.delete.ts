



export default defineEventHandler(async(event) => {
    
    const body = await readBody(event)
    let user = null
    let error = null

    if(body.id)
        await event.context.client.user.delete({
            where: {
            id: body.id,
            },
      }).then((response) => {
        user = response
      }).catch(async (e) =>{
        error = e
      })

      if(error)
        return createError({statusCode: 500, statusMessage: "Server Delete Error"})

    return user
  })
  