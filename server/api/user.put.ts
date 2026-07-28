export default defineEventHandler(async(event) => {
    const session = event.context.session;
    if (!session?.user || session.user.role !== "admin") {
      return createError({ statusCode: 403, statusMessage: "Forbidden" });
    }

    const body = await readBody(event)

    const id = body.id
    const firstName = body.firstName
    const lastName = body.lastName
    const email = body.email
    const role = body.role

    if(!(id && firstName && lastName && email && role))  return createError({statusCode: 400, statusMessage: "Missing Data"})

    let user = null

    if(body.id)
        user = await event.context.client.user.update({
            where: {
                id: body.id,
            },
            data: {
                firstName: body.firstName,
                lastName: body.lastName,
                email: body.email,
                role: body.role,
                name: `${body.firstName} ${body.lastName}`,
            }
      })

    return user
  })
