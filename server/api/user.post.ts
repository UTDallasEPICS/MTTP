



export default defineEventHandler(async(event) => {
    
    const body = await readBody(event)

    let user = null
    let error = null

    if (body.firstName && body.lastName && body.email && body.role)
        await event.context.client.user.create({
            data: {
            firstName: body.firstName,
            lastName: body.lastName,
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
  