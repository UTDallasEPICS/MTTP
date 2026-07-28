export default defineEventHandler(async(event) => {
    const session = event.context.session;
    if (!session?.user || session.user.role !== "admin") {
      return createError({ statusCode: 403, statusMessage: "Forbidden" });
    }

    const body = await readBody(event)

    let user = null
    let error = null

    if (body.firstName && body.lastName && body.email && body.role) {
      try {
        user = await event.context.client.user.create({
          data: {
            firstName: body.firstName,
            lastName: body.lastName,
            email: body.email,
            role: body.role,
            name: `${body.firstName} ${body.lastName}`,
            emailVerified: true,
          },
        })

        await event.context.client.account.create({
          data: {
            id: `${user.id}-email`,
            accountId: body.email,
            providerId: "email",
            userId: user.id,
          },
        })
      } catch (e) {
        error = e
      }
    }

    if (error) return createError({statusCode: 500, statusMessage: "Server Post Error"})

    return {
      user: user
    }
  })
